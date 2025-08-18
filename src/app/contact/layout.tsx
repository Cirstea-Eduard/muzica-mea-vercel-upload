import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - MuzicaMea Radio | Ia legătura cu noi',
  description: 'Contactează echipa MuzicaMea Radio. Suntem aici să răspundem la întrebările tale și să te ajutăm cu orice ai nevoie.',
  keywords: 'contact muzicamea, telefon radio, email muzicamea, sorin gomoiu contact',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
