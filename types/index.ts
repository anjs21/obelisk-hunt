export interface Obelisk {
  id: string;
  name: string;
  italianName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  origin: string;
  heightM: number;
  era: string;
  pharaoh?: string;
  arrivedRome?: string;
  funFact: string;
}

export interface Visit {
  id: string;
  obelisk_id: string;
  visitor_name: string | null;
  photo_url: string | null;
  note: string | null;
  visited_at: string;
}

export type VisitCounts = Record<string, number>;
