import { Route, TransformedRoute } from '@/types';

export const transformRoutesData = (routesData: Route[]): TransformedRoute[] => {
  return routesData.map((route) => ({
    ...route,
    completed: false,
  }));
};
