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

const miaDescription = `She was the youngest of the bunch and by far the smallest. She had a perfect smile and was always part of the group activities, but she never spoke. For the longest time, you and everybody else thought she was speech-impaired.

Once, you had one of your standard brawls. Only this time, you received more than you gave. You were sitting in the living room licking your wounds, which were visible on your face. You were waiting for the headmistress to come with ointment, bandages, and a stern lecture.

But as she walked into the room and saw you, she let a squeal out. You were almost startled. She quickly jumped on the bed and held your arm tightly. She was looking at you with a worried expression, but you were too tired to speak with her. Then, you barely heard a very low and timid, but angelic voice speaking to you: "Why do you fight all the time?"

You almost jumped from your seat. You could not hide the surprise on your face. "Well... he... I... I mean, he started it..." You replied sheepishly, the prepared answer falling out while a look of bafflement remained on your face.

She smiled at you, and again, almost without moving her face, she said in that same angelic voice, this time slightly louder, "You must promise me you will not fight anymore."

You were completely shocked and didn't know what to answer. You were unsure if maybe you had a concussion or something. Again, the reply coming from your mouth was automatic: "Yes, yes, I promise."

The look on your face changed from bafflement to real confusion. You started looking around, as if trying to find someone nearby to confirm this was really happening. She looked annoyed. She understood that your answers were automatic and insincere. She raised her voice, now almost sounding commanding: "You must promise! Even if they start it, you will not fight anymore! Promise me!" Her voice was almost pleading near the end of the sentence, as if she were on the edge of crying. You understood the seriousness of the situation and sat up. You took her by the shoulder with one hand and by her face with the other, and said as sincerely as you could: "I promise you, I will not fight anymore, even if they start it."

She looked into your eyes for what felt like eternity, as if she were testing you to see if you meant it. Suddenly, she got up and started leaving the room just as the headmistress entered. The headmistress noticed your senseless expression and immediately asked, "What did you do?" You just raised your hand in a helpless gesture and started shaking your head, unable to find the words.

At this point, she turned, came back to you, leaned in, and kissed you gently on the cheek. Then she said in the clear voice of an angel: "Thank you!"

She then turned to the headmistress, took her by the hand, and told her in a slightly lower tone, almost like she was telling a secret, "Don't worry, he promised me he will not fight anymore!" and then left the room. The headmistress stood half-hunched, hand held in the air and with a blank expression on her face. She started moving her head from you to the door and back in shock, having also lost her words. You again made a gesture of confusion. You both stood there for a minute in silence. Suddenly, she started crying, like a dam had opened inside her. You jumped up and hugged her as tightly as you could, not really understanding what was happening.

For the next few days, everybody was trying to push her to speak, but she only spoke to you, and only when you were far from others. It felt like an angel was speaking only for your ears. After this, she would come to your room every night, and you would talk for hours until the grownups would come and chase her away.

That is, until the worst night of both your lives. As your father dragged you out, she was standing in front of the door, her mouth open...

But no words came out...`;

