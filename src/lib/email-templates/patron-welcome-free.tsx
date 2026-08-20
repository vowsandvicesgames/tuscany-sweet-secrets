import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
}

const PatronWelcomeFreeEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for following Vows & Vices.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to Tuscany</Heading>
          <Text style={tagline}>"We write the stories you swore you'd never tell anyone."</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>
            Thank you for following {SITE_NAME}. You'll now hear about free releases, public dev logs and the quieter
            secrets of the studio.
          </Text>
          <Text style={text}>
            If you ever want early builds, uncensored previews and a say in the story's choices, the paid tiers are
            waiting whenever you're ready.
          </Text>
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
const footer = { fontSize: "14px", color: "#8a6a6a", margin: "0" };
