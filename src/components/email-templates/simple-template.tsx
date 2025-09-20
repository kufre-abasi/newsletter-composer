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

interface SimpleTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const SimpleTemplate = ({ subject, sections }: SimpleTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {sections.map((section) => (
            <Section key={section.id} style={sectionStyle}>
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
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const sectionStyle = {
  marginBottom: '24px',
};

const headerText = {
  fontSize: '32px',
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