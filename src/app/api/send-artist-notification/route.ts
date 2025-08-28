import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  type?: string;
}

interface ArtistData {
  artistName: string;
  songTitle: string;
  email: string;
  phone: string;
  description: string;
  package: string;
  hasImage: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { artistData, uploadResults } = await request.json();

    const { artistName, songTitle, email, phone, description, package: packageType } = artistData as ArtistData;
    const { music, image } = uploadResults as { music?: UploadResult; image?: UploadResult };

    const musicStatus = music?.success ? '✅ Succes' : '❌ Eșuat';
    const imageStatus = image ? (image.success ? '✅ Succes' : '❌ Eșuat') : '⏹️ Nu a fost încărcat';

    const musicLink = music?.success ? music.url : 'Nu a fost încărcat';
    const imageLink = image?.success ? image.url : 'Nu a fost încărcat';

    const msg = {
      to: process.env.CONTACT_EMAIL_TO || 'sorin.gomoiu@yahoo.com',
      from: process.env.CONTACT_EMAIL_FROM || 'contact@systemiotech.com',
      subject: `[MuzicaMea] Înregistrare Nouă Artist - ${artistName}`,
      text: `
🎵 ÎNREGISTRARE NOUĂ ARTIST - MuzicaMea Radio

Detalii Artist:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nume Artist: ${artistName}
🎵 Titlu Piesă: ${songTitle}
📧 Email: ${email}
📞 Telefon: ${phone}
📦 Pachet Ales: ${packageType.toUpperCase()}

Descriere:
${description}

Status Upload Fișiere:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎵 Muzică: ${musicStatus}
${music?.success ? `🔗 Link: ${musicLink}` : `❌ Eroare: ${music?.error || 'Necunoscut'}`}

🖼️ Imagine: ${imageStatus}
${image?.success ? `🔗 Link: ${imageLink}` : image?.error ? `❌ Eroare: ${image.error}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Acest email a fost generat automat din formularul de înregistrare artist.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f9f9f9;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #d62828, #b61e1e); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎵 MuzicaMea Radio</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Înregistrare Nouă Artist</p>
          </div>
          
          <div style="padding: 30px;">
            <!-- Artist Details -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #d62828; border-bottom: 3px solid #d62828; padding-bottom: 15px; margin-top: 0;">
                👤 Detalii Artist
              </h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div>
                  <p style="margin: 8px 0;"><strong>Nume Artist:</strong> ${artistName}</p>
                  <p style="margin: 8px 0;"><strong>Titlu Piesă:</strong> ${songTitle}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d62828;">${email}</a></p>
                </div>
                <div>
                  <p style="margin: 8px 0;"><strong>Telefon:</strong> <a href="tel:${phone}" style="color: #d62828;">${phone}</a></p>
                  <p style="margin: 8px 0;"><strong>Pachet Ales:</strong> <span style="background: #d62828; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${packageType.toUpperCase()}</span></p>
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #f8f8f8; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; color: #d62828;">Descriere:</h4>
                <p style="margin: 0; line-height: 1.6; color: #333;">${description.replace(/\n/g, '<br>')}</p>
              </div>
            </div>

            <!-- Upload Status -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #d62828; border-bottom: 3px solid #d62828; padding-bottom: 15px; margin-top: 0;">
                📁 Status Upload Fișiere
              </h2>
              
              <!-- Music Upload -->
              <div style="margin: 20px 0; padding: 15px; border-radius: 8px; ${music?.success ? 'background: #d4edda; border: 1px solid #c3e6cb;' : 'background: #f8d7da; border: 1px solid #f5c6cb;'}">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; margin-right: 10px;">🎵</span>
                  <strong style="color: #333;">Muzică:</strong>
                  <span style="margin-left: 10px; ${music?.success ? 'color: #155724;' : 'color: #721c24;'}">${musicStatus}</span>
                </div>
                ${music?.success ? 
                  `<div style="margin-top: 10px;">
                    <strong>Link fișier:</strong> 
                    <a href="${musicLink}" style="color: #d62828; word-break: break-all;" target="_blank">${musicLink}</a>
                  </div>` : 
                  `<div style="margin-top: 10px; color: #721c24;">
                    <strong>Eroare:</strong> ${music?.error || 'Necunoscut'}
                  </div>`
                }
              </div>

              <!-- Image Upload -->
              <div style="margin: 20px 0; padding: 15px; border-radius: 8px; ${
                !image ? 'background: #e2e3e5; border: 1px solid #d6d8db;' :
                image.success ? 'background: #d4edda; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; border: 1px solid #f5c6cb;'
              }">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; margin-right: 10px;">🖼️</span>
                  <strong style="color: #333;">Imagine:</strong>
                  <span style="margin-left: 10px; ${
                    !image ? 'color: #6c757d;' :
                    image.success ? 'color: #155724;' : 'color: #721c24;'
                  }">${imageStatus}</span>
                </div>
                ${image?.success ? 
                  `<div style="margin-top: 10px;">
                    <strong>Link fișier:</strong> 
                    <a href="${imageLink}" style="color: #d62828; word-break: break-all;" target="_blank">${imageLink}</a>
                  </div>` : 
                  image?.error ? 
                  `<div style="margin-top: 10px; color: #721c24;">
                    <strong>Eroare:</strong> ${image.error}
                  </div>` : ''
                }
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; background: #e8e8e8; border-radius: 8px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                📧 Acest email a fost generat automat din formularul de înregistrare artist
              </p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                🌐 <a href="https://muzicamea.ro" style="color: #d62828;">muzicamea.ro</a>
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
        message: 'Email trimis cu succes!' 
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Eroare la trimiterea email-ului' 
      }, 
      { status: 500 }
    );
  }
}
