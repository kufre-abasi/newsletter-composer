import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
 import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useNewsletterStore } from '@/store/newsletter-store';
import { NewsletterEditor } from './newsletter-editor';
import { EmailRenderer } from './email-renderer';
 import { useToast } from '@/hooks/use-toast';
import Header from './header';
import {
  Plus,
  Save,
  Calendar as CalendarIcon,
  Eye,
  FileText,
  Palette,
  Send,
  Clock,
  SquareLibrary
} from 'lucide-react';
import { format } from 'date-fns';
import { cn,getStatusColor, getLayoutIcon } from '@/lib/utils';
 import { NewslettersPage } from '@/components/newsletters';

export const NewsletterApp = () => {
  const { 
    currentNewsletter, 
    createNewsletter, 
    saveNewsletter 
  } = useNewsletterStore();
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('compose');
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [showEditor, setShowEditor] = useState(0);

 
  const handleSaveDraft = () => {
    if (!currentNewsletter) return;
    
    saveNewsletter('draft');
    toast({
      title: "Draft Saved",
      description: "Your newsletter has been saved as a draft.",
    });
  };

  const handleSchedule = () => {
    if (!currentNewsletter || !scheduledDate) return;
    
    saveNewsletter('scheduled', scheduledDate);
    setIsSaveDialogOpen(false);
    setScheduledDate(undefined);
    toast({
      title: "Newsletter Scheduled",
      description: `Your newsletter will be sent on ${format(scheduledDate, 'PPP')}.`,
    });
  };
  const handleCreateNew = () => {
    createNewsletter();
    setShowEditor(1);
   };

  const canSave = currentNewsletter && (currentNewsletter.subject.trim() || currentNewsletter.sections.length > 0);

  return (
    <div className="min-h-screen bg-gradient-hero w-full">
      <Header />
      <div className="container mx-auto px-4 py-8 mb-8 mt-20">
        {showEditor === 0 && (
          <NewslettersPage handleCreateNew={() => handleCreateNew()} />
        )}
        {showEditor === 1 && (
          <>
            <div className="">
              <div className="flex lg:flex-row gap-3 flex-col items-center justify-between mb-6">
                <Button
                  onClick={() => setShowEditor(0)}
                  className="gap-2 lg:w-auto w-full"
                >
                  <SquareLibrary className="h-4 w-4" />
                  My Newsletter
                </Button>
                <div className="flex flex-wrap items-center justify-between lg:justify-center gap-3">
                  {currentNewsletter && (
                    <>
                      <Button
                        onClick={handleSaveDraft}
                        variant="outline"
                        disabled={!canSave}
                        className="gap-2 border-2"
                      >
                        <Save className="h-4 w-4" />
                        Save Draft
                      </Button>
                      <Dialog
                        open={isSaveDialogOpen}
                        onOpenChange={setIsSaveDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button className="gap-2" disabled={!canSave}>
                            <Clock className="h-4 w-4" />
                            Schedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule Newsletter</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Send Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full justify-start text-left font-normal',
                                      !scheduledDate && 'text-muted-foreground'
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {scheduledDate
                                      ? format(scheduledDate, 'PPP')
                                      : 'Pick a date'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={setScheduledDate}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => setIsSaveDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSchedule}
                                disabled={!scheduledDate}
                                className="gap-2"
                              >
                                <Send className="h-4 w-4" />
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>

              {currentNewsletter && (
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge
                          variant="outline"
                          className={`gap-1 capitalize ${getStatusColor(currentNewsletter.status)}`}
                        >
                          <FileText className="h-3 w-3" />
                          {currentNewsletter.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground capitalize">
                          {currentNewsletter.sections.length} sections
                        </span>
                        <span className="text-sm text-muted-foreground capitalize">
                          Layout: {getLayoutIcon(currentNewsletter.layout)}{' '}
                          {currentNewsletter.layout}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last updated:{' '}
                        {format(
                          currentNewsletter.updatedAt,
                          'MMM d, yyyy HH:mm'
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {currentNewsletter ? (
              <div className="grid lg:grid-cols-2 mt-6 gap-6">
                <div>
                  <NewsletterEditor />
                </div>
                <div className="lg:sticky lg:top-6">
                  <Card className="shadow-preview">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Live Preview
                      </h3>
                      <div className="bg-preview rounded-lg p-1">
                        <EmailRenderer
                          newsletter={currentNewsletter}
                          className="h-[600px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="shadow-card">
                <CardContent className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    No newsletter selected
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Create a new newsletter or choose a template to get started
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => setShowEditor(1)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create New
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('templates')}
                      className="gap-2"
                    >
                      <Palette className="h-4 w-4" />
                      Browse Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};