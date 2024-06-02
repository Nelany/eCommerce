import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

export function PriceInput(name: string, defaultValue: number) {
  const [value, setValue] = useState(defaultValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100000000) {
      setValue(100000000);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        {name}
      </Typography>

      <Input
        style={{ width: '100px' }}
        value={value}
        size="medium"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 100000,
          min: 0,
          max: 100000000,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  );
}
