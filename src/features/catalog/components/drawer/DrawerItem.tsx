import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Fragment, useState } from 'react';

export function DrawerItem(
  name: string,
  imgSrc: string,
  children: JSX.Element
) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment key={name}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img
            className="drawer-img"
            width="23px"
            height="23px"
            src={imgSrc}
            alt="icon"
          />
        </ListItemIcon>
        <ListItemText primary={name.toUpperCase()} />
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
      <Collapse
        style={{ borderBottom: '1px solid #454545' }}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </Fragment>
  );
}
