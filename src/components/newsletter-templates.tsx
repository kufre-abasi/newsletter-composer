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
        order: 0
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          "We're thrilled to have you join our community of innovators and creators. Get ready for exclusive content, insider tips, and exciting updates delivered straight to your inbox.",
        order: 1
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          "Here's what you can expect:\n\n• Weekly industry insights\n• Exclusive member-only content\n• Early access to new features\n• Community highlights and success stories",
        order: 2
      }
    ]
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
        order: 0
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          "This month has been incredible for product development. We've shipped some amazing features that our community has been requesting.",
        order: 1
      },
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://picsum.photos/600/300?random=1',
        order: 2
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          '🎯 Key Updates:\n\n• Enhanced user dashboard with real-time analytics\n• New collaboration tools for teams\n• Mobile app performance improvements\n• Advanced security features\n\nTry them out and let us know what you think!',
        order: 3
      }
    ]
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
        order: 0
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          'Here are the top stories and insights from this week that caught our attention and might interest you too.',
        order: 1
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          '📈 Trending Topics:\n\n1. AI revolutionizing content creation\n2. Remote work productivity hacks\n3. Sustainable business practices\n4. Customer experience innovations\n5. Future of digital marketing',
        order: 2
      },
      {
        id: uuidv4(),
        type: 'text',
        content:
          "📚 Recommended Reading:\n\nWe've curated some excellent articles and resources that align with current industry trends. Check them out in our resource center.",
        order: 3
      }
    ]
  },
  {
    id: 'card-grid-template',
    subject: 'Featured Content & Latest Updates 📋',
    layout: 'card-grid',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'Featured Content Hub',
        order: 0
      },
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://picsum.photos/600/200?random=2',
        order: 1
      },
      {
        id: uuidv4(),
        type: 'button',
        content: 'Call to Action',
        order: 2,
        metadata: {
          buttonText: 'Get Started',
          buttonUrl: '#'
        }
      },
      {
        id: uuidv4(),
        type: 'card-grid',
        content: 'Featured articles and updates',
        order: 3,
        metadata: {
          cards: [
            {
              title: 'Article Title',
              description: 'Brief description of the content',
              imageUrl: 'https://picsum.photos/300/200?random=3'
            },
            {
              title: 'Another Article',
              description: 'More engaging content for readers',
              imageUrl: 'https://picsum.photos/300/200?random=4'
            },
            {
              title: 'Latest Update',
              description: 'Important news and announcements',
              imageUrl: 'https://picsum.photos/300/200?random=5'
            },
            {
              title: 'Resource Guide',
              description: 'Helpful tips and best practices',
              imageUrl: 'https://picsum.photos/300/200?random=6'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'media-team-template',
    subject: 'Meet Our Team & Watch Our Latest Video 🎥',
    layout: 'media-team',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'Behind the Scenes',
        order: 0
      },
      {
        id: uuidv4(),
        type: 'video',
        content: 'Check out our latest company update video',
        order: 1
      },
      {
        id: uuidv4(),
        type: 'team',
        content: 'Meet our amazing team',
        order: 2,
        metadata: {
          teamMembers: [
            {
              name: 'Sarah Johnson',
              role: 'CEO & Founder',
              imageUrl: 'https://picsum.photos/150/150?random=7'
            },
            {
              name: 'Mike Chen',
              role: 'Head of Design',
              imageUrl: 'https://picsum.photos/150/150?random=8'
            },
            {
              name: 'Emily Davis',
              role: 'Lead Developer',
              imageUrl: 'https://picsum.photos/150/150?random=9'
            }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'button',
        content: 'Join Our Team',
        order: 3,
        metadata: {
          buttonText: 'View Open Positions',
          buttonUrl: '#careers'
        }
      },
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://picsum.photos/600/240?random=10',
        order: 4
      }
    ]
  },
  {
    id: 'tabbed-content-template',
    subject: 'Explore Our Content Categories 📚',
    layout: 'tabbed-content',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: uuidv4(),
        type: 'header',
        content: 'Discover What Interests You',
        order: 0
      },
      {
        id: uuidv4(),
        type: 'tabs',
        content: 'Browse by category',
        order: 1,
        metadata: {
          tabs: [
            {
              label: 'Technology',
              content:
                'Latest tech trends, tutorials, and industry insights that keep you ahead of the curve.'
            },
            {
              label: 'Business',
              content:
                'Strategic insights, leadership tips, and growth strategies for modern businesses.'
            },
            {
              label: 'Design',
              content:
                'Creative inspiration, design principles, and tools to enhance your visual projects.'
            }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'card-grid',
        content: 'Popular content',
        order: 2,
        metadata: {
          cards: [
            {
              title: 'Tech Tutorial',
              description: 'Step-by-step guide',
              imageUrl: 'https://picsum.photos/300/200?random=11'
            },
            {
              title: 'Business Case Study',
              description: 'Real-world examples',
              imageUrl: 'https://picsum.photos/300/200?random=12'
            },
            {
              title: 'Design Inspiration',
              description: 'Creative showcase',
              imageUrl: 'https://picsum.photos/300/200?random=13'
            },
            {
              title: 'Industry Report',
              description: 'Market analysis',
              imageUrl: 'https://picsum.photos/300/200?random=14'
            },
            {
              title: 'Expert Interview',
              description: 'Thought leadership',
              imageUrl: 'https://picsum.photos/300/200?random=15'
            },
            {
              title: 'Best Practices',
              description: 'Proven strategies',
              imageUrl: 'https://picsum.photos/300/200?random=16'
            }
          ]
        }
      }
    ]
  }
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
      case 'card-grid':
        return 'bg-blue-500 text-white';
      case 'media-team':
        return 'bg-purple-500 text-white';
      case 'tabbed-content':
        return 'bg-green-500 text-white';
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
      case 'card-grid':
        return '📋';
      case 'media-team':
        return '🎥';
      case 'tabbed-content':
        return '📚';
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
