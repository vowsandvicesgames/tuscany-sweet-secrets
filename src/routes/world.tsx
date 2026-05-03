import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PATREON_URL } from "@/lib/links";
import sweetSinLogo from "@/assets/sweet-sin-logo.png";
import coverBeach from "@/assets/cover-beach-1.webp";
import tuscanHills from "@/assets/a08.webp";
import villa from "@/assets/g09.webp";
import sofiaSwing from "@/assets/cover-no1-big-moon.webp";
import characterSofia from "@/assets/character-sofia.webp";
import characterEmily from "@/assets/character-emily.webp";
import characterGloria from "@/assets/character-gloria.webp";
import characterLuca from "@/assets/character-luca.webp";
import characterBianca from "@/assets/character-bianca.webp";
import characterMia from "@/assets/character-mia.webp";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: "Games - Vows & Vices Studio" },
      {
        name: "description",
        content:
          "Discover the games of Vows & Vices Studio. Sweet Sin of Tuscany, our first 18+ visual novel of forbidden love and family secrets.",
      },
      { property: "og:title", content: "Games - Vows & Vices Studio" },
      {
        property: "og:description",
        content: "Sweet Sin of Tuscany, our first 18+ visual novel from Vows & Vices Studio.",
      },
      { property: "og:image", content: coverBeach },
      { name: "twitter:image", content: coverBeach },
    ],
  }),
  component: GamesPage,
});

const sofiaDescription = `She was by far the most beautiful woman you had ever seen. She was also the woman with the most authority you knew, and on top of all that, she was incredibly complex. She could be a strict headmistress during the day with a stern voice and a look that allowed no nonsense, but afterward, she was the most caring and gentle person, someone who loved wholeheartedly and gave her all to the people who meant the world to her.

All of this made her even more attractive in your eyes. By the time you turned eighteen, you could barely hide your attraction toward her. It didn't help that during school days, she dressed in tight, professional office clothes that accentuated her perfect figure. One look at her in those clothes, peering at you over her glasses, was enough to leave you breathless. And after work, she would change in regular clothes, that even though were not very revealing, she still look incredibly appealing.

Once, she found you in the kitchen preparing what could barely be called a meal. She took your plate and threw the contents into the garbage. She said, "I have failed you completely. I never taught you how to cook my grandmother's famous ribollita. Common, we will change this today!"

You looked at her in sheer horror, as you knew how protective she was about anyone messing with her kitchen. She noticed your unease and took you by the shoulder, leaning in to your ear and whispering softly, almost seductively, "Don't be scared. I will protect you." You were ashamed to admit, even this small gesture caused a profound reaction in you. Your stomach felt like a lead ball and your trousers were suddenly two numbers too small. You never had an erection this strong before and you were overcome with embarrassment. She started listing ingredients and commanding you like a soldier. You sheepishly followed, trying to keep your composure all the while trying to hide, now poking and painful erection.

By the time you had gathered all the requested ingredients, your problem had subsided a bit. You looked at the items you'd brought proudly, like you'd conquered something, before realising you should already know how to cook for yourself. Finally, you realised you had forgotten one ingredient. You turned to ask her about it and were momentarily stunned. She had removed her sweater and remained in a small and tight tank top. Her big breasts were overflowing from the tiny shirt. It was no match for them.

Your erection returned and with vengeance.

While swaying toward you, she slowly put on her apron, looking you straight in the eyes the whole time. If possible, she looked even better with the apron on. You stared, completely forgetting to hide your gaze and your erection proudly poking out of your pants. Once you saw her eyes going down to your crotch, you violently turned around, your cheeks so hot you could have cooked the ribollita on them. Then you felt her hand on your shoulder, her voice in your ear: "Come on, let's do it." You felt your legs nearly give out.

The next half hour flew by like a blur. The smell of something burning in the pot brought you back to your senses. You looked at her with a guilty expression, expecting her to be mad, but you only saw a warm smile and kind eyes. She stepped behind you, took your hand with the ladle, and started assisting you in mixing. You could feel her ample breasts on your back and arm. She leaned in again to your ear, like she knew the effect she had on you and was enjoying in provoking a reaction in you, and gently whispered, "Ribollita is like life. You have to protect the ingredients from the fire, just like you have to protect people you love from their problems. You are still young, but you will learn this. Then you will protect all of us. Until then, I am your protector, and I will keep you safe from the fire." She then leaned in and kissed you softly on your cheek, dangerously close to your mouth.

To this day, you have no idea how to make ribollita and have always been afraid to ask. But you have an erection whenever you smell it. For this reason, you avoid Italian restaurants.

You felt so loved, aroused and protected all at once. She was your whole world, and you felt invincible...

Until that night. The night your life flipped upside down. Dad had a grip on your right hand so tight you felt your bone would break if he squeezed any harder. There was no talking to him. it would only provoke him more. You knew you had made mistakes, but you never imagined this. As he dragged you through the house, you looked around, searching for the door she would come running through to take you away to safety. You passed through the house and, near the front door, you finally saw her standing in that same apron. She had probably just finished cooking when she heard the commotion. But she didn't have the look of a protector. Her eyes were down, avoiding your searching gaze. At that moment, you understood... there was no more protection. You were on your own.

Your life there was over...`;

