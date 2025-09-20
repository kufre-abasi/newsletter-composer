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

interface MediaTeamTemplateProps {
  subject: string;
  sections: NewsletterSection[];
}

export const MediaTeamTemplate = ({ subject, sections }: MediaTeamTemplateProps) => {
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
              {section.type === 'video' && section.content && (
                <div style={videoContainer}>
                  <div style={videoPlaceholder}>
                    <div style={playButton}>▶</div>
                  </div>
                  <Text style={videoCaption}>{section.content}</Text>
                </div>
              )}
              {section.type === 'team' && section.metadata?.teamMembers && (
                <Row style={teamContainer}>
                  {section.metadata.teamMembers.map((member, index) => (
                    <Column key={index} style={teamMemberColumn}>
                      <div style={teamMemberStyle}>
                        <div style={avatarContainer}>
                          <Img
                            src={member.imageUrl}
                            alt={member.name}
                            style={avatarStyle}
                          />
                        </div>
                        <Text style={memberNameStyle}>{member.name}</Text>
                        <Text style={memberRoleStyle}>{member.role}</Text>
                      </div>
                    </Column>
                  ))}
                </Row>
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
              {section.type === 'image' && section.content && (
                <div style={imageCardContainer}>
                  <Img
                    src={section.content}
                    alt="Content image"
                    style={imageCardStyle}
                  />
                </div>
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
  padding: '20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const sectionStyle = {
  marginBottom: '32px',
};

const headerText = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const bodyText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const videoContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const videoPlaceholder = {
  width: '100%',
  height: '300px',
  backgroundColor: '#e5e7eb',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative' as const,
  marginBottom: '16px',
};

const playButton = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: '#1f2937',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  fontWeight: 'bold',
};

const videoCaption = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
  textAlign: 'center' as const,
};

const teamContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const teamMemberColumn = {
  width: '33.33%',
  paddingRight: '8px',
  paddingLeft: '8px',
};

const teamMemberStyle = {
  textAlign: 'center' as const,
};

const avatarContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '12px',
};

const avatarStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover' as const,
  backgroundColor: '#e5e7eb',
};

const memberNameStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 4px',
};

const memberRoleStyle = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const buttonStyle = {
  backgroundColor: '#1f2937',
  color: '#ffffff',
  padding: '16px 40px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
};

const imageCardContainer = {
  margin: '24px 0',
};

const imageCardStyle = {
  width: '100%',
  height: '240px',
  objectFit: 'cover' as const,
  borderRadius: '12px',
  backgroundColor: '#f3f4f6',
};