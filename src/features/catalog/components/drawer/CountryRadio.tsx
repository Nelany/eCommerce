import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export function CountryRadio(
  country: string,
  setCountry: (country: string) => void
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    setCountry(country);
    console.log(`Selected value: ${country}`);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="All"
        name="radio-buttons-group"
        value={country}
        onChange={handleChange}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel value="China" control={<Radio />} label="China" />
        <FormControlLabel value="Germany" control={<Radio />} label="Germany" />
        <FormControlLabel value="Italy" control={<Radio />} label="Italy" />
        <FormControlLabel value="Mexico" control={<Radio />} label="Mexico" />
        <FormControlLabel value="Spain" control={<Radio />} label="Spain" />
        <FormControlLabel value="Turkey" control={<Radio />} label="Turkey" />
        <FormControlLabel
          value="United Arab Emirates"
          control={<Radio />}
          label="UAE"
        />
        <FormControlLabel
          value="United Kingdom"
          control={<Radio />}
          label="UK"
        />
        <FormControlLabel
          value="United States"
          control={<Radio />}
          label="US"
        />
      </RadioGroup>
    </FormControl>
  );
}
