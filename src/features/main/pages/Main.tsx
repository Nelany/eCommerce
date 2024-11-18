import { Box, Button, CardMedia, Paper, Typography } from '@mui/material';
import './Main.scss';
import { useNavigate } from 'react-router-dom';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import useDispatchToast from '../../../common/hooks/useDispatchToast';

function App() {
  const navigate = useNavigate();
  const setToast = useDispatchToast();

  const handleClick = () => {
    navigate('/catalog');
  };

  const copyTextToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setToast({
      message: 'Copied',
      type: 'success',
      isToastOpen: true,
    });
  };

  return (
    <>
      <h1>COOLSTORE</h1>
      <Paper
        elevation={6}
        sx={{ bgcolor: '#f5f5f5' }}
        className="container-title"
      >
        <img className="decor" src="/decor.png" alt="decor" />
        <img
          className="decor decor-bottom-right"
          src="/decor.png"
          alt="decor"
        />
        <img className="decor decor-bottom-left" src="/decor.png" alt="decor" />
        <img className="decor decor-top-left" src="/decor.png" alt="decor" />
        <Box className="main-title">
          <Typography gutterBottom component="div" className="text-wrapper">
            <span className="span-text">Magic is at your fingertips - </span>
            <span className="span-text"> only here you can fulfill</span>
            <span className="span-text">all your desires!</span>
            <span className="span-text">Choose the best genie!</span>
          </Typography>
          <Button
            variant="contained"
            className="catalog-button"
            onClick={handleClick}
          >
            Go to shopping!
          </Button>
        </Box>
        <Box>
          <CardMedia
            className="main-genie"
            sx={{ height: 320, width: 320, overflow: 'hidden' }}
            component="img"
            alt="Photo of the beast Genie"
            height="100%"
            src="/1696526421_gas-kvas-com-p-kartinki-dzhin-9.png"
          />
        </Box>
      </Paper>
      <Paper
        elevation={6}
        sx={{ bgcolor: '#f5f5f5' }}
        className="promo-wrapper"
      >
        <p className="about-promo">
          Promo code only for the best students Rs School. Go to the catalog and
          choose your most cherished wish. Add the genie to the cart and enter
          the promo code!
        </p>
        <Box className="promo-text-wrapper">
          <h1 className="promo-title">promoForBestStudents</h1>
          <FilterNoneIcon
            className="icon-copy-promo"
            onClick={() => copyTextToClipboard('promoForBestStudents')}
          />
        </Box>
      </Paper>
    </>
  );
}

export default App;