const gloriaDescription = `She was always an artistic soul with the most beautiful smile. Her laugh filled you up, and she could lift any tension in the room just by entering. She was a big girl when she was younger, but she never lacked self-confidence. You loved that about her.

One day, she entered your room and asked for help. You had only love for her and would jump into a river for her without thinking, but what she asked of you froze your blood.

She wanted you to be her dance partner.

The headmistress told her she could have dance classes, but only if she found a partner. Never mind that you had two left feet, if anybody found out you were going to dance lessons, with your younger friend no less, your life would be over. You were a high school kid, after all. You said no, of course, and no amount of pleading, bribing, or blackmailing could sway you. You could see her heart breaking, but you could not accept. You could not go to dance classes, surely?

And then you heard something. Something you had never heard from her. As she was leaving, you could hear faint sobbing. She never, ever cried. She was always happy and smiling, even when it was hard. Even after everything life threw at her. As she walked away, the sobbing intensified. You could feel your heart cracking. Without thinking, you shouted, "I will go! Just stop crying." And as if it had never happened, she turned around and started jumping for joy with a big smile on her face. Only the tears rolling down her cheeks served as proof of her distraught state from a few moments ago. She jumped into your arms and held you tighter than ever before.

The next few months were living hell for you. It started with only two practices per week, but as the coach saw her talent, they increased it to four. Unfortunately for you, your presence was mandatory, as there were not enough boys in the club. Who would have thought?

Your only consolation was that no one found out what your extracurricular activities were. That is, until Adrian shouted it in front of the whole school and ran away. To this day, you don't know how he found out. If you thought it was hard before, you were in for a shock. Endless teasing started. Ballet twirling in front of you as you passed through the school hallway, and even a tutu taped to your locker.

But honestly, you didn't care that much.

After a few more months, even though you could salsa with the best of them, the skill difference between you was rapidly increasing. The coach cautiously approached the subject with both of you, but she didn't even let her finish. She almost shouted, "NO!" After she calmed down, the coach explained that she had competition talent and, unfortunately, you did not. She said that with an apologetic smile toward you. She didn't know you were celebrating inside. Finally, you convinced her to have a trial practice with the most talented male partner in the club.

You watched the practice from the side, and that was the first time you saw her dancing. Her body had shaped perfectly since you started a year ago. She moved so gracefully, which accentuated her perfect figure. They were dancing tango so closely that it was the first time you felt true jealousy. You kicked yourself inside - why had you not learned faster and better? You watched them without a sound and without any expression. You were devastated, and you didn't understand why.

Once they finished, she approached you cautiously and with a hint of regret. She started apologising and swearing she would never dance with another again. It was like she felt she had cheated on you. For some unexplained reason, you felt the same. But you understood you would only hold her back, so you convinced her that this was best for her and you lied that you didn't want to be there anyway. It was hard, but you knew you had to say those things. You expected her to cry, but it was like she was looking into your soul. She just smiled the gentlest smile you had ever seen and, while hugging you, she whispered, "Thank you for everything. I will always remember that you made my dream come true." You tried to reply, but she held you tighter.

After this, they won several competitions, and you were watching and cheering at all of them. Every time she finished dancing, she would run to you and jump into your arms. She would kiss you relentlessly and whisper, "Thank you, thank you."

Her smiling face was all you needed.

And that dreadful night, while your father was dragging you away, the last thing you saw was her...

And she was crying...`;

const biancaDescription = `When she was very young, she and her twin sister (not identical) would drive you crazy. They were inseparable little devils and always up to no good. She was always the leader of the pack and picked on you especially. Although you always found her practical jokes entertaining, and loved her joyful personality, you were not very close during that period.

You heard that nowadays, she spends most of her time at the local gym or on a run. Exercise is the way she expresses herself and she is very similar to you in that way. Unfortunately, she also has a temper, just like you. You feel to blame for both. When you started exercising, she was still a young girl, but she would spend every minute by your side. She would watch your every move and soon started emulating your exercises in her own way. She had great potential, you saw that instantly, but she was making dangerous mistakes and lacking guidance. Reluctantly, you started teaching her, and very soon she became your gym partner, accompanying you every day. At first, you didn't like her going to the, at that time, male dominated gym, but you accepted it and prepared yourself to protect her from bullying. However, after seeing the first guy who tried to mess with her cry, you relaxed and were so proud of her.

As time passed, she became more of a tomboy with others, aggressively handling even those within your group. Unlike with others, she remained innocent, sweet, and loving toward you. Others would tease her that she was in love with you, but they would quickly regret their actions. You never gave it any thought, as she is your friend and was very young at the time. Until your departure, she was your everyday gym partner and your friendship grew. You heard from old gym buddies that she became a fitness instructor at the local gym.

Your face beamed with pride.`;

const emilyDescription = `On her first visit to the estate from the orphanage, she was a small, scrawny kid, and you instantly disliked her. You didn't understand why, as she was very sweet and loving. For reasons known only to her, she would not leave your side. No amount of your bitching, complaining, or rejecting her helped. She was attached to you like a tick, and there was no escaping her.

After a few months, you stopped complaining and harassing her. A few months after that, you started interacting and playing with her. The first time she was sick and you spent a day without her, you realised how much you missed her. You began showing her affection, and the two of you would spend every moment of every day together. She was your best friend from that moment forward.

This change did not go unnoticed, and the local kids teased both of you. During summer, one of these teasing sessions went too far when a local kid named Adrian, who always teased her relentlessly, pushed things further. When you arrived at the local meeting point, she was in tears and his hands were on her shoulders. You had never felt such rage. Two of his friends could not pull you off of him. You beat him so badly that you broke the knuckles on both of your hands. Once you stopped exhausted, you saw her looking at you. She was no longer crying, she had a look of terror mixed with relief. As you moved toward her, her expression shifted to a loving gaze. She cautiously took your hand, and you went home.

You honestly thought your father would kill you. When he heard what happened and started shouting, you were truly afraid of him for the first time. He was a mountain of a man, and you knew what he did for a living. Even though you had grown quite strong, you knew he could snap you in half if he wanted to, and it really looked like he would. But at the last second, she fearlessly stepped between you two. It was a sight to behold. He was literally double her size. Gone was the scared, crying girl. In front of you stood a fearless woman, defending what was precious to her. In a commanding voice you never heard from her, she ordered him to calm down. Then she explained what happened, what had been going on with bullying, and some things Adrian had done to her that even you didn't know. As you listened, you felt your blood boil and your temples pulsate. You didn't beat him enough. When your father heard the full story and saw your reaction, he calmed down.

From that day onward, your family and Adrian's were in a bitter feud. You didn't care. You only cared about her. But she changed after that day. She first began avoiding physical contact with you in public. Soon she stopped altogether. Before, you would hold hands like it was the most natural thing in the world, but after the incident, she hesitated. Despite this, you never felt closer to her. While you missed her hugs and her closeness, you could see and feel the love emanating from her.

Following that event, she changed rapidly. She became more outgoing and joined several clubs at school, including the cheerleaders. Since she was a gymnast, she became cheer captain in no time. Everyone liked her and wanted to be in her circle, she was effortlessly friends with everyone. But even then, you never felt neglected. Quite the opposite - you felt special. She could have spent her time with anyone, but she chose to spend all her free time with you. And you were happier than ever...

That is, until that fated summer night...`;

