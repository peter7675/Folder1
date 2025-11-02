'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@/types/event';
import { calculateDistance, formatDate, isPastEvent, getUserLocation } from '@/lib/utils';

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string);
      requestUserLocation();
    }
  }, [params.id]);

  const fetchEvent = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();

      if (data.success) {
        setEvent(data.data);
      } else {
        setError(data.error || 'Event not found');
      }
    } catch (err) {
      setError('Failed to fetch event details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestUserLocation = async () => {
    try {
      const location = await getUserLocation();
      setUserLocation(location);
    } catch (err) {
      console.error('Unable to get user location:', err);
    }
  };

  const getDistance = (): string | null => {
    if (!userLocation || !event?.latitude || !event?.longitude) {
      return null;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      event.latitude,
      event.longitude
    );

    return `${distance} km`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Event not found'}</p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const distance = getDistance();
  const past = isPastEvent(event.date);
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const percentageFilled = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            ← Back to Events
          </Link>
        </div>
      </header>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Event Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              {past && (
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  Past Event
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Location</p>
                    <p className="text-gray-900">{event.location}</p>
                    {distance && (
                      <p className="text-sm text-blue-600 mt-1">{distance} from you</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Date & Time</p>
                    <p className="text-gray-900">{formatDate(event.date)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">👥</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">Participants</p>
                    <p className="text-gray-900">
                      {event.currentParticipants} / {event.maxParticipants} registered
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentageFilled}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {spotsLeft > 0 ? (
                        <span className="text-green-600 font-medium">
                          {spotsLeft} spots remaining
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">Event is full</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Action Button */}
          {!past && spotsLeft > 0 && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => alert('Registration functionality would be implemented here!')}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Register for Event
              </button>
              <p className="text-sm text-gray-600 mt-3">
                Join {event.currentParticipants} others who have already registered
              </p>
            </div>
          )}

          {past && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-600">This event has already taken place.</p>
            </div>
          )}

          {!past && spotsLeft === 0 && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <p className="text-red-600 font-medium">
                This event is fully booked. Check back later for cancellations.
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Event Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Event ID: {event.id}</li>
            <li>• Created: {new Date(event.createdAt).toLocaleDateString()}</li>
            {event.latitude && event.longitude && (
              <li>• Coordinates: {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
