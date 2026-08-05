"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Trash2, Mail, Phone } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceInterested: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const toggleRead = async (id: string, read: boolean) => {
    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, read } : l))
      );
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, read });
      }
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (filter === "unread") return !l.read;
    if (filter === "read") return l.read;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold">Leads</h1>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filter === f
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-glass-bg border border-glass-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && (
                <span className="ml-2 text-xs">
                  ({leads.filter((l) => !l.read).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads list */}
        <div className="lg:col-span-2">
          {filteredLeads.length === 0 ? (
            <div className="card-base p-8 text-center text-foreground-muted">
              No leads found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    if (!lead.read) toggleRead(lead.id, true);
                  }}
                  className={`card-base p-4 cursor-pointer ${
                    selectedLead?.id === lead.id ? "!border-accent/40" : ""
                  } ${!lead.read ? "border-l-2 !border-l-accent" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${!lead.read ? "text-foreground" : "text-foreground-muted"}`}>
                          {lead.name}
                        </span>
                        {!lead.read && (
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                        )}
                      </div>
                      <p className="text-foreground-dim text-xs truncate">
                        {lead.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-foreground-dim">
                        <span>{lead.serviceInterested || "General"}</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(lead.id, !lead.read);
                        }}
                        className="p-2 hover:bg-glass-hover rounded-lg transition-colors"
                        title={lead.read ? "Mark unread" : "Mark read"}
                      >
                        {lead.read ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLead(lead.id);
                        }}
                        className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lead detail */}
        <div className="lg:col-span-1">
          {selectedLead ? (
            <div className="card-base p-6 sticky top-8">
              <h2 className="font-heading font-semibold text-lg mb-4">
                {selectedLead.name}
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Mail size={14} />
                  <a href={`mailto:${selectedLead.email}`} className="hover:text-accent">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Phone size={14} />
                    {selectedLead.phone}
                  </div>
                )}
                {selectedLead.serviceInterested && (
                  <div>
                    <span className="text-foreground-dim text-xs block mb-1">
                      Service
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                      {selectedLead.serviceInterested}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-foreground-dim text-xs block mb-2">
                    Message
                  </span>
                  <p className="text-foreground-muted leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
                <div className="text-foreground-dim text-xs pt-4 border-t border-glass-border">
                  Received: {new Date(selectedLead.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="card-base p-8 text-center text-foreground-dim text-sm">
              Select a lead to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
