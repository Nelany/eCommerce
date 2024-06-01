import { useState } from 'react';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import Categories from './Categories';
import './Drawer.scss';

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <>
      <div className="search-bar-menu" onClick={toggleDrawer(true)}>
        <div className="search-line"></div>
        <div className="search-line"></div>
        <div className="search-line"></div>
      </div>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
        >
          <List>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <img
                  className="drawer-img"
                  width="23px"
                  height="23px"
                  src="/searchicon6.png"
                  alt="icon"
                />
              </ListItemIcon>
              <ListItemText primary="CATEGORIES" />
              {open ? (
                <img
                  className="drawer-img"
                  width="10px"
                  height="10px"
                  src="/searcharrow2.png"
                  alt="icon"
                />
              ) : (
                <img
                  className="drawer-img"
                  width="10px"
                  height="10px"
                  src="/searcharrow.png"
                  alt="icon"
                />
              )}
            </ListItemButton>
            ;
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Categories />
              </List>
            </Collapse>
            {['BLABLA', 'FILTERS'].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      className="drawer-img"
                      width="23px"
                      height="23px"
                      src={index === 0 ? '/searchicon6.png' : '/filter.png'}
                      alt="icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
