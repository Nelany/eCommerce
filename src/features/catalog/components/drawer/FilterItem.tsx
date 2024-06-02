import './FilterItem.scss';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export function FilterItem(name: string, children: JSX.Element) {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <img
            className="drawer-img"
            width="11px"
            height="11px"
            src="/star2.png"
            alt="icon"
          />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}
