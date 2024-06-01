import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import useSelectCategories from '../../hooks/useSelectCategories';
import { Fragment, useState } from 'react';
import { useDispatchSelectedCategory } from '../../hooks/useDispatchSelectedCategory';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState('');
  const categories = useSelectCategories();
  const { dispatchSetSelectedCategory } = useDispatchSelectedCategory();
  const navigate = useNavigate();

  const handleClick = (
    id: string,
    categoryName: string,
    subcategoryName?: string
  ) => {
    dispatchSetSelectedCategory(id);
    setSelectedId(id);

    const isOpen = open[id];
    if (!isOpen) {
      setOpen({ ...open, [id]: true });
    } else {
      setOpen({ ...open, [id]: false });
    }
    if (subcategoryName) {
      navigate(`/catalog/category/${categoryName}/${subcategoryName}`);
    } else {
      navigate(`/catalog/category/${categoryName}`);
    }
  };
  return (
    <>
      {categories.map((category) => (
        <Fragment key={category.id}>
          <ListItemButton
            data-id={category.id}
            onClick={() => handleClick(category.id, category.name)}
            selected={selectedId === category.id}
          >
            <ListItemIcon>
              <img width="11px" height="11px" src="/star2.png" alt="icon" />
            </ListItemIcon>
            <ListItemText primary={category.name} />
            {category.children &&
              category.children.length > 0 &&
              (open?.[category.id] ? (
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
              ))}
          </ListItemButton>
          {category.children && category.children.length > 0 && (
            <Collapse in={open[category.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.children.map((child) => (
                  <ListItemButton
                    key={child.id}
                    sx={{ pl: 4 }}
                    onClick={() =>
                      handleClick(child.id, category.name, child.name)
                    }
                    selected={selectedId === child.id}
                  >
                    <ListItemIcon>
                      <img
                        width="10px"
                        height="10px"
                        src="/star.png"
                        alt="icon"
                      />
                    </ListItemIcon>
                    <ListItemText primary={child.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </>
  );
}
