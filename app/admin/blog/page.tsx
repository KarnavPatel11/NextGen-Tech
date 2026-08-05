"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  author: string;
  tags: string[];
  createdAt: string;
}

const emptyPost: Omit<BlogPost, "id" | "createdAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  published: false,
  author: "NextGen Tech",
  tags: [],
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Omit<BlogPost, "id" | "createdAt"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const savePost = async () => {
    if (!editing) return;
    setSaving(true);
    const data = {
      ...editing,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      slug: editing.slug || editing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
    };
    try {
      if (editing.id) {
        await fetch("/api/admin/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setEditing(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
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
        <h1 className="font-heading text-2xl font-bold">Blog Posts</h1>
        <button
          onClick={() => { setEditing({ ...emptyPost }); setTagsInput(""); }}
          className="btn-primary flex items-center gap-2 !py-2.5 !px-5 text-sm"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {editing && (
        <div className="card-base p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold">
              {editing.id ? "Edit Post" : "New Post"}
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
              <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inputClasses} placeholder="auto-generated" />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Author</label>
              <input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1">Tags (comma separated)</label>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className={inputClasses} placeholder="AI, Web Dev, Tips" />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs text-foreground-muted mb-1">Excerpt</label>
            <textarea value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className={`${inputClasses} resize-none`} rows={2} />
          </div>
          <div className="mb-5">
            <label className="block text-xs text-foreground-muted mb-1">Content (Markdown)</label>
            <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={`${inputClasses} resize-none font-mono text-xs`} rows={12} />
          </div>
          <div className="flex items-center gap-4 mb-5">
            <input type="checkbox" id="published" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="accent-accent w-4 h-4" />
            <label htmlFor="published" className="text-sm text-foreground-muted">Published</label>
          </div>
          <button onClick={savePost} disabled={saving} className="btn-primary flex items-center gap-2 !py-2.5 text-sm disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      )}

      {posts.length === 0 && !editing ? (
        <div className="card-base p-8 text-center text-foreground-muted">
          No blog posts yet. Click &quot;New Post&quot; to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="card-base p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{post.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-emerald-500/10 text-emerald-400" : "bg-foreground-dim/10 text-foreground-dim"
                    }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-foreground-dim text-xs">{post.excerpt || post.content.slice(0, 100)}...</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-foreground-dim">
                  <span>By {post.author}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button onClick={() => { setEditing({ ...post }); setTagsInput(post.tags.join(", ")); }} className="p-2 hover:bg-glass-hover rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deletePost(post.id)} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
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
