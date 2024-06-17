import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

export function PriceInput(
  name: string,
  price: number,
  setPrice: (price: number) => void
) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (price < 0) {
      setPrice(0);
    } else if (price > 100000000) {
      setPrice(100000000);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        {name}
      </Typography>

      <Input
        style={{ width: '100px' }}
        value={price === 0 ? '' : price}
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
