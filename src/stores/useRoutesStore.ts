import { create } from 'zustand';
import { routesData } from '@/constants';
import { transformRoutesData } from '@/helpers';
import { RoutesStore } from '@/types';

const transformedRoutes = transformRoutesData(routesData);

export const useRoutesStore = create<RoutesStore>((set) => ({
  routesData: transformedRoutes,
  activeRoute: transformedRoutes[0].sequence_number,
  initialLng: transformedRoutes[0].lng,
  initialLat: transformedRoutes[0].lat,
  setActiveRoute: (sequenceNumber: number) => set({ activeRoute: sequenceNumber }),
  setCompletedRoute: (sequenceNumber: number) =>
    set((state) => ({
      routesData: state.routesData.map((route) =>
        route.sequence_number === sequenceNumber ? { ...route, completed: true } : route,
      ),
    })),
}));
