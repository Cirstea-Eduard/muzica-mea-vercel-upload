import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email({ message: 'Adresa de email nu este validă' }),
  subject: z.string().min(5, 'Subiectul trebuie să aibă cel puțin 5 caractere'),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    
    const msg = {
      to: process.env.CONTACT_EMAIL_TO || 'eduard.cirstea@systemiotech.com',
      from: process.env.CONTACT_EMAIL_FROM || 'contact@systemiotech.com',
      subject: `[MuzicaMea Contact] ${validatedData.subject}`,
      text: `
Nume: ${validatedData.name}
Email: ${validatedData.email}
Subiect: ${validatedData.subject}

Mesaj:
${validatedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #d62828, #b61e1e); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">MuzicaMea Contact</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #d62828; border-bottom: 2px solid #d62828; padding-bottom: 10px;">
              Mesaj nou de contact
            </h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nume:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
              <p><strong>Subiect:</strong> ${validatedData.subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #d62828; margin-top: 0;">Mesaj:</h3>
              <p style="line-height: 1.6; color: #333;">${validatedData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8e8e8; border-radius: 8px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Acest mesaj a fost trimis prin formularul de contact de pe 
                <a href="https://muzicamea.ro" style="color: #d62828;">muzicamea.ro</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajul a fost trimis cu succes!' 
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Date invalide', 
          errors: error.issues 
        }, 
        { status: 400 }
      );
    }
    
    if (error && typeof error === 'object' && 'response' in error) {
      console.error('SendGrid error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Eroare la trimiterea email-ului' 
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'A apărut o eroare neașteptată' 
      }, 
      { status: 500 }
    );
  }
}
