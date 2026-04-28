export type View = 'login' | 'dashboard' | 'clients' | 'totems' | 'playlist' | 'media' | 'reports' | 'settings' | 'player';

export interface Totem {
  id: string;
  name: string;
  serial: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSync: string;
  latency?: string;
  previewUrl?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'video' | 'image';
  format: string;
  size: string;
  duration?: string;
  resolution: string;
  thumbnailUrl: string;
  tags: string[];
}

export interface Payment {
  id: number;
  clientId: number;
  clientName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'cancelled';
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  mediaIds: number[];
  totemIds: number[];
  isActive: boolean;
  createdAt: string;
}