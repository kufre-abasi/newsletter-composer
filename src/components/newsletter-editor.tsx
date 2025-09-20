import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
import { useNewsletterStore } from '@/store/newsletter-store';
import { NewsletterSection } from '@/types/newsletter';
import { Plus, Trash2, GripVertical, Type, Image, Heading } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { EmailLayoutSelect } from './email-layout-select';
import type { DropResult } from '@hello-pangea/dnd';

export const NewsletterEditor = () => {
  const {
    currentNewsletter,
    updateSubject,
    updateSection,
    addSection,
    removeSection,
    reorderSections,
   } = useNewsletterStore();

  const [draggedSections, setDraggedSections] = useState<NewsletterSection[]>([]);

  if (!currentNewsletter) return null;


  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(draggedSections.length > 0 ? draggedSections : currentNewsletter.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderSections(items);
    setDraggedSections([]);
  };

  const getSectionIcon = (type: NewsletterSection['type']) => {
    switch (type) {
      case 'header':
        return <Heading className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
    }
  };

  const sections = currentNewsletter.sections.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Newsletter Metadata */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📧 Newsletter Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={currentNewsletter.subject}
              onChange={(e) => updateSubject(e.target.value)}
              placeholder="Enter your newsletter subject..."
              className="lg:text-lg"
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="layout">Email Layout</Label>
            <EmailLayoutSelect />
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex lg:flex-row gap-4 flex-col items-center justify-between">
            <span className="flex items-center gap-2">📝 Content Sections</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSection('header')}
                className="gap-2"
              >
                <Heading className="h-4 w-4" />
                Header
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSection('text')}
                className="gap-2"
              >
                <Type className="h-4 w-4" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSection('image')}
                className="gap-2"
              >
                <Image className="h-4 w-4" />
                Image
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-editor rounded-lg border p-4 transition-all ${
                            snapshot.isDragging ? 'shadow-editor' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              {...provided.dragHandleProps}
                              className="mt-2 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="gap-1">
                                  {getSectionIcon(section.type)}
                                  {section.type.charAt(0).toUpperCase() +
                                    section.type.slice(1)}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSection(section.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              {section.type === 'image' ? (
                                <Input
                                  value={section.content}
                                  onChange={(e) =>
                                    updateSection(section.id, e.target.value)
                                  }
                                  placeholder="Enter image URL..."
                                  className="border-0 px-0 focus:ring-0 focus:ring-offset-0 focus:outline-none  bg-white !p-1"
                                />
                              ) : (
                                <Textarea
                                  value={section.content}
                                  onChange={(e) =>
                                    updateSection(section.id, e.target.value)
                                  }
                                  placeholder={
                                    section.type === 'header'
                                      ? 'Enter your header text...'
                                      : 'Enter your content...'
                                  }
                                  rows={section.type === 'header' ? 2 : 4}
                                  className="resize-none border-0 px-0 focus:ring-0 focus:ring-offset-0 focus:outline-none  bg-white !p-1"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {sections.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No sections yet</p>
              <p className="text-sm">
                Add your first section using the buttons above
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};