const lucaDescription = `Your mother died while giving birth to you. Your father was a professional soldier, and when you were very young, he was always away on tours of duty. For a long time, you thought he blamed you for her death and remained away because of that.

You spent your childhood on a family estate in rural Tuscany. Your grandparents took care of you, and you were a problematic kid, even then. You had a bad temper and would often start fights with other kids. But even at your worst, your grandparents loved you unconditionally, and you cannot imagine a better childhood.

At the age of ten, your father started dating the headmistress of a local school and a female only orphanage. You quickly fell in love with her, as she was warm and loving to you and the girls under her care. She would often bring girls from the orphanage to the estate, which you hated at first, but very soon, you could not imagine a world without them. Your father started spending more and more time at home, and you all became closer. For a long time, you were happier than ever.

Unfortunately, the summer you turned eighteen, a series of bad decisions you made destroyed everything.

After this, in the dead of night, your father took you to military school. As you had never seen him so enraged, you did not dare oppose him. Even though you hated it at the time, military school shaped you and instilled proper values in you. After you enlisted, due to high praise from your drill instructors regarding your physical fitness and quick thinking, you were fast-tracked to Special Forces. For the next few years, you hopped from war zone to war zone. Although you gained a lot of experience, you grew tired of the lifestyle. At only 23, you looked like a lifetime had passed over you and possessed the aura of an old soul. Your only thought was to slow down and grow roots. When word of your grandparents passing in quick succession reached you, you were devastated. You decided then that once this tour was over, you would stop chasing the high.

So, when your military career ended, you and a few army buddies started a private security agency. It's a much less stressful job, and you get to stay rooted and close to the new family you created with your friends. And even though you enjoy your new life, you still love going to the family cottage in the remote Tuscan hills. In your childhood, it was an uninhabitable stone ruin that you and the girls played in, but when the Airbnb boom started, your father rebuilt it into a couples retreat. For the last couple of years, it has been your place of recharging, even though you only spend a week per year there. The peace and tranquillity are refreshing and the polar opposite of your lifestyle.

Your story starts on the first day of your vacation, with the sound of a familiar voice...`;

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
  {
    img: characterEmily,
    name: "Emily",
    alt: "young brunette in the mid-20s",
    description: emilyDescription,
  },
  {
    img: characterGloria,
    name: "Gloria",
    alt: "young blonde in the mid-20s",
    description: gloriaDescription,
  },
  { img: characterMia, name: "Mia", alt: "shy girl, mask lover", description: miaDescription },
  {
    img: characterBianca,
    name: "Bianca",
    alt: "fitness women instructor",
    description: biancaDescription,
  },
  {
    img: characterLuca,
    name: "Luca",
    alt: "handsome, young, classy Italian guy",
    description: lucaDescription,
  },
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
                  className="w-full h-full object-contain object-top opacity-90 transition-all duration-500 group-hover:opacity-0"
                />
                {c.description && (
                  <div className="absolute inset-0 overflow-y-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-ink/95 p-5 text-sm leading-relaxed text-rose-glow/90 font-serif-italic whitespace-pre-line">
                    {c.description}
                  </div>
                )}
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs uppercase tracking-[0.3em] text-rose-glow/90 bg-gradient-to-t from-ink/95 to-transparent text-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
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
