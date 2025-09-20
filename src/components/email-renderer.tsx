import { render } from '@react-email/render';
import { useState, useEffect } from 'react';
import { SimpleTemplate } from './email-templates/simple-template';
import { ProfessionalTemplate } from './email-templates/professional-template';
import { ModernTemplate } from './email-templates/modern-template';
import { CardGridTemplate } from './email-templates/card-grid-template';
import { MediaTeamTemplate } from './email-templates/media-team-template';
import { TabbedContentTemplate } from './email-templates/tabbed-content-template';
import { Newsletter } from '@/types/newsletter';

interface EmailRendererProps {
  newsletter: Newsletter;
  className?: string;
}

export const EmailRenderer = ({
  newsletter,
  className
}: EmailRendererProps) => {
  const [html, setHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const getTemplate = () => {
    const props = {
      subject: newsletter.subject,
      sections: newsletter.sections.sort((a, b) => a.order - b.order)
    };

    switch (newsletter.layout) {
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'card-grid':
        return <CardGridTemplate {...props} />;
      case 'media-team':
        return <MediaTeamTemplate {...props} />;
      case 'tabbed-content':
        return <TabbedContentTemplate {...props} />;
      default:
        return <SimpleTemplate {...props} />;
    }
  };

  useEffect(() => {
    const renderEmail = async () => {
      setIsLoading(true);
      try {
        const template = getTemplate();
        const renderedHtml = await render(template);
        setHtml(renderedHtml);
      } catch (error) {
        console.error('Error rendering email:', error);
        setHtml(
          '<div style="padding: 20px; text-align: center; color: red;">Error rendering email preview</div>'
        );
      } finally {
        setIsLoading(false);
      }
    };

    renderEmail();
  }, [newsletter]);

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Rendering preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        srcDoc={html}
        className="w-full h-full border-0 rounded-lg"
        title="Email Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
};
