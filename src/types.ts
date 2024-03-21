export type Route = {
  sequence_number: number;
  eta: string;
  time_window: string;
  street: string;
  zip: string;
  city: string;
  lat: number;
  lng: number;
};

export type TransformedRoute = Route & {
  completed: boolean;
};

export type RoutesStore = {
  routesData: TransformedRoute[];
  activeRoute: number;
  initialLng: number;
  initialLat: number;
  setActiveRoute: (_sequenceNumber: number) => void;
  setCompletedRoute: (_sequenceNumber: number) => void;
};
