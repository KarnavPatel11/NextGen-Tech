"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
}

const emptyProject: Omit<Project, "id"> = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  imageUrl: "",
  category: "",
  tags: [],
  featured: false,
  liveUrl: "",
};

const categories = [
  "web-development",
  "app-development",
  "digital-marketing",
  "social-media-marketing",
  "social-media-management",
  "ai-integration-automation",
  "digital-transformation",
  "ecommerce-solutions",
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Omit<Project, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const startNew = () => {
    setEditing({ ...emptyProject });
    setTagsInput("");
  };

  const startEdit = (project: Project) => {
    setEditing({ ...project });
    setTagsInput(project.tags.join(", "));
  };

  const saveProject = async () => {
    if (!editing) return;
    setSaving(true);

    const data = {
      ...editing,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      slug: editing.slug || editing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
    };

    try {
      if (editing.id) {
        await fetch("/api/admin/portfolio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setEditing(null);
      fetchProjects();
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
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
        <h1 className="font-heading text-2xl font-bold">Portfolio</h1>
        <button onClick={startNew} className="btn-primary flex items-center gap-2 !py-2.5 !px-5 text-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Editor */}
      {editing && (
        <div className="card-base p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold">
              {editing.id ? "Edit Project" : "New Project"}
            </h2>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-glass-hover rounded-lg">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Slug</label>
              <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inputClasses} placeholder="auto-generated from title" />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClasses}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Tags (comma separated)</label>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className={inputClasses} placeholder="React, Next.js, API" />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs text-foreground-muted mb-1">Short Description</label>
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={`${inputClasses} resize-none`} rows={2} />
          </div>
          <div className="mb-5">
            <label className="block text-xs text-foreground-muted mb-1">Long Description</label>
            <textarea value={editing.longDescription || ""} onChange={(e) => setEditing({ ...editing, longDescription: e.target.value })} className={`${inputClasses} resize-none`} rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Live URL</label>
              <input value={editing.liveUrl || ""} onChange={(e) => setEditing({ ...editing, liveUrl: e.target.value })} className={inputClasses} />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="accent-accent w-4 h-4" />
              <label htmlFor="featured" className="text-sm text-foreground-muted">Featured Project</label>
            </div>
          </div>
          <button onClick={saveProject} disabled={saving} className="btn-primary flex items-center gap-2 !py-2.5 text-sm disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      )}

      {/* Projects list */}
      {projects.length === 0 && !editing ? (
        <div className="card-base p-8 text-center text-foreground-muted">
          No portfolio projects yet. Click &quot;Add Project&quot; to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="card-base p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{project.title}</span>
                  {project.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">Featured</span>
                  )}
                </div>
                <p className="text-foreground-dim text-xs truncate">{project.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-glass-bg text-foreground-dim">{project.category}</span>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-foreground-dim">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button onClick={() => startEdit(project)} className="p-2 hover:bg-glass-hover rounded-lg transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteProject(project.id)} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors" title="Delete">
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
