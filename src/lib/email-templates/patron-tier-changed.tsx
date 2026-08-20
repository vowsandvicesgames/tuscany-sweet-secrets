import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

interface Props {
  name?: string;
  previousTier?: string;
  newTier?: string;
  direction?: string;
}

const PatronTierChangedEmail = ({ name, previousTier, newTier, direction }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your membership has been updated.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Your membership changed</Heading>
        </Section>

        <Section style={card}>
          <Text style={text}>{name ? `Dear ${name},` : "Dear friend,"}</Text>
          <Text style={text}>
            Your {SITE_NAME} membership has been {direction === "downgrade" ? "changed to a lower tier" : "upgraded"}.
          </Text>
          <Text style={listItem}>· Previous tier: {previousTier || "None"}</Text>
          <Text style={listItem}>· Current tier: {newTier || "None"}</Text>
          <Text style={text}>
            Your access has been updated to match. If this wasn't you, just reply and we'll look into it.
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
  component: PatronTierChangedEmail,
  subject: "Your membership has been updated",
  displayName: "Patron tier changed",
  previewData: { name: "Jane", previousTier: "Follower", newTier: "Sinner", direction: "upgrade" },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Georgia, 'Times New Roman', serif", margin: "0", padding: "0" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 24px" };
const header = { textAlign: "center" as const, padding: "0 0 24px" };
const h1 = { fontSize: "28px", fontWeight: "normal", color: "#7a1f1f", margin: "0 0 12px", letterSpacing: "0.02em" };
const card = { padding: "8px 0 16px" };
const text = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 14px" };
const listItem = { fontSize: "16px", lineHeight: "26px", color: "#2b2222", margin: "0 0 6px" };
const footerSection = { paddingTop: "16px" };
const footer = { fontSize: "14px", color: "#8a6a6a", margin: "0" };
