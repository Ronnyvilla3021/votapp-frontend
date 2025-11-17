/* src/components/common/Layout.tsx */
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Contenedor principal centrado y distribuido */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer institucional */}
      <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-8 mt-auto border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
            {/* Columna 1: Información */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">VotApp</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
                Sistema de votaciones progresivo diseñado para instituciones
                educativas. Seguro, transparente y fácil de usar.
              </p>
            </div>

            {/* Columna 2: Enlaces */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">
                Acerca de
              </h3>
              <ul className="space-y-2 text-sm text-gray-300 text-center">
                <li>• Proyecto de titulación</li>
                <li>• Carrera: Desarrollo de Software</li>
                <li>• Instituto Superior Yavirac</li>
              </ul>
            </div>

            {/* Columna 3: Desarrolladores */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">
                Desarrolladores
              </h3>
              <ul className="space-y-2 text-sm text-gray-300 text-center">
                <li>• Ronny Villa</li>
                <li>• Jennifer Alvares</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <p className="text-sm text-gray-400">
              © 2025 VotApp - Sistema de Votaciones Progresivo
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Instituto Superior Tecnológico de Turismo y Patrimonio "Yavirac"
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
