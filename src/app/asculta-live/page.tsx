import { Metadata } from 'next';
import LiveRadioPage from '@/components/radio/LiveRadioPage';

export const metadata: Metadata = {
  title: 'Ascultă Live - MuzicaMea Radio | Player online 24/7',
  description: 'Ascultă MuzicaMea Radio live online. Muzică românească autentică, fără reclame, 24 ore din 24. Player audio de înaltă calitate.',
  keywords: 'asculta live, radio online, muzica romaneasca, player audio, live streaming, radio 24/7',
};

export default function AscultaLivePage() {
  return <LiveRadioPage />;
}
