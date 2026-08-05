"use client";

import { useState, useEffect } from "react";
import { Inbox, FolderOpen, MessageSquareQuote, FileText } from "lucide-react";

interface DashboardStats {
  leads: number;
  unreadLeads: number;
  projects: number;
  testimonials: number;
  blogPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    leads: 0,
    unreadLeads: 0,
    projects: 0,
    testimonials: 0,
    blogPosts: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Array<{
    id: string;
    name: string;
    email: string;
    serviceInterested: string | null;
    read: boolean;
    createdAt: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, portfolioRes, testimonialRes, blogRes] =
          await Promise.all([
            fetch("/api/admin/leads"),
            fetch("/api/admin/portfolio"),
            fetch("/api/admin/testimonials"),
            fetch("/api/admin/blog"),
          ]);

        const leads = leadsRes.ok ? await leadsRes.json() : [];
        const portfolio = portfolioRes.ok ? await portfolioRes.json() : [];
        const testimonials = testimonialRes.ok ? await testimonialRes.json() : [];
        const blog = blogRes.ok ? await blogRes.json() : [];

        const leadsList = Array.isArray(leads) ? leads : [];

        setStats({
          leads: leadsList.length,
          unreadLeads: leadsList.filter((l: { read: boolean }) => !l.read).length,
          projects: Array.isArray(portfolio) ? portfolio.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          blogPosts: Array.isArray(blog) ? blog.length : 0,
        });

        setRecentLeads(leadsList.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      icon: Inbox,
      label: "Total Leads",
      value: stats.leads,
      sub: `${stats.unreadLeads} unread`,
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: FolderOpen,
      label: "Portfolio Projects",
      value: stats.projects,
      sub: "published",
      color: "from-cyan/20 to-cyan/5",
    },
    {
      icon: MessageSquareQuote,
      label: "Testimonials",
      value: stats.testimonials,
      sub: "active",
      color: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      icon: FileText,
      label: "Blog Posts",
      value: stats.blogPosts,
      sub: "total",
      color: "from-amber-500/20 to-amber-500/5",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => (
          <div key={card.label} className="card-base p-6">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={20} className="text-foreground" />
            </div>
            <div className="text-2xl font-heading font-bold mb-1">
              {card.value}
            </div>
            <div className="text-foreground-muted text-sm">{card.label}</div>
            <div className="text-foreground-dim text-xs mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div>
        <h2 className="font-heading text-lg font-semibold mb-4">
          Recent Leads
        </h2>
        {recentLeads.length === 0 ? (
          <div className="card-base p-8 text-center text-foreground-muted">
            No leads yet. They&apos;ll appear here when someone submits the
            contact form.
          </div>
        ) : (
          <div className="card-base overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left p-4 text-foreground-muted font-medium">Name</th>
                  <th className="text-left p-4 text-foreground-muted font-medium hidden md:table-cell">Email</th>
                  <th className="text-left p-4 text-foreground-muted font-medium hidden lg:table-cell">Service</th>
                  <th className="text-left p-4 text-foreground-muted font-medium">Status</th>
                  <th className="text-left p-4 text-foreground-muted font-medium hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-glass-border/50 hover:bg-glass-hover transition-colors">
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4 text-foreground-muted hidden md:table-cell">{lead.email}</td>
                    <td className="p-4 text-foreground-muted hidden lg:table-cell">
                      {lead.serviceInterested || "—"}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lead.read
                          ? "bg-foreground-dim/10 text-foreground-dim"
                          : "bg-accent/10 text-accent"
                      }`}>
                        {lead.read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="p-4 text-foreground-dim text-xs hidden md:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
