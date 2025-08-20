import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  nume: string;
  imagine: string;
  titluPiesa: string;
  descriere: string;
  email: string;
  telefon: string;
  linkConnectare?: string;
  linkMuzica?: string;
  linkPiesa?: string;
  packageType: 'basic' | 'plus' | 'premium';
  dataInregistrare: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ArtistSchema: Schema = new Schema({
  nume: {
    type: String,
    required: true,
    trim: true
  },
  imagine: {
    type: String,
    required: true,
    default: '/logo.png'
  },
  titluPiesa: {
    type: String,
    required: true,
    trim: true
  },
  descriere: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefon: {
    type: String,
    default: ''
  },
  linkConnectare: {
    type: String,
    default: ''
  },
  linkMuzica: {
    type: String,
    default: ''
  },
  linkPiesa: {
    type: String,
    default: ''
  },
  packageType: {
    type: String,
    enum: ['basic', 'plus', 'premium'],
    required: true
  },
  dataInregistrare: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index pentru search rapid după email
ArtistSchema.index({ email: 1 });

// Index pentru search după nume
ArtistSchema.index({ nume: 1 });

// Prevent model re-compilation in development
const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
