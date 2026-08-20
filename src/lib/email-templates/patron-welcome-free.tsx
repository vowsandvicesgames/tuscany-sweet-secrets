import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
}

const PatronWelcomeFreeEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for following {SITE_NAME} on Patreon.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to Tuscany</Heading>
          <Text style={tagline}>"We write the stories you swore you'd never tell anyone."</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>Welcome to Tuscany. ❤️</Text>
          <Text style={text}>
            We're so glad you decided to follow {SITE_NAME} here on Patreon. From now on, you'll get our free releases,
            public dev logs, and the quieter secrets of the studio.
          </Text>
          <Text style={text}>
            And honestly? Thank you. Every person who follows us, reads our posts, leaves a comment, or tells a friend
            about the game means more to us than you probably realize.
          </Text>
          <Text style={text}>Now for the slightly less romantic part.</Text>
          <Text style={text}>
            We would love to make {SITE_NAME} entirely through passion, artistic vision, and the mysterious power of
            Tuscany...
          </Text>
          <Text style={text}>
            So if you enjoy what we're making and want to help us keep creating it, consider supporting one of the paid
            tiers. Your support helps us spend more time making the game, gives you access to early builds and uncensored
            previews, and lets you have a say in some of the story's choices.
          </Text>
          <Text style={text}>No pressure, of course.</Text>
          <Text style={text}>
            But if you do have some spare money and feel like throwing it at a bunch of slightly unhinged game
            developers...
          </Text>
          <Text style={text}>We promise to put it to good use. 😉</Text>
        </Section>

        <Section style={footerSection}>
          <Text style={footer}>
            With love,
            <br />
            The {SITE_NAME} Team
          </Text>
          <Text style={ps}>
            P.S. You can absolutely stay on the free tier. We're happy you're here either way. ❤️
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: PatronWelcomeFreeEmail,
  subject: "Welcome to Vows & Vices",
  displayName: "Patron welcome (free)",
  previewData: { name: "Jane" },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Georgia, 'Times New Roman', serif", margin: "0", padding: "0" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 24px" };
const header = { textAlign: "center" as const, padding: "0 0 24px" };
const h1 = { fontSize: "28px", fontWeight: "normal", color: "#7a1f1f", margin: "0 0 12px", letterSpacing: "0.02em" };
const tagline = { fontSize: "15px", fontStyle: "italic", color: "#8a6a6a", margin: "0" };
const card = { padding: "8px 0 16px" };
const text = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 14px" };
const footerSection = { paddingTop: "16px" };
const footer = { fontSize: "14px", color: "#8a6a6a", margin: "0 0 12px" };
const ps = { fontSize: "14px", color: "#7a1f1f", margin: "0", fontStyle: "italic" };
