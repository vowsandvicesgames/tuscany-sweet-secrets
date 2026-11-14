import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Vows & Vices";

type NewsletterWelcomeProps = {
  unsubscribeUrl?: string;
};

const NewsletterWelcomeEmail = ({ unsubscribeUrl }: NewsletterWelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Episode 1 is free to play now. Your seat at the villa is waiting.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to Sweet Sin of Tuscany.</Heading>
          <Text style={tagline}>We write the stories you swore you'd never tell anyone.</Text>
        </Section>

        <Section style={card}>
          <Text style={text}>
            Thank you for joining {SITE_NAME}. We're so glad you're here.
          </Text>
          <Text style={text}>
            <strong>Episode 1 is free to play now.</strong>
          </Text>
          <Button style={button} href="https://vowsandvices.itch.io/sweet-sin-of-tuscany">
            Play on itch.io
          </Button>
          <Text style={text}>From now on, you'll be among the first to receive:</Text>
          <Text style={listItem}>· Episode previews and release news</Text>
          <Text style={listItem}>· Behind-the-scenes notes and character sketches</Text>
          <Text style={listItem}>· Studio updates and quiet little secrets</Text>
          <Text style={text}>
            Can't wait for the next episode? Patrons get early builds, uncensored previews, monthly 8K wallpapers and a vote in story choices.
          </Text>
          <Text style={text}>Or join for free and get our dev logs and free releases.</Text>
          <Button style={button} href="https://www.patreon.com/cw/VowsandVicesStudio">
            Join us on Patreon for free
          </Button>
          <Text style={text}>No spam. Only secrets from Tuscany, straight to your inbox.</Text>
        </Section>

        <Section style={footerSection}>
          <Text style={followLabel}>Follow us</Text>
          <Text style={socialRow}>
            <Link href="https://www.reddit.com/user/DowntownPrompt5202/" style={socialPill}>Reddit</Link>
            <Link href="https://x.com/VowsandVice" style={socialPill}>X</Link>
            <Link href="https://bsky.app/profile/vowsandvices.bsky.social" style={socialPill}>Bluesky</Link>
            <Link href="https://discord.gg/pVkRhe2ZEJ" style={socialPill}>Discord</Link>
          </Text>
          <Text style={footer}>
            With love,
            <br />
            The {SITE_NAME} Team
          </Text>
          <Text style={mutedFooter}>
            You're receiving this because you subscribed at vowsandvicesstudio.com.{" "}
            {unsubscribeUrl ? (
              <Link href={unsubscribeUrl} style={inlineLink}>
                Unsubscribe
              </Link>
            ) : (
              "Unsubscribe"
            )}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: NewsletterWelcomeEmail,
  subject: "Welcome to Sweet Sin of Tuscany",
  displayName: "Newsletter welcome",
  previewData: {
    unsubscribeUrl: "https://vowsandvicesstudio.com/email/unsubscribe?token=preview",
  },
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

const button = {
  backgroundColor: "#7a1f1f",
  color: "#ffffff",
  fontSize: "15px",
  padding: "12px 24px",
  borderRadius: "4px",
  textDecoration: "none",
  margin: "0 0 24px",
};

const inlineLink = {
  color: "#7a1f1f",
  textDecoration: "underline",
};

const footerSection = {
  textAlign: "center" as const,
  padding: "12px 0 0",
};

const footer = {
  fontSize: "14px",
  color: "#8a6a6a",
  fontStyle: "italic",
  margin: "0 0 16px",
};

const mutedFooter = {
  fontSize: "12px",
  color: "#8a6a6a",
  margin: "0 0 8px",
};
