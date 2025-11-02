export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: string;
}

export interface CreateEventInput {
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string;
  maxParticipants: number;
}

export interface EventFilters {
  location?: string;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
