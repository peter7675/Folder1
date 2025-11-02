import { NextRequest, NextResponse } from 'next/server';
import { eventStore } from '@/lib/eventStore';
import { validateEventInput } from '@/lib/utils';
import { CreateEventInput } from '@/types/event';

// GET /api/events - List all events with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location') || undefined;
    const search = searchParams.get('search') || undefined;

    const events = eventStore.filterEvents(location, search);

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateEventInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(', '),
        },
        { status: 400 }
      );
    }

    const eventInput: CreateEventInput = {
      title: body.title,
      description: body.description,
      location: body.location,
      latitude: body.latitude,
      longitude: body.longitude,
      date: body.date,
      maxParticipants: Number(body.maxParticipants),
    };

    const event = eventStore.createEvent(eventInput);

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create event',
      },
      { status: 500 }
    );
  }
}
