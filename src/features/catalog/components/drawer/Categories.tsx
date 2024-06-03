import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import useSelectCategories from '../../hooks/useSelectCategories';
import { Fragment, useState } from 'react';
import { useDispatchSelectedCategory } from '../../hooks/useDispatchSelectedCategory';
import { useNavigate, useParams } from 'react-router-dom';

export default function Categories() {
  const { id, subId } = useParams();
  const defaultSelectedId = subId || id || 'allCategories';
  const [selectedId, setSelectedId] = useState(defaultSelectedId);
  const categories = useSelectCategories();
  const { dispatchSetSelectedCategory } = useDispatchSelectedCategory();
  const navigate = useNavigate();

  const handleClick = (
    id: string,
    categoryName: string,
    parentName?: string
  ) => {
    setSelectedId(categoryName);

    if (id === 'allCategories') {
      dispatchSetSelectedCategory('');
      navigate(`/catalog`);
    } else {
      if (parentName) {
        navigate(`/catalog/category/${parentName}/${categoryName}`);
      } else {
        navigate(`/catalog/category/${categoryName}`);
      }
    }
  };
  return (
    <>
      <Fragment key={'allCategories'}>
        <ListItemButton
          data-id={'allCategories'}
          onClick={() => handleClick('allCategories', 'allCategories')}
          selected={selectedId === 'allCategories'}
        >
          <ListItemIcon>
            <img width="11px" height="11px" src="/star2.png" alt="icon" />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItemButton>
      </Fragment>
      {categories.map((category) => (
        <Fragment key={category.name}>
          <ListItemButton
            data-id={category.name}
            onClick={() => handleClick(category.id, category.name)}
            selected={selectedId === category.name}
          >
            <ListItemIcon>
              <img width="11px" height="11px" src="/star2.png" alt="icon" />
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItemButton>
          {category.children && category.children.length > 0 && (
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.children.map((child) => (
                  <ListItemButton
                    key={child.name}
                    sx={{ pl: 4 }}
                    onClick={() =>
                      handleClick(child.id, child.name, category.name)
                    }
                    selected={selectedId === child.name}
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
