export interface NewsletterSection {
  id: string;
  type:
    | 'text'
    | 'header'
    | 'image'
    | 'button'
    | 'video'
    | 'card-grid'
    | 'team'
    | 'tabs';
  content: string;
  order: number;
  metadata?: {
    buttonText?: string;
    buttonUrl?: string;
    videoUrl?: string;
    cards?: Array<{
      title: string;
      description: string;
      imageUrl: string;
    }>;
    teamMembers?: Array<{
      name: string;
      role: string;
      imageUrl: string;
    }>;
    tabs?: Array<{
      label: string;
      content: string;
    }>;
  };
}

export interface Newsletter {
  id: string;
  subject: string;
  sections: NewsletterSection[];
  layout:
    | 'simple'
    | 'professional'
    | 'modern'
    | 'card-grid'
    | 'media-team'
    | 'tabbed-content';
  status: 'draft' | 'scheduled';
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterTemplate {
  id: string;
  name: string;
  description: string;
  layout: Newsletter['layout'];
  defaultSections: Omit<NewsletterSection, 'id'>[];
}
