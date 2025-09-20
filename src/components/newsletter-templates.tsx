import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNewsletterStore } from '@/store/newsletter-store';
import { Newsletter } from '@/types/newsletter';
import { v4 as uuidv4 } from 'uuid';

const TEMPLATES: Newsletter[] = [
  {
    id: 'welcome-template',
    subject: 'Welcome to Our Community! 🎉',
    layout: 'professional',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'Welcome to Our Amazing Community!',
        order: 0,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "We're thrilled to have you join our community of innovators and creators. Get ready for exclusive content, insider tips, and exciting updates delivered straight to your inbox.",
        order: 1,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "Here's what you can expect:\n\n• Weekly industry insights\n• Exclusive member-only content\n• Early access to new features\n• Community highlights and success stories",
        order: 2,
      },
    ],
  },
  {
    id: 'product-update-template',
    subject: 'Exciting Product Updates This Month 🚀',
    layout: 'modern',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'Product Updates & New Features',
        order: 0,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "This month has been incredible for product development. We've shipped some amazing features that our community has been requesting.",
        order: 1,
      },
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://picsum.photos/600/300?random=1',
        order: 2,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "🎯 Key Updates:\n\n• Enhanced user dashboard with real-time analytics\n• New collaboration tools for teams\n• Mobile app performance improvements\n• Advanced security features\n\nTry them out and let us know what you think!",
        order: 3,
      },
    ],
  },
  {
    id: 'weekly-digest-template',
    subject: 'Your Weekly Digest: Top Stories & Insights',
    layout: 'simple',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'This Week in Review',
        order: 0,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "Here are the top stories and insights from this week that caught our attention and might interest you too.",
        order: 1,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "📈 Trending Topics:\n\n1. AI revolutionizing content creation\n2. Remote work productivity hacks\n3. Sustainable business practices\n4. Customer experience innovations\n5. Future of digital marketing",
        order: 2,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: "📚 Recommended Reading:\n\nWe've curated some excellent articles and resources that align with current industry trends. Check them out in our resource center.",
        order: 3,
      },
    ],
  },
];

export const NewsletterTemplates = () => {
  const { currentNewsletter, loadTemplate } = useNewsletterStore();

  const handleUseTemplate = (template: Newsletter) => {
    loadTemplate(template);
  };

  const getLayoutColor = (layout: Newsletter['layout']) => {
    switch (layout) {
      case 'professional':
        return 'bg-primary text-primary-foreground';
      case 'modern':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getLayoutIcon = (layout: Newsletter['layout']) => {
    switch (layout) {
      case 'professional':
        return '💼';
      case 'modern':
        return '🎨';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose a Template</h2>
        <p className="text-muted-foreground">
          Start with a professionally designed template and customize it to
          match your brand
        </p>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className={`shadow-card hover:shadow-editor transition-all group ${currentNewsletter.layout === template.layout ? 'border-2 border-primary shadow-editor' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg leading-6">
                      {template.subject}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getLayoutColor(template.layout)}>
                        {getLayoutIcon(template.layout)} {template.layout}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {template.sections.length} sections
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {template.sections.slice(0, 2).map((section, index) => (
                    <div key={section.id} className="text-sm">
                      <span className="text-muted-foreground capitalize">
                        {section.type}:
                      </span>{' '}
                      <span className="line-clamp-2">
                        {section.content.substring(0, 60)}
                        {section.content.length > 60 ? '...' : ''}
                      </span>
                    </div>
                  ))}
                  {template.sections.length > 2 && (
                    <div className="text-sm text-muted-foreground">
                      +{template.sections.length - 2} more sections
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className={`w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors ${currentNewsletter.layout === template.layout ? 'bg-primary text-primary-foreground' : ''}`}
                  variant="outline"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};