"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role?: string;
  content: string;
  rating: number;
  featured: boolean;
}

const emptyTestimonial: Omit<Testimonial, "id"> = {
  clientName: "",
  company: "",
  role: "",
  content: "",
  rating: 5,
  featured: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Omit<Testimonial, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const saveTestimonial = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      } else {
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      }
      setEditing(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  const inputClasses =
    "w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-accent/50 transition-all";

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
        <h1 className="font-heading text-2xl font-bold">Testimonials</h1>
        <button
          onClick={() => setEditing({ ...emptyTestimonial })}
          className="btn-primary flex items-center gap-2 !py-2.5 !px-5 text-sm"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="card-base p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold">
              {editing.id ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-glass-hover rounded-lg">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Client Name</label>
              <input value={editing.clientName} onChange={(e) => setEditing({ ...editing, clientName: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Company</label>
              <input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Role</label>
              <input value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputClasses} />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs text-foreground-muted mb-1">Testimonial Content</label>
            <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={`${inputClasses} resize-none`} rows={4} />
          </div>
          <div className="flex items-center gap-6 mb-5">
            <div className="flex items-center gap-2">
              <label className="text-xs text-foreground-muted">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setEditing({ ...editing, rating: n })}>
                    <Star size={18} className={n <= editing.rating ? "fill-accent text-accent" : "text-foreground-dim"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="t-featured" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="accent-accent w-4 h-4" />
              <label htmlFor="t-featured" className="text-sm text-foreground-muted">Featured</label>
            </div>
          </div>
          <button onClick={saveTestimonial} disabled={saving} className="btn-primary flex items-center gap-2 !py-2.5 text-sm disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save Testimonial"}
          </button>
        </div>
      )}

      {testimonials.length === 0 && !editing ? (
        <div className="card-base p-8 text-center text-foreground-muted">
          No testimonials yet. Click &quot;Add Testimonial&quot; to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="card-base p-4 flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{t.clientName}</span>
                  <span className="text-foreground-dim text-xs">
                    {t.role && `${t.role}, `}{t.company}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground-muted text-sm line-clamp-2">{t.content}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button onClick={() => setEditing({ ...t })} className="p-2 hover:bg-glass-hover rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteTestimonial(t.id)} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
