import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Link, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import About from './components/about/about.jsx';
import InfoView from './components/main/InfoView.jsx';
import Uline from './components/uline/uline.jsx';
import Smilemail from './components/smilemail/smilemail.jsx';
import Datamatch from './components/datamatch/datamatch.jsx';
import FeedTheChange from './components/feedthechange/FeedTheChange.jsx';
import CircularInversion from './components/circularinversion/CircularInversion.jsx';

export default class App extends React.Component {
    state = {
        top: 10,
        right: 10,
    }
    componentDidMount() {
        //Handles mouse touches
        dragElement(document.getElementById("jasonImage"));
        // console.log(document.getElementById("jasonImage") == null);
        var PADDING = 0;
        var temp = false;
        var rect;
        var viewport = {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
        }
        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                rect = elmnt.getBoundingClientRect();
                viewport.bottom = document.innerHeight - PADDING;
                viewport.left = PADDING;
                viewport.right = window.innerWidth - PADDING - 20;
                viewport.top = PADDING;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                var newLeft = elmnt.offsetLeft - pos1;
                var newTop = elmnt.offsetTop - pos2;

                if (newLeft < viewport.left
                    || newTop < viewport.top
                    || newLeft + rect.width > viewport.right
                    || newTop + rect.height > viewport.bottom
                ) {
                    // the element will hit the boundary, do nothing...
                } else {
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        // Handles finger touches
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var elmnt = document.getElementById("jasonImage");
        elmnt.addEventListener('touchstart', function(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            rect = elmnt.getBoundingClientRect();
            viewport.bottom = document.innerHeight - PADDING;
            viewport.left = PADDING;
            viewport.right = window.innerWidth - PADDING - 20;
            viewport.top = PADDING;
        });
        
        elmnt.addEventListener('touchmove', function (e) {
            e = e || window.event;
            e.preventDefault();
            rect = elmnt.getBoundingClientRect();
            // calculate the new cursor position:
            pos1 = pos3 - e.touches[0].screenX;
            pos2 = pos4 - e.touches[0].screenY;
            pos3 = e.touches[0].screenX;
            pos4 = e.touches[0].screenY;
            var newLeft = elmnt.offsetLeft - pos1;
            var newTop = elmnt.offsetTop - pos2;

            if (newLeft < viewport.left
                || newTop < viewport.top
                || newLeft + rect.width > viewport.right
                || newTop + rect.height > viewport.bottom
            ) {
                // the element will hit the boundary, do nothing...
            } else {
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        });
        window.addEventListener("scroll", function(e) {
            elmnt.style.top = (e.path[1].scrollY + 10) + "px";
        })
        window.addEventListener('touchmove', function(e) {
            elmnt.style.top = (e.path[8].scrollY + 10) + "px";
        })
    }
    render() {
        const NotFound = () => {
            return (
                <div className="App">
                    <body className="App-Body" style={{ textAlign: 'left' }}>

                        <div style={{ textAlign: 'center', fontSize: 20 }}>
                            Page not Found!
                        </div>

                    </body>

                </div>
            );
        }

        return (
            <Router>
                <img id="jasonImage" src={require('./assets/jasonPicture.JPG')} style={{ right: 10, top: 10, borderRadius: 25, height: 50, objectFit: 'cover', width: 50, zIndex: 99 }}></img>

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
                            <Route exact path='/' component={InfoView} />
                            <Route exact path="/uline" component={Uline} />
                            <Route exact path="/smilemail" component={Smilemail} />
                            <Route exact path="/datamatch" component={Datamatch} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/feedthechange" component={FeedTheChange} />
                            <Route exact path="/circularinversion" component={CircularInversion} />
                            <Route path='*' component={NotFound} />

                        </Switch >
                        <footer className="App-footer">
                            <a target={'_blank'} href='https://facebook.com/jason.carrington.3511'><img src={require('./assets/facebook.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }}>
                            </img><a target={'_blank'} href='https://www.linkedin.com/in/jason-carrington-a35a44149/'><img src={require('./assets/LinkedinIcon.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }}>
                            </img><a target={'_blank'} href='https://github.com/jhcarrington'><img src={require('./assets/GithubIcon.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }}>
                            </img></a></a></a>

                            <text style={{ color: '#888888', fontSize: 15 }}>
                                {'\u00a9 Jason Carrington'}
                            </text>
                        </footer>
                    </body>
                </div>

            </Router>
        );
    }
}
