// Web-compatible Location module
export const Location = {
  requestForegroundPermissionsAsync: async () => {
    // Mock permission request for web
    return { status: 'granted' };
  },
  
  getCurrentPositionAsync: async () => {
    // Mock location for web - returns a default location
    return {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 100,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };
  },
  
  reverseGeocodeAsync: async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    // Mock reverse geocoding for web
    return [
      {
        city: 'New York',
        region: 'NY',
        country: 'United States',
        name: null,
        street: null,
        district: null,
        subregion: null,
        postalCode: null,
        isoCountryCode: null,
      },
    ];
  },
};
