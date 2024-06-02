import { useState } from 'react';
import { Box, List, SwipeableDrawer } from '@mui/material';
import Categories from './Categories';
import './Drawer.scss';
import { DrawerItem } from './DrawerItem';
import { PriceInput } from './PriceInput';
import { FilterItem } from './FilterItem';
import { DiscountSwitch } from './DiscountSwitch';
import { CountryRadio } from './CountryRadio';

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            {[
              {
                name: 'CATEGORIES',
                imgSrc: '/searchicon6.png',
                children: <Categories />,
              },
              {
                name: 'FILTERS',
                imgSrc: '/filter.png',
                children: (
                  <>
                    {FilterItem(
                      'Price',
                      <div className="filter-container">
                        {PriceInput('Max, $', 100000000)}
                        {PriceInput('Min, $', 0)}
                      </div>
                    )}
                    {FilterItem(
                      'Country',
                      <div className="filter-container">{CountryRadio()}</div>
                    )}
                    {FilterItem(
                      'Discount',
                      <div className="filter-container">{DiscountSwitch()}</div>
                    )}
                  </>
                ),
              },
            ].map((item) => DrawerItem(item.name, item.imgSrc, item.children))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
