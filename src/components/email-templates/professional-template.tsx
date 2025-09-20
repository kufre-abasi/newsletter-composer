import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import { NewsletterSection } from '@/types/newsletter';

interface ProfessionalTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const ProfessionalTemplate = ({ subject, sections }: ProfessionalTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={brandText}>Your Newsletter</Text>
            <Hr style={hr} />
          </Section>

          {/* Content Sections */}
          {sections.map((section, index) => (
            <Section key={section.id} style={contentSection}>
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
              {index < sections.length - 1 && <Hr style={sectionDivider} />}
            </Section>
          ))}

          {/* Footer */}
          <Section style={footerSection}>
            <Hr style={hr} />
            <Text style={footerText}>
              Thank you for reading our newsletter!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const headerSection = {
  padding: '0 0 24px',
};

const brandText = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  textAlign: 'center' as const,
  margin: '0 0 16px',
};

const contentSection = {
  marginBottom: '24px',
};

const headerText = {
  fontSize: '28px',
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

const hr = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const sectionDivider = {
  borderColor: '#f3f4f6',
  margin: '16px 0',
};

const footerSection = {
  paddingTop: '24px',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '16px 0 0',
};