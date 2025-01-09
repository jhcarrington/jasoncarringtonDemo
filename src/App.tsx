/* eslint-disable no-unused-vars */
import { Routes, Route, Outlet, Link, BrowserRouter } from 'react-router-dom';
import HeaderBar from './components/HeaderBar/HeaderBar';
import AppLanding from './pages/AppLanding/AppLanding';
import PageFooterSquiggle from './components/PageFooterSquiggle';
import './index.css';
import facebookSVG from './assets/facebook.svg';
import linkedinSVG from './assets/LinkedinIcon.svg';
import githubSVG from './assets/GithubIcon.svg';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Projects from './pages/Projects/Projects';
import Datamatch from './pages/datamatch/datamatch';
import Uline from './pages/uline';
import Smilemail from './pages/smilemail';
import Mosaic from './pages/mosaic';
import Birdwell from './pages/birdwell';
import Tasc from './pages/tasc';
import GraphicsTown from './pages/GraphicsTown';
import CaptainService from './pages/captainService';
import ProjectsContainer from './pages/Projects/ProjectsContainer';
import JohnsonHealthTech from './pages/johnsonHealthTech';

export enum ProjectRoutes {
  DATAMATCH = 'datamatch',
  ULINE = 'uline',
  SMILEMAIL = 'smilemail',
  MOSAIC = 'mosaic',
  BIRDWELL = 'birdwell',
  TASC_MPX_DEV = 'tasc-mpx-dev',
  GRAPHICS = 'graphics-town',
  CAPTAIN_SERVICE = 'captain-service',
  JHT = 'johnson-health-tech',
}

export default function App() {
  return (
    <BrowserRouter>
      <HeaderBar></HeaderBar>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AppLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<ProjectsContainer />}>
            <Route index element={<Projects />} />
            <Route path={ProjectRoutes.DATAMATCH} element={<Datamatch />} />
            <Route path={ProjectRoutes.ULINE} element={<Uline />} />
            <Route path={ProjectRoutes.SMILEMAIL} element={<Smilemail />} />
            <Route path={ProjectRoutes.MOSAIC} element={<Mosaic />} />
            <Route path={ProjectRoutes.BIRDWELL} element={<Birdwell />} />
            <Route path={ProjectRoutes.TASC_MPX_DEV} element={<Tasc />} />
            <Route path={ProjectRoutes.GRAPHICS} element={<GraphicsTown />} />
            <Route path={ProjectRoutes.JHT} element={<JohnsonHealthTech />} />
            <Route
              path={ProjectRoutes.CAPTAIN_SERVICE}
              element={<CaptainService />}
            />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
      <footer className="App-footer">
        <PageFooterSquiggle />
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <a
            rel="noreferrer"
            target={'_blank'}
            href="https://facebook.com/jason.carrington.3511"
          >
            <img src={facebookSVG} alt="Facebook" />
          </a>

          <a
            rel="noreferrer"
            target={'_blank'}
            href="https://www.linkedin.com/in/jason-carrington-a35a44149/"
          >
            <img src={linkedinSVG} alt="LinkedIn" />
          </a>

          <a
            rel="noreferrer"
            target={'_blank'}
            href="https://github.com/jhcarrington"
          >
            <img src={githubSVG} alt="github" />
          </a>
        </div>

        <text style={{ color: '#888888', fontSize: 15 }}>
          {`\u00a9 ${new Date().getFullYear()} Jason Carrington`}
        </text>
      </footer>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
