import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useDispatchSort } from '../../hooks/useDispatchSort';

export function SortSelect() {
  const [sort, setSort] = useState('');
  const { dispatchSort } = useDispatchSort();

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    let sort;
    switch (`${event.target.value}`) {
      case '1':
        sort = 'name.en-GB asc';
        break;
      case '2':
        sort = 'name.en-GB desc';
        break;
      case '3':
        sort = 'price asc';
        break;
      case '4':
        sort = 'price desc';
        break;
      default:
        sort = '';
    }
    dispatchSort(sort);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Name asc</MenuItem>
        <MenuItem value={2}>Name desc</MenuItem>
        <MenuItem value={3}>Price asc</MenuItem>
        <MenuItem value={4}>Price desc</MenuItem>
      </Select>
    </FormControl>
  );
}
