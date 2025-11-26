import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Globe className="h-6 w-6 text-primary" />
            <p className="text-lg font-semibold font-headline">Global Logistics Pro</p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Global Logistics Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
