import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import { NewsletterSection } from '@/types/newsletter';

interface TabbedContentTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const TabbedContentTemplate = ({ subject, sections }: TabbedContentTemplateProps) => {
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
              {section.type === 'tabs' && section.metadata?.tabs && (
                <div style={tabsContainer}>
                  <div style={tabNavigation}>
                    {section.metadata.tabs.map((tab, index) => (
                      <div key={index} style={index === 0 ? activeTabStyle : tabStyle}>
                        {tab.label}
                      </div>
                    ))}
                  </div>
                  <div style={tabContent}>
                    <Text style={tabContentText}>
                      {section.metadata.tabs[0]?.content || ''}
                    </Text>
                  </div>
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
                        <div style={cardContentStyle}>
                          <Text style={cardTitleStyle}>{card.title}</Text>
                          <Text style={cardDescriptionStyle}>{card.description}</Text>
                        </div>
                      </div>
                    </Column>
                  ))}
                </Row>
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
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const sectionStyle = {
  padding: '24px',
};

const headerText = {
  fontSize: '28px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1e293b',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const bodyText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#475569',
  margin: '0 0 24px',
};

const tabsContainer = {
  margin: '24px 0',
};

const tabNavigation = {
  display: 'flex',
  borderBottom: '2px solid #e2e8f0',
  marginBottom: '24px',
};

const tabStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '500',
  color: '#64748b',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  cursor: 'pointer',
  marginRight: '8px',
};

const activeTabStyle = {
  ...tabStyle,
  color: '#3b82f6',
  borderBottomColor: '#3b82f6',
  fontWeight: '600',
};

const tabContent = {
  padding: '16px 0',
};

const tabContentText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#475569',
  margin: '0',
};

const gridContainer = {
  margin: '24px 0',
};

const cardColumn = {
  width: '50%',
  paddingRight: '8px',
  paddingLeft: '8px',
  marginBottom: '16px',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease',
};

const cardImageStyle = {
  width: '100%',
  height: '140px',
  objectFit: 'cover' as const,
  backgroundColor: '#f1f5f9',
};

const cardContentStyle = {
  padding: '16px',
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1e293b',
  margin: '0 0 8px',
};

const cardDescriptionStyle = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.5',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '16px',
};