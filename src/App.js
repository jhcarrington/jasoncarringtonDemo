import React from 'react';
import logo from './logo.svg'
import './App.css';

import { Route, Link, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import About from './pages/about/about.jsx';
import Mosaic from "./pages/mosaic";
import Main from './pages/main/index.jsx';
import Uline from './pages/uline/uline.jsx';
import Smilemail from './pages/smilemail/smilemail.jsx';
import Datamatch from './pages/datamatch/datamatch.jsx';
import FeedTheChange from './pages/feedthechange/FeedTheChange.jsx';
import NotFound from "./pages/NotFound/notfound.jsx";

export default class App extends React.Component {

    componentDidMount() {
        //Handles mouse touches
        dragElement(document.getElementById("jasonImage"));

        /**@type HTMLCanvasElement */
        const canvas = this.refs.canvas;
        /** @type CanvasRenderingContext2D */
        const context = canvas.getContext("2d");
        context.save();
        context.fillStyle = "#dddddd"
        context.strokeStyle = "#aaaaaa"
        context.lineWidth = 1
        //20 loops within the view
        let intervals = canvas.width / 20;
        for (var i = 0; i < 20; i++) {
            context.arc(0, canvas.height / 2, (intervals / 4), 0, Math.PI, false);
            context.moveTo((intervals / 4), canvas.height / 2);
            context.arc((intervals / 2), canvas.height / 2, (intervals / 4), Math.PI, 0, false);
            context.moveTo(3 * (intervals / 4), canvas.height / 2);
            context.arc((3 * (intervals / 3)), canvas.height / 2, (intervals / 4), Math.PI, Math.PI / 2, true);
            context.translate(intervals, 0);
        }
        context.stroke();
        context.restore();

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
            var initialPos = {
                x: 0,
                y: 0
            }
            var nextPos = {
                x: 0,
                y: 0
            }
            elmnt.onmousedown = dragMouseDown;

            /**
             * Begin tracking drag
             * 
             * @param {Event} e 
             */
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup
                initialPos = {
                    x: e.clientX,
                    y: e.clientY
                }
                rect = elmnt.getBoundingClientRect();
                viewport.bottom = document.innerHeight - PADDING;
                viewport.left = PADDING;
                viewport.right = window.innerWidth - PADDING - 20;
                viewport.top = PADDING;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves
                document.onmousemove = elementDrag;
            }
            /**
             * Drag the element
             * 
             * @param {Event} e 
             */
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                nextPos = {
                    x: initialPos.x - e.clientX,
                    y: initialPos.y - e.clientY
                }
                initialPos = {
                    x: e.clientX,
                    y: e.clientY
                }
                var newLeft = elmnt.offsetLeft - nextPos.x;
                var newTop = elmnt.offsetTop - nextPos.y;

                if (newLeft < viewport.left
                    || newTop < viewport.top
                    || newLeft + rect.width > viewport.right
                    || newTop + rect.height > viewport.bottom
                ) {
                    //BORDER HIT!
                } else {
                    // set the element's new position
                    elmnt.style.top = (elmnt.offsetTop - nextPos.y) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - nextPos.x) + "px";
                }
            }

            function closeDragElement() {
                // stop moving when mouse button is released
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        // Handles touch screen events
        var initialPos = {
            x: 0,
            y: 0
        }
        var nextPos = {
            x: 0,
            y: 0
        }
        var elmnt = document.getElementById("jasonImage");
        elmnt.addEventListener('touchstart', function (e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            initialPos = {
                x: e.touches[0].screenX,
                y: e.touches[0].screenX
            }
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
            //calculate new position
            nextPos = {
                x: initialPos.x - e.touches[0].screenX,
                y: initialPos.y - e.touches[0].screenY
            }
            initialPos = {
                x: e.touches[0].screenX,
                y: e.touches[0].screenY
            }
            var newLeft = elmnt.offsetLeft - nextPos.x;
            var newTop = elmnt.offsetTop - nextPos.y;

            if (newLeft < viewport.left
                || newTop < viewport.top
                || newLeft + rect.width > viewport.right
                || newTop + rect.height > viewport.bottom
            ) {
                //BORDER HIT!
            } else {
                // set the element's new position
                elmnt.style.top = (elmnt.offsetTop - nextPos.y) + "px";
                elmnt.style.left = (elmnt.offsetLeft - nextPos.x) + "px";
            }
        });
        window.addEventListener("scroll", function (e) {
            elmnt.style.top = (e.path[1]?.scrollY + 10) + "px";
        })
        window.addEventListener('touchmove', function (e) {
            elmnt.style.top = (e.path[8]?.scrollY + 10) + "px";
        })
    }
    render() {

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
                            <Route exact path='/' component={Main} />
                            <Route exact path="/mosaic" component={Mosaic} />
                            <Route exact path="/uline" component={Uline} />
                            <Route exact path="/smilemail" component={Smilemail} />
                            <Route exact path="/datamatch" component={Datamatch} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/feedthechange" component={FeedTheChange} />
                            <Route path='*' component={NotFound} />

                        </Switch >
                        <footer className="App-footer">

                            <canvas ref={"canvas"} style={{ height: '100px', width: '100%' }}></canvas>
                            <a target={'_blank'} href='https://facebook.com/jason.carrington.3511'>
                                <img src={require('./assets/facebook.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }} />
                                <a target={'_blank'} href='https://www.linkedin.com/in/jason-carrington-a35a44149/'>
                                    <img src={require('./assets/LinkedinIcon.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }} />
                                    <a target={'_blank'} href='https://github.com/jhcarrington'>
                                        <img src={require('./assets/GithubIcon.svg')} style={{ objectFit: 'contain', width: 20, padding: 10 }} />
                                    </a></a></a>

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
