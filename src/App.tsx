import './App.css';

import { Route, Link, Routes as BrowserRoutes, BrowserRouter } from 'react-router-dom';
import About from './pages/about/about';
import Mosaic from './pages/mosaic';
import Main from './pages/main';
import Uline from './pages/uline';
import Smilemail from './pages/smilemail';
import Datamatch from './pages/datamatch/datamatch';
import Birdwell from './pages/birdwell';
import Tasc from './pages/tasc';
import NotFound from './pages/NotFound';
import PageFooterSquiggle from './components/PageFooterSquiggle';
import JasonPicture from './components/JasonPicture';
import GraphicsTown from './pages/GraphicsTown';
import SideBar from './components/SideBar';
import CaptainService from './pages/captainService';
import { Routes } from './models/models';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <JasonPicture />
      <span style={{ flexDirection: 'row', display: 'flex' }}>
        <div style={{ flex: 10 }}>
          <header className='App-header'>
            <div style={{ flex: 1 }}>
              <SideBar></SideBar>
            </div>
            <div style={{ flex: 10, textAlign: 'center' }}>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <label className='App-Title-Label'>Jason Carrington</label>
              </Link>
            </div>
            <div style={{ flex: 1 }} />
          </header>

          <div className='App'>
            <body className='App-Body'>
              <BrowserRoutes>
                <Route path='/' element={Main()} />
                <Route path={Routes.MOSAIC} element={Mosaic()} />
                <Route path={Routes.ULINE} element={Uline()} />
                <Route path={Routes.SMILEMAIL} element={Smilemail()} />
                <Route path={Routes.DATAMATCH} element={Datamatch()} />
                <Route path={Routes.ABOUT} element={About()} />
                <Route path={Routes.BIRDWELL} element={Birdwell()} />
                <Route path={Routes.TASC_MPX_DEV} element={Tasc()} />
                <Route path={Routes.GRAPHICS} element={<GraphicsTown></GraphicsTown>} />
                <Route path={Routes.CAPTAIN_SERVICE} element={CaptainService()} />
                <Route path='*' element={NotFound()} />
              </BrowserRoutes>

              <footer className='App-footer'>
                <PageFooterSquiggle />
                <a
                  rel="noreferrer"
                  target={'_blank'}
                  href='https://facebook.com/jason.carrington.3511'
                >
                  <img
                    src={require('./assets/facebook.svg')}
                    style={{
                      objectFit: 'contain',
                      width: 20,
                      padding: 10
                    }}
                  />
                  <a
                    rel="noreferrer"
                    target={'_blank'}
                    href='https://www.linkedin.com/in/jason-carrington-a35a44149/'
                  >
                    <img
                      src={require('./assets/LinkedinIcon.svg')}
                      style={{
                        objectFit: 'contain',
                        width: 20,
                        padding: 10
                      }}
                    />
                    <a
                      rel="noreferrer"
                      target={'_blank'}
                      href='https://github.com/jhcarrington'
                    >
                      <img
                        src={require('./assets/GithubIcon.svg')}
                        style={{
                          objectFit: 'contain',
                          width: 20,
                          padding: 10
                        }}
                      />
                    </a>
                  </a>
                </a>

                <text style={{ color: '#888888', fontSize: 15 }}>
                  {`Jason Carrington \u00a9 ${new Date().getFullYear()}`}
                </text>
              </footer>
            </body>
          </div>
        </div>
      </span>
    </BrowserRouter>
  );
}
