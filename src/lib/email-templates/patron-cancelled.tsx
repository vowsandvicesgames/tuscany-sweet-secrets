import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
}

const PatronCancelledEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your membership has ended.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Your membership has ended</Heading>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>
            This is a confirmation that your {SITE_NAME} membership has ended and your supporter access has been
            closed.
          </Text>
          <Text style={text}>
            Thank you for the time you spent in Tuscany with us. If you ever want to come back, your place is still
            here.
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
  component: PatronCancelledEmail,
  subject: "Your membership has ended",
  displayName: "Patron cancelled",
  previewData: { name: "Jane" },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Georgia, 'Times New Roman', serif", margin: "0", padding: "0" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 24px" };
const header = { textAlign: "center" as const, padding: "0 0 24px" };
const h1 = { fontSize: "28px", fontWeight: "normal", color: "#7a1f1f", margin: "0 0 12px", letterSpacing: "0.02em" };
const card = { padding: "8px 0 16px" };
const text = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 14px" };
const footerSection = { paddingTop: "16px" };
const footer = { fontSize: "14px", color: "#8a6a6a", margin: "0" };
