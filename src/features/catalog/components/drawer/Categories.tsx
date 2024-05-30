import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function Categories() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img width="23px" height="23px" src="/searchicon6.png" alt="icon" />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open ? (
          <img width="10px" height="10px" src="/searcharrow2.png" alt="icon" />
        ) : (
          <img width="10px" height="10px" src="/searcharrow.png" alt="icon" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img width="23px" height="23px" src="/star.png" alt="icon" />
            </ListItemIcon>
            <ListItemText primary="Cute" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img width="23px" height="23px" src="/star.png" alt="icon" />
            </ListItemIcon>
            <ListItemText primary="Wonderful" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
