import React from 'react';
import './App.css';

import { Route, Link, Switch,  BrowserRouter as Router } from 'react-router-dom';

import About from './pages/about';
import Mosaic from "./pages/mosaic";
import Main from './pages/main';
import Uline from './pages/uline';
import Smilemail from './pages/smilemail';
import Datamatch from './pages/datamatch';
import Birdwell from './pages/birdwell';
import Tasc from './pages/tasc';
import NotFound from "./pages/NotFound";
import PageFooterSquiggle from './components/PageFooterSquiggle';
import JasonPicture from './components/JasonPicture';
import GraphicsTown from './pages/GraphicsTown';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <JasonPicture />

                <header className="App-header">
                    <div style={{ flexDirection: 'row' }}>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <label className="App-Title-Label">Jason Carrington

                            </label>
                        </Link>
                    </div>
                </header>

                <div className="App">
                    <body className="App-Body">
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route exact path="/mosaic" component={Mosaic} />
                            <Route exact path="/uline" component={Uline} />
                            <Route exact path="/smilemail" component={Smilemail} />
                            <Route exact path="/datamatch" component={Datamatch} />
                            <Route exact path="/about" component={About} />
                            <Route exact path='/birdwell' component={Birdwell} />
                            <Route exact path='/tasc' component={Tasc} />
                            <Route exact path='/graphicstown' component={GraphicsTown} />
                            <Route path='*' component={NotFound} />

                        </Switch >
                        <footer className="App-footer">

                            <PageFooterSquiggle />
                            <a target={'_blank'} href='https://facebook.com/jason.carrington.3511'>
                                <img src={require('./assets/facebook.svg')} style={{
                                    objectFit: 'contain',
                                    width: 20,
                                    padding: 10,
                                }} />
                                <a target={'_blank'} href='https://www.linkedin.com/in/jason-carrington-a35a44149/'>
                                    <img src={require('./assets/LinkedinIcon.svg')} style={{
                                        objectFit: 'contain',
                                        width: 20,
                                        padding: 10,
                                    }} />
                                    <a target={'_blank'} href='https://github.com/jhcarrington'>
                                        <img src={require('./assets/GithubIcon.svg')} style={{
                                            objectFit: 'contain',
                                            width: 20,
                                            padding: 10,
                                        }} />
                                    </a></a></a>

                            <text style={{ color: '#888888', fontSize: 15 }}>
                                {`Jason Carrington \u00a9 ${(new Date()).getFullYear()}`}
                            </text>
                        </footer>
                    </body>
                </div>

            </Router>
        );
    }
}
