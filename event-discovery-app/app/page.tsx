'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Event } from '@/types/event';
import { calculateDistance, formatDateShort, isPastEvent, getUserLocation } from '@/lib/utils';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const filterEvents = useCallback(() => {
    let filtered = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }

    if (locationFilter) {
      const location = locationFilter.toLowerCase();
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(location)
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, locationFilter]);

  useEffect(() => {
    fetchEvents();
    requestUserLocation();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, locationFilter, filterEvents]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setFilteredEvents(data.data);
      } else {
        setError(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch events');
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
      setLocationError('Unable to get your location');
      console.error(err);
    }
  };

  const getDistance = (event: Event): string | null => {
    if (!userLocation || !event.latitude || !event.longitude) {
      return null;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      event.latitude,
      event.longitude
    );

    return `${distance} km away`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Discovery</h1>
              <p className="text-gray-600 mt-1">Find and join exciting events near you</p>
            </div>
            <Link
              href="/events/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Event
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Events
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter city or state..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {locationError && (
            <p className="text-sm text-amber-600 mt-2">
              {locationError} - Distance calculations unavailable
            </p>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events found matching your criteria.</p>
            <Link
              href="/events/create"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Create the first event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const distance = getDistance(event);
              const past = isPastEvent(event.date);
              const spotsLeft = event.maxParticipants - event.currentParticipants;

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                      {past && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                          Past
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>

                      {distance && (
                        <div className="flex items-center text-gray-700">
                          <span className="font-medium mr-2">📏</span>
                          <span>{distance}</span>
                        </div>
                      )}

                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">📅</span>
                        <span>{formatDateShort(event.date)}</span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <span className="font-medium mr-2">👥</span>
                        <span>
                          {event.currentParticipants} / {event.maxParticipants} participants
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {spotsLeft > 0 ? (
                        <span className="text-green-600 text-sm font-medium">
                          {spotsLeft} spots left
                        </span>
                      ) : (
                        <span className="text-red-600 text-sm font-medium">Event full</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