const characters: {
  img: string;
  name: string;
  alt: string;
  description?: string;
}[] = [
  {
    img: characterSofia,
    name: "Sofia",
    alt: "middle-aged good-looking red-haired women",
    description: sofiaDescription,
  },
  { img: characterEmily, name: "Emily", alt: "young brunette in the mid-20s" },
  { img: characterGloria, name: "Gloria", alt: "young blonde in the mid-20s" },
  { img: characterMia, name: "Mia", alt: "shy girl, mask lover" },
  { img: characterBianca, name: "Bianca", alt: "fitness women instructor" },
  { img: characterLuca, name: "Luca", alt: "handsome, young, classy Italian guy" },
];

const screenshots = [
  { img: villa, caption: "Inside the villa" },
  { img: sofiaSwing, caption: "Moon called" },
  { img: tuscanHills, caption: "Tuscan hills" },
  { img: coverBeach, caption: "Under the Tuscan sun" },
];

function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* INTRO */}
      <section className="relative pt-40 pb-16 px-6 text-center">
        <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-rose-glow/80 text-lg">
          Discover the games of Vows & Vices Studio. Sweet Sin of Tuscany, our first 18+ visual novel of forbidden love
          and family secrets.
        </p>
      </section>

      {/* SWEET SIN OF TUSCANY */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <article className="relative rounded-sm border border-border/60 bg-card/40 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
            {/* Logo / Cover */}
            <div className="relative aspect-square lg:aspect-auto bg-ink flex items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-border/60">
              <img
                src={sweetSinLogo}
                alt="sweet sin of tuscany logo"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/60" />
            </div>

            {/* Info */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-3">Featured · Coming Soon</p>
              <h2 className="font-display text-4xl sm:text-5xl text-rose-glow mb-5">
                <span className="font-serif-italic text-crimson">Sweet Sin</span> of Tuscany
              </h2>
              <p className="font-serif-italic text-rose-glow/85 text-lg mb-5">
                Our first 18+ visual novel, a story of long lost, forbidden love and the consequences of years of forced
                separation.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-8">
                While enjoying a well-deserved week off in the Tuscan paradise, an unexpected visitor turns your world
                upside down. Your family's web of lies and the dark secret it hides is about to unravel.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/story"
                  className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all"
                >
                  Read the Story
                </Link>
                <span className="inline-flex items-center px-4 py-3 font-display tracking-[0.2em] uppercase text-xs text-muted-foreground border border-border/60 rounded-sm">
                  Mature · 18+
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* CHARACTERS */}
        <div className="mt-16">
          <div className="ornament-divider mb-3 text-xs tracking-[0.4em] uppercase">Meet the characters</div>
          <p className="text-center text-sm text-muted-foreground mb-8 font-serif-italic">
            From the first chapter, many more to come in next chapters.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {characters.map((c) => (
              <figure
                key={c.name}
                className="relative aspect-[3/5] overflow-hidden rounded-sm border border-border/60 bg-card group"
              >
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="w-full h-full object-contain object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs uppercase tracking-[0.3em] text-rose-glow/90 bg-gradient-to-t from-ink/95 to-transparent text-center">
                  {c.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* SCREENSHOTS */}
        <div className="mt-16">
          <div className="ornament-divider mb-8 text-xs tracking-[0.4em] uppercase">Screenshots</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {screenshots.map((s, i) => (
              <figure
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/60 bg-card group"
              >
                <img
                  src={s.img}
                  alt={s.caption}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs uppercase tracking-[0.2em] text-rose-glow/90 bg-gradient-to-t from-ink/90 to-transparent">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* MORE COMING */}
        <div className="mt-20 text-center border-t border-border/40 pt-16">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/60 mb-4">More to come</p>
          <h3 className="font-display text-3xl sm:text-4xl text-rose-glow/90">
            New stories are being whispered in the studio.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Vows &amp; Vices Studio is just getting started. Future chapters will be announced here.
          </p>
          <p className="mt-6 font-serif-italic text-rose-glow/85 text-lg max-w-2xl mx-auto">
            Every whisper, every reveal, and every new chapter is first shared with our Patreon family. Join us there
            for sneak peeks, story and character influence polls, behind-the-scenes content, and announcements before
            anyone else.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all"
            >
              Join us on Patreon
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground max-w-xl mx-auto">
            Love the story? Support us to keep it growing.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
