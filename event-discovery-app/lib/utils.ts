/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date to short string
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Check if event date is in the past
 */
export function isPastEvent(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Get user's current location
 */
export function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * Validate event input
 */
export function validateEventInput(input: {
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!input.description || input.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!input.location || input.location.trim().length < 3) {
    errors.push('Location must be at least 3 characters long');
  }

  if (!input.date) {
    errors.push('Date is required');
  } else {
    const eventDate = new Date(input.date);
    if (eventDate < new Date()) {
      errors.push('Event date must be in the future');
    }
  }

  if (!input.maxParticipants || input.maxParticipants < 1) {
    errors.push('Maximum participants must be at least 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
