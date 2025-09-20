export interface NewsletterSection {
  id: string;
  type: 'text' | 'header' | 'image';
  content: string;
  order: number;
}

export interface Newsletter {
  id: string;
  subject: string;
  sections: NewsletterSection[];
  layout: 'simple' | 'professional' | 'modern';
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