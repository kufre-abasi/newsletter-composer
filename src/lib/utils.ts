import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Newsletter } from '@/types/newsletter';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

 export const getStatusColor = (status: Newsletter['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-warning text-warning-foreground';
      case 'scheduled':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

 export const getLayoutIcon = (layout: Newsletter['layout']) => {
    switch (layout) {
      case 'professional':
        return '💼';
      case 'modern':
        return '🎨';
      default:
        return '📄';
    }
  };
