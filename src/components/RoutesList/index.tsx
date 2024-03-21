import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useRoutesStore } from '@/stores';
import { formatZip, isRouteSelected } from '@/helpers';
import { Fragment } from 'react/jsx-runtime';
import { NavigationIcon } from '@/components/NavigationIcon';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const RoutesList = () => {
  const routesData = useRoutesStore((state) => state.routesData);
  const activeRoute = useRoutesStore((state) => state.activeRoute);

  const setCompleted = useRoutesStore((state) => state.setCompletedRoute);
  const setActiveRoute = useRoutesStore((state) => state.setActiveRoute);

  const activeRoutePrimaryTextStyle = {
    color: '#202124',
    fontWeight: 500,
  };

  const handleComplete = (sequenceNumber: number): void => {
    setCompleted(sequenceNumber);
    const updatedRoutesData = useRoutesStore.getState().routesData;
    const nextActiveRoute = updatedRoutesData.find((route) => route.completed === false)?.sequence_number;
    setActiveRoute(nextActiveRoute || -1);
  };

  const handleNavigate = (lat: number, lng: number): void => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <List sx={{ p: 0, pb: '4rem' }}>
      {routesData.map((route) => (
        <Fragment key={route.sequence_number}>
          <ListItem sx={{ display: 'flex', flexDirection: 'column' }} disablePadding>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', p: 0, position: 'relative' }}>
              {isRouteSelected(activeRoute, route.sequence_number) && (
                <Box
                  sx={{
                    width: '3px',
                    height: '20px',
                    borderRadius: '0 10px 10px 0',
                    backgroundColor: '#1329FE',
                    position: 'absolute',
                    top: '10px',
                  }}
                />
              )}
              <ListItemButton
                disabled={route.completed}
                selected={isRouteSelected(activeRoute, route.sequence_number)}
                onClick={() => setActiveRoute(route.sequence_number)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '24px',
                          height: '20px',
                          borderRadius: '4px',
                          background: isRouteSelected(activeRoute, route.sequence_number) ? '#E7EAFF' : '#EAEBF0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '12px',
                            color: isRouteSelected(activeRoute, route.sequence_number) ? '#1329FE' : '#202124',
                          }}
                        >
                          {route.sequence_number}
                        </Typography>
                      </Box>
                      <Typography
                        sx={
                          isRouteSelected(activeRoute, route.sequence_number)
                            ? activeRoutePrimaryTextStyle
                            : { color: '#4D4D50' }
                        }
                      >
                        {route.street}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ color: isRouteSelected(activeRoute, route.sequence_number) ? '#202124' : '#9D9EA2' }}
                    >{`${formatZip(route.zip)} ${route.city}`}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      {route.completed && (
                        <DoneAllIcon
                          sx={{
                            color: '#C5E7D1',
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      )}
                      <Typography
                        sx={
                          isRouteSelected(activeRoute, route.sequence_number)
                            ? activeRoutePrimaryTextStyle
                            : { color: '#4D4D50' }
                        }
                      >
                        {route.eta}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ color: isRouteSelected(activeRoute, route.sequence_number) ? '#202124' : '#9D9EA2' }}
                    >
                      {route.time_window}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </Box>
            {isRouteSelected(activeRoute, route.sequence_number) && (
              <Box sx={{ width: '100%', minHeight: '52px', background: '#E6F4FB' }}>
                <Divider variant="middle" color="#EAEBF0" />
                <Box sx={{ display: 'flex', gap: '8px', padding: '8px 16px' }}>
                  <IconButton sx={{ p: 0 }} onClick={() => handleNavigate(route.lat, route.lng)}>
                    <NavigationIcon />
                  </IconButton>
                  <Button
                    sx={{
                      background: '#FFFFFF',
                      border: '1px solid #EAEBF0',
                      borderRadius: '1000px',
                      color: '#4D4D50',
                      textTransform: 'none',
                    }}
                    variant="outlined"
                    onClick={() => handleComplete(route.sequence_number)}
                  >
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <DoneAllIcon sx={{ color: '#4ABC7A ' }} />
                      <Typography>Complete</Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            )}
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
