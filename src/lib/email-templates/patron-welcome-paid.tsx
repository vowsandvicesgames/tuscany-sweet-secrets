import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
  tier?: string;
}

const PatronWelcomePaidEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to the Sinner Ranks</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to the Sinner Ranks</Heading>
          <Text style={tagline}>&ldquo;We write the stories you swore you'd never tell anyone.&rdquo;</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>Thank you. Truly. 🖤</Text>
          <Text style={text}>
            Thank you for choosing to support {SITE_NAME}. We know you have countless things you could spend your time and money on, so the fact that you decided to put your support behind our little story means a lot to us.
          </Text>
          <Text style={text}>Your support helps us keep creating, writing, and bringing Tuscany to life.</Text>
          <Text style={text}>We won't take it for granted.</Text>
          <Text style={text}>
            Thank you for believing in us, and welcome to the Sinner Ranks.
          </Text>
          <Text style={text}>See you inside. 🖤</Text>
        </Section>

        <Section style={footerSection}>
          <Text style={footer}>
            With love,
            <br />
            The {SITE_NAME} Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: PatronWelcomePaidEmail,
  subject: "Welcome to the Sinner Ranks",
  displayName: "Patron welcome (paid)",
  previewData: { name: "Jane", tier: "Sinner" },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Georgia, 'Times New Roman', serif", margin: "0", padding: "0" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 24px" };
const header = { textAlign: "center" as const, padding: "0 0 24px" };
const h1 = { fontSize: "28px", fontWeight: "normal", color: "#7a1f1f", margin: "0 0 12px", letterSpacing: "0.02em" };
const tagline = { fontSize: "15px", fontStyle: "italic", color: "#8a6a6a", margin: "0" };
const card = { padding: "8px 0 16px" };
const text = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 14px" };
const listItem = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 6px" };
const footerSection = { paddingTop: "16px" };
const footer = { fontSize: "14px", color: "#8a6a6a", margin: "0" };
