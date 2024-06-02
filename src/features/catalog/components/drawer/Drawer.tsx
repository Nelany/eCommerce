import { useState } from 'react';
import { Box, Button, List, SwipeableDrawer } from '@mui/material';
import Categories from './Categories';
import './Drawer.scss';
import { DrawerItem } from './DrawerItem';
import { PriceInput } from './PriceInput';
import { FilterItem } from './FilterItem';
import { DiscountSwitch } from './DiscountSwitch';
import { CountryRadio } from './CountryRadio';
import { useDispatchFilter } from '../../hooks/useDispatchFilter';

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatchFilter } = useDispatchFilter();
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [country, setCountry] = useState('All');
  const [onDiscount, setOnDiscount] = useState(false);

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

  function onFilterSubmit(isApply: boolean) {
    if (!isApply) {
      setMinPrice(1);
      setMaxPrice(100000000);
      setCountry('All');
      setOnDiscount(false);
    }
    dispatchFilter({
      maxPrice: String(maxPrice),
      minPrice: String(minPrice),
      country,
      discount: onDiscount,
    });
  }

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
                        {PriceInput('Max, $', maxPrice, setMaxPrice)}
                        {PriceInput('Min, $', minPrice, setMinPrice)}
                      </div>
                    )}
                    {FilterItem(
                      'Country',
                      <div className="filter-container">
                        {CountryRadio(country, setCountry)}
                      </div>
                    )}
                    {FilterItem(
                      'Discount',
                      <div className="filter-container">
                        {DiscountSwitch(onDiscount, setOnDiscount)}
                      </div>
                    )}
                    <div className="filter-button-container">
                      <Button
                        className="drawer-button"
                        variant="contained"
                        onClick={() => onFilterSubmit(true)}
                      >
                        Apply
                      </Button>
                      <Button
                        className="drawer-button"
                        variant="contained"
                        onClick={() => onFilterSubmit(false)}
                      >
                        Reset
                      </Button>
                    </div>
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
