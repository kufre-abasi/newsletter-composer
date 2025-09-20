import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Button,
  Row,
  Column,
} from '@react-email/components';
import { NewsletterSection } from '@/types/newsletter';

interface CardGridTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const CardGridTemplate = ({ subject, sections }: CardGridTemplateProps) => {
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
                  style={featuredImageStyle}
                />
              )}
              {section.type === 'button' && section.metadata?.buttonText && (
                <div style={buttonContainer}>
                  <Button
                    href={section.metadata.buttonUrl || '#'}
                    style={buttonStyle}
                  >
                    {section.metadata.buttonText}
                  </Button>
                </div>
              )}
              {section.type === 'card-grid' && section.metadata?.cards && (
                <Row style={gridContainer}>
                  {section.metadata.cards.map((card, index) => (
                    <Column key={index} style={cardColumn}>
                      <div style={cardStyle}>
                        <Img
                          src={card.imageUrl}
                          alt={card.title}
                          style={cardImageStyle}
                        />
                        <Text style={cardTitleStyle}>{card.title}</Text>
                        <Text style={cardDescriptionStyle}>{card.description}</Text>
                      </div>
                    </Column>
                  ))}
                </Row>
              )}
            </Section>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f8f9fa',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const sectionStyle = {
  padding: '24px',
};

const headerText = {
  fontSize: '28px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 16px',
  textAlign: 'center' as const,
};

const bodyText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 16px',
};

const featuredImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover' as const,
  borderRadius: '8px',
  marginBottom: '16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const buttonStyle = {
  backgroundColor: '#1f2937',
  color: '#ffffff',
  padding: '12px 32px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
};

const gridContainer = {
  margin: '24px 0',
};

const cardColumn = {
  width: '48%',
  paddingRight: '1%',
  paddingLeft: '1%',
  marginBottom: '16px',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '16px',
};

const cardImageStyle = {
  width: '100%',
  height: '120px',
  objectFit: 'cover' as const,
  borderRadius: '6px',
  marginBottom: '12px',
  backgroundColor: '#f3f4f6',
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px',
};

const cardDescriptionStyle = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
  lineHeight: '1.5',
};