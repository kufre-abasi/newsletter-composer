import { useState } from 'react';
import { Button } from '@/components/ui/button';
 import { useNewsletterStore } from '@/store/newsletter-store';
 import { NewsletterTemplates } from './newsletter-templates';
 import {
   Sheet,
   SheetContent,
   SheetTrigger,
   SheetFooter
 } from '@/components/ui/sheet';

export const EmailLayoutSelect = () => {
  const { 
    currentNewsletter, 
    createNewsletter, 
    saveNewsletter
  } = useNewsletterStore();
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className='capitalize !justify-start'> {currentNewsletter.layout}</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <NewsletterTemplates />
        <SheetFooter className="flex justify-between py-4 items-center gap-2">
          <SheetTrigger asChild>
            <Button
              className={`w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors `}
            >
              Close
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};