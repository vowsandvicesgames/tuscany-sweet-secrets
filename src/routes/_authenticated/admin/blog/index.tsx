import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListPosts, adminDeletePost, checkIsAdmin } from "@/lib/blog-admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/blog/")({
  head: () => ({ meta: [{ title: "Admin · Blog" }, { name: "robots", content: "noindex" }] }),
  component: AdminBlogList,
});

function AdminBlogList() {
  const navigate = useNavigate();
  const list = useServerFn(adminListPosts);
  const del = useServerFn(adminDeletePost);
  const check = useServerFn(checkIsAdmin);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const load = async () => {
    try {
      const a = await check();
      setIsAdmin(a.isAdmin);
      if (a.isAdmin) {
        const res = await list();
        setPosts(res.posts);
      }
    } catch (e: any) {
      toast.error(e.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await del({ data: { id } });
      setPosts((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading) return <Shell><p className="text-foreground/70">Loading…</p></Shell>;

  if (!isAdmin) {
    return (
      <Shell>
        <div className="text-center">
          <h2 className="font-display text-2xl text-rose-glow">Not an admin</h2>
          <p className="mt-3 text-foreground/70 text-sm max-w-md mx-auto">
            Your account is signed in but doesn't have admin access. Grant the <code className="text-crimson">admin</code> role
            in the database (table <code className="text-crimson">user_roles</code>) to manage blog posts.
          </p>
          <button onClick={handleSignOut} className="mt-6 text-sm text-crimson hover:underline">
            Sign out
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-rose-glow">Blog posts</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/blog/new"
            className="px-4 py-2 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            New post
          </Link>
          <button onClick={handleSignOut} className="text-sm text-foreground/60 hover:text-rose-glow">
            Sign out
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-foreground/60">No posts yet. Create one to get started.</p>
      ) : (
        <ul className="divide-y divide-crimson/20 border border-crimson/30 rounded-sm bg-card/60 backdrop-blur">
          {posts.map((p) => (
            <li key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${p.published ? "border-emerald-600/50 text-emerald-400" : "border-crimson/30 text-foreground/60"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                  <h2 className="font-display text-lg text-rose-glow truncate">{p.title}</h2>
                </div>
                <p className="text-xs text-foreground/50 mt-1 truncate">/blog/{p.slug}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/admin/blog/$id"
                  params={{ id: p.id }}
                  className="text-sm text-rose-glow hover:underline"
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-crimson hover:underline">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
