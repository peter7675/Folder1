import { Event, CreateEventInput } from '@/types/event';

class EventStore {
  private events: Map<string, Event> = new Map();
  private idCounter = 1;

  constructor() {
    // Initialize with some sample events
    this.seedData();
  }

  private seedData() {
    const sampleEvents: CreateEventInput[] = [
      {
        title: 'Tech Meetup: AI & Machine Learning',
        description: 'Join us for an evening of discussions about the latest trends in AI and ML. Network with fellow developers and learn from industry experts.',
        location: 'San Francisco, CA',
        latitude: 37.7749,
        longitude: -122.4194,
        date: '2025-11-15T18:00:00',
        maxParticipants: 50,
      },
      {
        title: 'Startup Pitch Night',
        description: 'Watch innovative startups pitch their ideas to investors. Great networking opportunity for entrepreneurs and investors alike.',
        location: 'New York, NY',
        latitude: 40.7128,
        longitude: -74.0060,
        date: '2025-11-20T19:00:00',
        maxParticipants: 100,
      },
      {
        title: 'Web Development Workshop',
        description: 'Hands-on workshop covering React, Next.js, and modern web development practices. Bring your laptop!',
        location: 'Austin, TX',
        latitude: 30.2672,
        longitude: -97.7431,
        date: '2025-11-10T14:00:00',
        maxParticipants: 30,
      },
      {
        title: 'Design Thinking Seminar',
        description: 'Learn the principles of design thinking and how to apply them to solve complex problems in your organization.',
        location: 'Seattle, WA',
        latitude: 47.6062,
        longitude: -122.3321,
        date: '2025-11-25T10:00:00',
        maxParticipants: 40,
      },
      {
        title: 'Blockchain & Crypto Conference',
        description: 'Explore the future of blockchain technology and cryptocurrency. Featuring keynote speakers from leading blockchain companies.',
        location: 'Miami, FL',
        latitude: 25.7617,
        longitude: -80.1918,
        date: '2025-12-01T09:00:00',
        maxParticipants: 200,
      },
    ];

    sampleEvents.forEach(event => this.createEvent(event));
  }

  createEvent(input: CreateEventInput): Event {
    const id = String(this.idCounter++);
    const event: Event = {
      id,
      ...input,
      currentParticipants: Math.floor(Math.random() * (input.maxParticipants / 2)), // Random initial participants
      createdAt: new Date().toISOString(),
    };
    this.events.set(id, event);
    return event;
  }

  getAllEvents(): Event[] {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  getEventById(id: string): Event | undefined {
    return this.events.get(id);
  }

  filterEvents(location?: string, search?: string): Event[] {
    let events = this.getAllEvents();

    if (location) {
      events = events.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    return events;
  }

  deleteEvent(id: string): boolean {
    return this.events.delete(id);
  }
}

// Singleton instance
export const eventStore = new EventStore();
