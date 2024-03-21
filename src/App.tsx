import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import { useState } from 'react';
import { RoutesList, MapComponent } from '@/components';

function App() {
  const [value, setValue] = useState('route');

  const selectedNavigationStyles = {
    '&.Mui-selected': {
      color: '#1329FE',
    },
    '& .MuiBottomNavigationAction-label.Mui-selected': {
      color: '#1329FE',
    },
  };

  return (
    <>
      {value === 'route' ? <RoutesList /> : <MapComponent />}
      <Paper elevation={3} style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            sx={selectedNavigationStyles}
            label="Route"
            value="route"
            icon={<LocalShippingIcon />}
          />
          <BottomNavigationAction sx={selectedNavigationStyles} label="Map" value="map" icon={<MapIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default App;
