import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

const NewsletterWelcomeEmail = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to the Sweet sin of Tuscany, secrets coming soon.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to the Sweet sin of Tuscany.</Heading>
          <Text style={tagline}>"We write the stories you swore you'd never tell anyone."</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>
            Thank you for joining {SITE_NAME}. You've just stepped behind the velvet curtain and we're so glad you're
            here.
          </Text>
          <Text style={text}>From now on, you'll be among the first to receive:</Text>
          <Text style={listItem}>
            · Chapter previews from <em>Sweet Sin of Tuscany</em>
          </Text>
          <Text style={listItem}>· Release news and announcements</Text>
          <Text style={listItem}>· Behind-the-scenes notes and character sketches</Text>
          <Text style={listItem}>· Studio updates and quiet little secrets</Text>
          <Text style={text}>No spam. Only secrets straight from the Sweet sin of Tuscany to your inbox.</Text>
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
  component: NewsletterWelcomeEmail,
  subject: "Welcome to the Sweet sin of Tuscany — secrets coming soon",
  displayName: "Newsletter welcome",
  previewData: {},
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Georgia, 'Times New Roman', serif",
  margin: "0",
  padding: "0",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 24px",
};

const header = {
  textAlign: "center" as const,
  padding: "0 0 24px",
};

const h1 = {
  fontSize: "28px",
  fontWeight: "normal",
  color: "#7a1f1f",
  margin: "0 0 12px",
  letterSpacing: "0.02em",
};

const tagline = {
  fontSize: "15px",
  fontStyle: "italic",
  color: "#8a6a6a",
  margin: "0",
};

const card = {
  backgroundColor: "#fbf7f5",
  border: "1px solid #e8d6d2",
  borderRadius: "4px",
  padding: "28px 28px 16px",
  margin: "24px 0",
};

const text = {
  fontSize: "15px",
  color: "#3a2a2a",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const listItem = {
  fontSize: "15px",
  color: "#3a2a2a",
  lineHeight: "1.7",
  margin: "0 0 8px",
  paddingLeft: "8px",
};

const footerSection = {
  textAlign: "center" as const,
  padding: "12px 0 0",
};

const footer = {
  fontSize: "14px",
  color: "#8a6a6a",
  fontStyle: "italic",
  margin: "0",
};
