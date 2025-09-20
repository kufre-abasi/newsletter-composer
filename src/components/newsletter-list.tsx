import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNewsletterStore } from '@/store/newsletter-store';
import { EmailRenderer } from './email-renderer';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Edit, Trash2, Calendar, FileText } from 'lucide-react';
import { Newsletter } from '@/types/newsletter';
import { getStatusColor, getLayoutIcon } from '@/lib/utils';

export const NewsletterList = ({showEditor}: {showEditor: () => void}) => {
  const { savedNewsletters, loadNewsletter, deleteNewsletter } = useNewsletterStore();
  const [previewNewsletter, setPreviewNewsletter] = useState<Newsletter | null>(null);

  const handleEdit = (newsletter: Newsletter) => {
    loadNewsletter(newsletter);
    showEditor()
  };
   const handleDelete = (id: string) => {
    deleteNewsletter(id);
  };
 
  if (savedNewsletters.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No newsletters yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first newsletter to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {savedNewsletters
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .map((newsletter) => (
            <Card
              key={newsletter.id}
              className="shadow-card flex flex-col justify-between hover:shadow-editor h-full transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex flex-col">
                    <CardTitle className="text-lg leading-6">
                      {newsletter.subject || 'Untitled Newsletter'}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className='capitalize'>
                        {getLayoutIcon(newsletter.layout)} {newsletter.layout}
                      </span>
                      <span>•</span>
                      <span>{newsletter.sections.length} sections</span>
                      <span>•</span>
                      <span>
                        Updated{' '}
                        {formatDistanceToNow(new Date(newsletter.updatedAt))}{' '}
                        ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(newsletter.status)}>
                      {newsletter.status === 'scheduled' && (
                        <Calendar className="h-3 w-3 mr-1" />
                      )}
                      {newsletter.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {newsletter.scheduledDate && (
                  <div className="mb-3 text-sm text-muted-foreground">
                    📅 Scheduled for{' '}
                    {new Date(newsletter.scheduledDate).toLocaleDateString()}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewNewsletter(newsletter)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(newsletter)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(newsletter.id)}
                    className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Preview Sheet */}
      <Sheet
        open={!!previewNewsletter}
        onOpenChange={() => setPreviewNewsletter(null)}
      >
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>
              {previewNewsletter?.subject || 'Newsletter Preview'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 h-[calc(100vh-120px)]">
            {previewNewsletter && (
              <EmailRenderer
                newsletter={previewNewsletter}
                className="h-full"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};