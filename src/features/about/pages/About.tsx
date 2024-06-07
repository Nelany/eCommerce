import './About.scss';
import {
  Avatar,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <div className="logo-container">
        <div>
          <Paper elevation={12} className="logo-wrapper">
            <img className="logo" alt="logo" src="/CoolСoders.png"></img>
          </Paper>
        </div>
        <Paper className="title-logo-wrapper" elevation={12}>
          <h2 className="title-h2">Hello world!</h2>
          <p className="title-logo">
            We are glad to see you in our magic COOLSTORE. We are a team of
            dedicated frontend developers, who have come together to create this
            app. The basic principles of our work:
          </p>
          <List sx={{ width: '100%' }}>
            <ListItem sx={{ fontSize: 14, pb: 0, pt: 0 }}>
              <ListItemIcon>
                <StarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Synchronized work in achieving a common goal. For effective application development, we share our knowledge and ideas" />
            </ListItem>
            <ListItem sx={{ fontSize: 14, pb: 0, pt: 0 }}>
              <ListItemIcon>
                <StarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Effective communication for successful development. Each member of our team is ready to discuss and quickly solve problems" />
            </ListItem>
            <ListItem sx={{ fontSize: 14, pb: 0, pt: 0 }}>
              <ListItemIcon>
                <StarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Modern Web Development" />
            </ListItem>
          </List>
        </Paper>
      </div>
      <div className="card-wrapper">
        <Card elevation={12} sx={{ p: 2 }} className="card">
          <Avatar
            className="avatar"
            alt="photo"
            src="/photo1717623586.jpeg"
            sx={{ width: 200, height: 200 }}
          />
          <h2 className="title-h2">Svetlana Nesterova</h2>
          <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
              <Chip
                label="Team lead"
                color="primary"
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>
          <CardContent>
            <Typography paragraph sx={{ mb: 0 }}>
              With around two years of experience as a designer and
              approximately three years working as a doctor in various
              hospitals, I possess a unique combination of creative and
              analytical skills. I am passionate about learning new, complex,
              and fascinating things, constantly seeking to understand the
              diverse aspects of our world. For me, exploring the field of
              programming is an exciting journey into a new realm where I can
              apply my knowledge and develop new skills.
            </Typography>
          </CardContent>
          <Link className="link-github" to={'https://github.com/Nelany'}>
            <img
              className="logo-github"
              alt="logo"
              src="/github-icon-2.svg"
            ></img>
            <div className="github-title">Github</div>
          </Link>
        </Card>
        <Card elevation={12} sx={{ p: 2 }} className="card">
          <Avatar
            className="avatar"
            alt="photo"
            src="/img1.jpg"
            sx={{ width: 200, height: 200 }}
          />
          <h2 className="title-h2">Volha Paciahievich</h2>
          <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
              <Chip
                label="Developer"
                color="primary"
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>
          <CardContent>
            <Typography paragraph sx={{ mb: 0 }}>
              I've had an interest in algorithms, logic challenges, and working
              with numbers since I was in school. Working as a doctor in a rural
              outpatient clinic taught me collaboration, time management,
              multitasking, and the ability to quickly learn new things.
              Programming attracts for me because it allows me to see the
              results of my work, discipline, and clear deadlines, as well as
              the constant opportunity to learn.
            </Typography>
          </CardContent>
          <Link className="link-github" to={'https://github.com/patciahevich'}>
            <img
              className="logo-github"
              alt="logo"
              src="/github-icon-2.svg"
            ></img>
            <div className="github-title">Github</div>
          </Link>
        </Card>
        <Card elevation={12} sx={{ p: 2 }} className="card">
          <Avatar
            className="avatar"
            alt="photo"
            src="/img.jpg"
            sx={{ width: 200, height: 200 }}
          />
          <h2 className="title-h2">Oksana Bondareva</h2>
          <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
              <Chip
                label="Developer"
                color="primary"
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>
          <CardContent>
            <Typography paragraph sx={{ mb: 0 }}>
              Working in technical support about two years has given me the
              ability to look for solutions to technical problems of varying
              complexity. The experience of working in a team helped to learn
              how to listen to colleagues, quickly adapt to changes, take
              responsibility for work tasks, offer solutions to problems and
              tasks and correct mistakes. Learning programming for me is an
              opportunity to gain new skills, upgrade my skills and get an
              interesting profession in demand.
            </Typography>
          </CardContent>
          <Link
            className="link-github"
            to={'https://github.com/Oksana-bondareva'}
          >
            <img
              className="logo-github"
              alt="logo"
              src="/github-icon-2.svg"
            ></img>
            <div className="github-title">Github</div>
          </Link>
        </Card>
      </div>
      <Paper className="logo-rss-wrapper" elevation={12}>
        <h2 className="title-h2">Сreated with the participation of</h2>
        <Link to={'https://rs.school/courses/'} className="rss-link">
          <img alt="rss logo" src="/rss-logo.svg" className="rss-logo"></img>
          <h2 className="title-h2">RS School</h2>
        </Link>
      </Paper>
    </div>
  );
};

export default About;
