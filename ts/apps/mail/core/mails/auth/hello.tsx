import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "react-email";

interface WelcomeEmailProps {
  nickname: string;
  userUrl: string;
}

export default function WelcomeEmail({
  nickname = "test",
  userUrl = "https://zed31rus.ru",
}: WelcomeEmailProps) {
  return (
    <Html lang="ru">
      <Head />
      <Preview>Добро пожаловать на zed31rus.ru, {nickname}!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>zed31rus.ru</Text>
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.content}>
            <Heading style={styles.heading}>
              Добро пожаловать,{" "}
              <Link href={userUrl} style={styles.link}>
                {nickname}
              </Link>
              !
            </Heading>

            <Text style={styles.text}>
              Рады приветствовать вас на zed31rus.ru. Спасибо, что
              присоединились к нам!
            </Text>
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>© 2026 zed31rus.ru</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    margin: "0 auto",
    maxWidth: "600px",
    padding: "24px",
  },
  header: {
    textAlign: "center",
  },
  logo: {
    color: "#18181b",
    fontSize: "22px",
    fontWeight: "bold",
    margin: 0,
  },
  divider: {
    borderColor: "#e4e4e7",
    margin: "24px 0",
  },
  content: {
    padding: "8px 0",
  },
  heading: {
    color: "#18181b",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  link: {
    color: "#18181b",
    textDecoration: "underline",
  },
  text: {
    color: "#52525b",
    fontSize: "16px",
    lineHeight: "24px",
    margin: 0,
  },
  footer: {
    textAlign: "center",
  },
  footerText: {
    color: "#a1a1aa",
    fontSize: "12px",
    margin: 0,
  },
};