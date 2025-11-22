import Client from '@searchkit/instantsearch-client';
import Searchkit from 'searchkit';

// TypeScript interfaces for the tracking data
export interface TrackingPoint {
  objectID: string;
  _index: string;
  _score: number;
  location: {
    lat: number;
    lon: number;
  };
  _geoloc: {
    lat: number;
    lng: number;
  };
  __position: number;
  // Optional fields that might be present in the data
  truckId?: string;
  truck?: any; // Truck object if available
  timestamp?: string;
  speed?: number;
  heading?: number;
  // Allow any additional fields from the search results
  [key: string]: any;
}

export interface DeduplicatedTrack {
  objectID: string;
  location: {
    lat: number;
    lon: number;
  };
  _geoloc: {
    lat: number;
    lng: number;
  };
  count: number; // Number of duplicate points
  averageScore: number;
  positions: number[]; // Array of all positions that were merged
  // Preserve truck information and other data from the original point
  truckId?: string;
  truck?: any;
  timestamp?: string;
  speed?: number;
  heading?: number;
  originalPoints: TrackingPoint[]; // Keep all original points for reference
  // Allow any additional fields
  [key: string]: any;
}

const sk = new Searchkit({
  connection: {
    host: `https://elastic:ph58b4d26fb4a@es.caak.mn`,
  },
  search_settings: {
    search_attributes: ['truckId', 'truck', 'timestamp'],
    result_attributes: ['*'], // Get all fields from the documents
    geo_attribute: 'location',
  },
});

const searchClient = Client(sk);

// Utility function to remove duplicate tracking points based on location similarity
export const deduplicateTrackingPoints = (
  points: TrackingPoint[], 
  distanceThreshold: number = 0.001 // ~100 meters
): DeduplicatedTrack[] => {
  const deduplicated: DeduplicatedTrack[] = [];
  const processed = new Set<string>();

  points.forEach(point => {
    if (processed.has(point.objectID)) return;

    // Find all points within the distance threshold
    const similarPoints = points.filter(p => {
      if (processed.has(p.objectID)) return false;
      
      const distance = calculateDistance(
        point.location.lat, point.location.lon,
        p.location.lat, p.location.lon
      );
      
      return distance <= distanceThreshold;
    });

    // Mark all similar points as processed
    similarPoints.forEach(p => processed.add(p.objectID));

    // Create deduplicated entry
    const avgLat = similarPoints.reduce((sum, p) => sum + p.location.lat, 0) / similarPoints.length;
    const avgLon = similarPoints.reduce((sum, p) => sum + p.location.lon, 0) / similarPoints.length;
    const avgScore = similarPoints.reduce((sum, p) => sum + p._score, 0) / similarPoints.length;

    // Preserve data from the first point (representative)
    const representativePoint = similarPoints[0];
    const { location: _, _geoloc: __, _score: ___, objectID: ____, ...otherData } = representativePoint;

    deduplicated.push({
      objectID: point.objectID, // Use the first point's ID as representative
      location: {
        lat: avgLat,
        lon: avgLon
      },
      _geoloc: {
        lat: avgLat,
        lng: avgLon
      },
      count: similarPoints.length,
      averageScore: avgScore,
      positions: similarPoints.map(p => p.__position),
      originalPoints: similarPoints, // Keep all original points
      // Preserve all other data from the representative point
      ...otherData
    });
  });

  return deduplicated;
};

// Calculate distance between two coordinates in degrees
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

// Function to search by location with radius
export const searchByLocation = async (
  lat: number, 
  lng: number, 
  radiusKm: number = 1,
  deduplicate: boolean = true
) => {
  try {
    // Use the search client to perform geo search
    const searchRequest = {
      indexName: 'supp_tracks',
      params: {
        query: '',
        aroundLatLng: `${lat},${lng}`,
        aroundRadius: radiusKm * 1000, // Convert km to meters
        hitsPerPage: 1000
      }
    };

    const results = await searchClient.search([searchRequest]);
    const hits = results.results[0]?.hits as TrackingPoint[] || [];
    
    if (deduplicate) {
      return deduplicateTrackingPoints(hits);
    }
    
    return hits;
  } catch (error) {
    console.error('Error searching by location:', error);
    return [];
  }
};

// Function to group tracking points by truck ID
export const groupByTruckId = (points: TrackingPoint[]): Record<string, TrackingPoint[]> => {
  return points.reduce((groups, point) => {
    const truckId = point.truckId || 'unknown';
    if (!groups[truckId]) {
      groups[truckId] = [];
    }
    groups[truckId].push(point);
    return groups;
  }, {} as Record<string, TrackingPoint[]>);
};

// Function to get latest tracking point per truck
export const getLatestTrackPerTruck = (points: TrackingPoint[]): TrackingPoint[] => {
  const grouped = groupByTruckId(points);
  
  return Object.values(grouped).map(truckPoints => {
    // Sort by timestamp if available, otherwise by position
    return truckPoints.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return (b.__position || 0) - (a.__position || 0);
    })[0];
  });
};

export default searchClient;
