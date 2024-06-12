import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useDispatchSort } from '../../hooks/useDispatchSort';
import { useSelectSort } from '../../hooks/useSelectSort';
import { useSearchParams } from 'react-router-dom';
const sortVariants = [
  '',
  'name.en-GB asc',
  'name.en-GB desc',
  'price asc',
  'price desc',
];

export function SortSelect() {
  const { dispatchSort } = useDispatchSort();
  const lastSort = useSelectSort();
  const [sort, setSort] = useState('');
  const setPage = useSearchParams()[1];

  useEffect(() => {
    const index = sortVariants.findIndex((variant) => variant === lastSort);
    setSort(index === 0 ? '' : String(index));
  }, [lastSort]);

  const handleChange = (event: SelectChangeEvent) => {
    setPage({});
    setSort(event.target.value);
    dispatchSort(sortVariants[+event.target.value]);
  };

  return (
    <FormControl
      data-testid="sort-select"
      sx={{ m: 1, minWidth: 120 }}
      size="small"
    >
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
