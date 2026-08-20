import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
  tier?: string;
}

const PatronWelcomePaidEmail = ({ name, tier }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your support just unlocked the velvet curtain.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to the Sinner Ranks</Heading>
          <Text style={tagline}>"We write the stories you swore you'd never tell anyone."</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>
            Thank you for supporting {SITE_NAME}
            {tier ? ` as part of the ${tier} tier` : ""}. Your pledge keeps Tuscany's darkest romance alive.
          </Text>
          <Text style={text}>As a paid supporter you now get:</Text>
          <Text style={listItem}>· Early builds and uncensored chapter previews</Text>
          <Text style={listItem}>· Full dev logs and behind the scenes art</Text>
          <Text style={listItem}>· A vote in the choices that shape the story</Text>
          <Text style={text}>See you inside.</Text>
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
