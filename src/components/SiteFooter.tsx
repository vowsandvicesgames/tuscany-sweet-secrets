import { Link } from "@tanstack/react-router";
import vvLogo from "@/assets/vows-vices-logo.webp";
import { PATREON_URL, DISCORD_URL, REDDIT_URL, TWITTER_URL, VNDB_URL } from "@/lib/links";
import { trackRedditClick, trackPatreonClick, trackDiscordClick, trackTwitterClick } from "@/lib/analytics";



export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-ink/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <img src={vvLogo} alt="" width={56} height={56} loading="lazy" decoding="async" className="rounded-full" />
          <div>
            <div className="font-display text-lg text-rose-glow tracking-wider">Vows &amp; Vices</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Independent Studio</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/story" className="hover:text-rose-glow transition-colors">The Story</Link>
          <Link to="/world" className="hover:text-rose-glow transition-colors">The Games</Link>
          <Link to="/studio" className="hover:text-rose-glow transition-colors">The Studio</Link>
          <Link to="/faq" className="hover:text-rose-glow transition-colors">About the Game / FAQ</Link>
          <Link to="/adult-visual-novels" className="hover:text-rose-glow transition-colors">Adult Visual Novels Like the Best of the Genre</Link>
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPatreonClick(window.location.pathname)} className="hover:text-rose-glow transition-colors">Support on Patreon ↗</a>
          <a href="https://x.com/VowsandVice" target="_blank" rel="noopener noreferrer" onClick={() => trackTwitterClick(window.location.pathname)} className="hover:text-rose-glow transition-colors">X / Twitter ↗</a>
          <a href={VNDB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-glow transition-colors">VNDB ↗</a>
        </nav>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDiscordClick(window.location.pathname)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-display tracking-[0.2em] uppercase text-xs text-foreground bg-discord hover:bg-discord-hover rounded-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.583 18.583 0 0 0-5.487 0 13.392 13.392 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Discord
          </a>
          <a
            href={REDDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackRedditClick(window.location.pathname)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-display tracking-[0.2em] uppercase text-xs text-foreground bg-reddit hover:bg-reddit-hover rounded-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.63 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.753-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l6.907 1.486a.75.75 0 0 0 .154-1.482l-2.614-.56a.75.75 0 0 0-.316 1.466l.521.112a1.75 1.75 0 0 1 .369 3.444zM8 14.041c-.917 0-1.69.802-1.69 1.79 0 .988.773 1.79 1.69 1.79.917 0 1.69-.802 1.69-1.79 0-.988-.773-1.79-1.69-1.79zm7.441.001c-.916 0-1.688.8-1.688 1.788 0 .988.772 1.789 1.688 1.789s1.688-.801 1.688-1.789c0-.988-.772-1.788-1.688-1.788z" />
            </svg>
            Reddit
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTwitterClick(window.location.pathname)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-display tracking-[0.2em] uppercase text-xs text-x-fg bg-x hover:bg-x-hover rounded-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X / Twitter
          </a>
        </div>


        <div className="text-sm text-muted-foreground">
          <p className="font-serif-italic text-rose-glow/80 mb-2">"Will you taste the Sweet Sin of Tuscany?"</p>
          <p>© {new Date().getFullYear()} Vows &amp; Vices Studio. All rights reserved.</p>
          <p className="text-xs mt-1">Mature audiences. 18+</p>
        </div>
      </div>
    </footer>
  );
}
