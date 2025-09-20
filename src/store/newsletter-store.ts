import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Newsletter, NewsletterSection } from '@/types/newsletter';

interface NewsletterStore {
  currentNewsletter: Newsletter | null;
  savedNewsletters: Newsletter[];
  
  // Actions
  createNewsletter: () => void;
  updateSubject: (subject: string) => void;
  updateSection: (sectionId: string, content: string) => void;
  addSection: (type: NewsletterSection['type']) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (sections: NewsletterSection[]) => void;
  setLayout: (layout: Newsletter['layout']) => void;
  saveNewsletter: (status: Newsletter['status'], scheduledDate?: Date) => void;
  loadNewsletter: (newsletter: Newsletter) => void;
  deleteNewsletter: (id: string) => void;
  loadTemplate: (template: Newsletter) => void;
}

const createDefaultSection = (type: NewsletterSection['type'], order: number): NewsletterSection => ({
  id: uuidv4(),
  type,
  content: type === 'header' ? 'Welcome to our newsletter!' : 
           type === 'text' ? 'Add your content here...' : 
           'https://picsum.photos/600/300',
  order,
});

export const useNewsletterStore = create<NewsletterStore>()(
  persist(
    (set, get) => ({
      currentNewsletter: null,
      savedNewsletters: [],

      createNewsletter: () => {
        const newNewsletter: Newsletter = {
          id: uuidv4(),
          subject: '',
          sections: [
            createDefaultSection('header', 0),
            createDefaultSection('text', 1),
          ],
          layout: 'simple',
          status: 'draft',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set({ currentNewsletter: newNewsletter });
      },

      updateSubject: (subject: string) => {
        const current = get().currentNewsletter;
        if (current) {
          set({
            currentNewsletter: {
              ...current,
              subject,
              updatedAt: new Date(),
            },
          });
        }
      },

      updateSection: (sectionId: string, content: string) => {
        const current = get().currentNewsletter;
        if (current) {
          const updatedSections = current.sections.map(section =>
            section.id === sectionId ? { ...section, content } : section
          );
          set({
            currentNewsletter: {
              ...current,
              sections: updatedSections,
              updatedAt: new Date(),
            },
          });
        }
      },

      addSection: (type: NewsletterSection['type']) => {
        const current = get().currentNewsletter;
        if (current) {
          const newSection = createDefaultSection(type, current.sections.length);
          set({
            currentNewsletter: {
              ...current,
              sections: [...current.sections, newSection],
              updatedAt: new Date(),
            },
          });
        }
      },

      removeSection: (sectionId: string) => {
        const current = get().currentNewsletter;
        if (current) {
          const filteredSections = current.sections
            .filter(section => section.id !== sectionId)
            .map((section, index) => ({ ...section, order: index }));
          set({
            currentNewsletter: {
              ...current,
              sections: filteredSections,
              updatedAt: new Date(),
            },
          });
        }
      },

      reorderSections: (sections: NewsletterSection[]) => {
        const current = get().currentNewsletter;
        if (current) {
          const reorderedSections = sections.map((section, index) => ({
            ...section,
            order: index,
          }));
          set({
            currentNewsletter: {
              ...current,
              sections: reorderedSections,
              updatedAt: new Date(),
            },
          });
        }
      },

      setLayout: (layout: Newsletter['layout']) => {
        const current = get().currentNewsletter;
        if (current) {
          set({
            currentNewsletter: {
              ...current,
              layout,
              updatedAt: new Date(),
            },
          });
        }
      },

      saveNewsletter: (status: Newsletter['status'], scheduledDate?: Date) => {
        const current = get().currentNewsletter;
        if (current) {
          const newsletterToSave = {
            ...current,
            status,
            scheduledDate,
            updatedAt: new Date(),
          };

          const existingIndex = get().savedNewsletters.findIndex(n => n.id === current.id);
          let updatedSavedNewsletters;

          if (existingIndex >= 0) {
            updatedSavedNewsletters = get().savedNewsletters.map(n =>
              n.id === current.id ? newsletterToSave : n
            );
          } else {
            updatedSavedNewsletters = [...get().savedNewsletters, newsletterToSave];
          }

          set({
            savedNewsletters: updatedSavedNewsletters,
            currentNewsletter: newsletterToSave,
          });
        }
      },

      loadNewsletter: (newsletter: Newsletter) => {
        set({ currentNewsletter: { ...newsletter } });
      },

      deleteNewsletter: (id: string) => {
        const updatedSavedNewsletters = get().savedNewsletters.filter(n => n.id !== id);
        set({ savedNewsletters: updatedSavedNewsletters });
      },

      loadTemplate: (template: Newsletter) => {
        const newNewsletter: Newsletter = {
          ...template,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'draft',
        };
        set({ currentNewsletter: newNewsletter });
      },
    }),
    {
      name: 'newsletter-storage',
    }
  )
);