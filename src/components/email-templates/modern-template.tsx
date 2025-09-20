import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { NewsletterSection } from '@/types/newsletter';

interface ModernTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const ModernTemplate = ({ subject, sections }: ModernTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Modern Header with Gradient */}
          <Section style={headerSection}>
            <Text style={brandText}>Newsletter</Text>
          </Section>

          {/* Content Grid */}
          {sections.map((section) => (
            <Section key={section.id} style={cardSection}>
              {section.type === 'header' && (
                <Text style={headerText}>{section.content}</Text>
              )}
              {section.type === 'text' && (
                <Text style={bodyText}>{section.content}</Text>
              )}
              {section.type === 'image' && section.content && (
                <Img
                  src={section.content}
                  alt="Newsletter image"
                  style={imageStyle}
                />
              )}
            </Section>
          ))}

          {/* Modern Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Crafted with ❤️ for our amazing community
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#0f172a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '40px 20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

const headerSection = {
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  borderRadius: '12px 12px 0 0',
  padding: '32px 24px',
  textAlign: 'center' as const,
  marginBottom: '2px',
};

const brandText = {
  fontSize: '28px',
  fontWeight: '800',
  color: '#ffffff',
  margin: '0',
  textAlign: 'center' as const,
};

const cardSection = {
  backgroundColor: '#ffffff',
  padding: '24px',
  marginBottom: '2px',
};

const headerText = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 16px',
};

const bodyText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 16px',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const footerSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '0 0 12px 12px',
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
  textAlign: 'center' as const,
};