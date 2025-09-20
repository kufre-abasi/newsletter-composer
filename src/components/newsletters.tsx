import { Button } from '@/components/ui/button';
import { NewsletterList } from './newsletter-list';
import Header from './header';
import { Plus } from 'lucide-react';

export const NewslettersPage = ({
  handleCreateNew
}: {
  handleCreateNew: () => void;
}) => {
  return (
    <div className="">
      <div className="mb-8">
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex flex-wrap items-center justify-between lg:justify-center gap-3">
            <span className="text-muted-foreground text-3xl font-bold">
              News letters
            </span>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      <NewsletterList showEditor={handleCreateNew} />
    </div>
  );
};
