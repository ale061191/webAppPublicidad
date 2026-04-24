import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voltaje Plus - Sistema de Gestión',
  description: 'Sistema de gestión centralizado para publicidad en totems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}