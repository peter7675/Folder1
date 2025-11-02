import { NextRequest, NextResponse } from 'next/server';
import { eventStore } from '@/lib/eventStore';

// GET /api/events/:id - Get event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = eventStore.getEventById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch event',
      },
      { status: 500 }
    );
  }
}
