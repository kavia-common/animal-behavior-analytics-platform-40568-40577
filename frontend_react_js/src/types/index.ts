export type Animal = {
  id: string;
  name: string;
  tag: string;
  lastSeen: string;
  species?: string;
  age?: number;
  enclosure?: string;
  status?: string;
  updatedAt?: string;
};
export type Behavior = {
  id: string;
  type: string;
  start: string;
  end: string;
  startMin: number;
  endMin: number;
  durationMin: number;
  confidence: number;
  camera: string;
  thumbnail?: string;
  videoUrl?: string;
};
