import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 YouFitness+. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Transforme seu corpo, transforme sua vida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
