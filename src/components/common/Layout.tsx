// src/components/common/Layout.tsx
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            VotApp © 2025 - Sistema de Votaciones Progresivo
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Desarrollado por Ronny Villa & Jennifer Alvares - IST Yavirac
          </p>
        </div>
      </footer>
    </div>
  );
};