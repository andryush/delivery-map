import { useRef, useEffect } from 'react';
import maplibre from 'maplibre-gl';
import { useRoutesStore } from '@/stores';
import markerCompleted from '@/assets/marker-completed.png';
import markerNotCompleted from '@/assets/marker-not-completed.png';

import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.css';

export const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibre.Map | null>(null);

  const routes = useRoutesStore((state) => state.routesData);
  const initialLng = useRoutesStore((state) => state.initialLng);
  const initialLat = useRoutesStore((state) => state.initialLat);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibre.Map({
      container: mapContainerRef.current!,
      style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
      center: [initialLng, initialLat],
      zoom: 15,
      attributionControl: false,
    });

    mapRef.current.on('load', () => {
      routes.forEach((route) => {
        const el = document.createElement('div');
        const markerToDisplay = route.completed ? markerCompleted : markerNotCompleted;

        el.style.backgroundImage = `url(${markerToDisplay})`;
        el.style.backgroundSize = 'cover';
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = 'center';

        const markerLabel = document.createElement('div');

        markerLabel.textContent = route.sequence_number.toString();
        markerLabel.className = route.completed ? 'marker-label-completed' : 'marker-label-not-completed';

        el.appendChild(markerLabel);

        new maplibre.Marker({ element: el }).setLngLat([route.lng, route.lat]).addTo(mapRef.current!);
      });

      const routeLine: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routes.map((route) => [route.lng, route.lat]),
        },
      };

      if (mapRef.current) {
        mapRef.current.addSource('route-line', {
          type: 'geojson',
          data: routeLine,
        });

        mapRef.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route-line',
          layout: {},
          paint: {
            'line-color': '#1329FE',
            'line-width': 4,
          },
        });
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  const mapStyle = {
    width: '100%',
    height: '100vh',
  };

  return <div ref={mapContainerRef} style={mapStyle} />;
};
