'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email({ message: 'Adresa de email nu este validă' }),
  subject: z.string().min(5, 'Subiectul trebuie să aibă cel puțin 5 caractere'),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajul a fost trimis cu succes! Îți vom răspunde în curând.',
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'A apărut o eroare la trimiterea mesajului.',
        });
      }
    } catch (_error) {
      setSubmitStatus({
        type: 'error',
        message: 'A apărut o eroare de conexiune. Te rugăm să încerci din nou.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d62828] rounded-full mb-6">
            <MessageCircle className="h-10 w-10 text-[#f0f0f0]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-6">
            Contactează <span className="text-[#d62828]">echipa</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 max-w-3xl mx-auto">
            Suntem aici să răspundem la întrebările tale și să te ajutăm cu orice ai nevoie. Nu ezita să ne contactezi!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#d62828] mb-8">Informații de contact</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-[#1a1a1a] rounded-lg border border-[#d62828]/30">
                <div className="flex-shrink-0 w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">Telefon</h3>
                  <a 
                    href="tel:0752268082"
                    className="text-[#d62828] hover:text-[#b61e1e] transition-colors text-lg"
                  >
                    0752 268 082
                  </a>
                  <p className="text-[#f0f0f0]/70 text-sm mt-1">
                    Suntem disponibili pentru apeluri telefonice
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#1a1a1a] rounded-lg border border-[#d62828]/30">
                <div className="flex-shrink-0 w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">Email</h3>
                  <a 
                    href="mailto:contact@soringomoiu.ro"
                    className="text-[#d62828] hover:text-[#b61e1e] transition-colors text-lg"
                  >
                    contact@soringomoiu.ro
                  </a>
                  <p className="text-[#f0f0f0]/70 text-sm mt-1">
                    Îți răspundem în maxim 24 de ore
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#1a1a1a] rounded-lg border border-[#d62828]/30">
                <div className="flex-shrink-0 w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">Locație</h3>
                  <p className="text-[#f0f0f0]/80 text-lg mb-1">România</p>
                  <p className="text-[#f0f0f0]/70 text-sm">
                    Activăm la nivel național
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#1a1a1a] rounded-lg border border-[#d62828]/30">
                <div className="flex-shrink-0 w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">Program</h3>
                  <p className="text-[#f0f0f0]/80 text-lg mb-1">24/7 Online</p>
                  <p className="text-[#f0f0f0]/70 text-sm">
                    Radio live non-stop, suport L-V 09:00-18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#d62828] mb-8">Trimite-ne un mesaj</h2>
            
            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30">
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-600/20 border border-green-600/30 text-green-300' 
                    : 'bg-red-600/20 border border-red-600/30 text-red-300'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  )}
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#f0f0f0] mb-2">
                    Numele tău *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-[#f0f0f0] placeholder-[#f0f0f0]/50 ${
                      errors.name ? 'border-red-500' : 'border-[#d62828]/30'
                    }`}
                    placeholder="Introdu numele tău"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f0f0f0] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-[#f0f0f0] placeholder-[#f0f0f0]/50 ${
                      errors.email ? 'border-red-500' : 'border-[#d62828]/30'
                    }`}
                    placeholder="email@exemplu.ro"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f0f0f0] mb-2">
                    Subiect *
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-[#f0f0f0] placeholder-[#f0f0f0]/50 ${
                      errors.subject ? 'border-red-500' : 'border-[#d62828]/30'
                    }`}
                    placeholder="Despre ce vrei să vorbim?"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f0f0f0] mb-2">
                    Mesajul tău *
                  </label>
                  <textarea
                    rows={5}
                    {...register('message')}
                    className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-[#f0f0f0] placeholder-[#f0f0f0]/50 resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#d62828]/30'
                    }`}
                    placeholder="Scrie-ne mesajul tău aici..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-[#d62828] hover:bg-[#b61e1e] hover:transform hover:scale-105'
                  } text-white`}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                </button>
              </form>
            </div>
          </div>
        </div>


        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30">
          <h2 className="text-3xl font-bold text-[#d62828] mb-8 text-center">Întrebări frecvente</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-3">
                Cum pot să îmi difuzez muzica la voi?
              </h3>
              <p className="text-[#f0f0f0]/70 mb-6">
                Accesează pagina <a href="/alatura-te-ca-artist" className="text-[#d62828] hover:underline">Alătură-te Ca Artist</a> 
                și completează formularul de înregistrare. Echipa noastră va evalua materialul în 7 zile.
              </p>

              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-3">
                Cum pot asculta radio-ul live?
              </h3>
              <p className="text-[#f0f0f0]/70">
                Poți asculta direct de pe site-ul nostru, 24/7, fără reclame. 
                Playerul este disponibil pe toate paginile.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-3">
                Costă ceva să ascult muzica?
              </h3>
              <p className="text-[#f0f0f0]/70 mb-6">
                Nu! Ascultarea este complet gratuită, fără reclame și fără abonamente.
              </p>

              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-3">
                Acceptați toate genurile muzicale?
              </h3>
              <p className="text-[#f0f0f0]/70">
                Acceptăm majoritatea genurilor, cu focus pe muzica românească originală. 
                Conținutul trebuie să respecte standardele noastre de calitate și decență.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
