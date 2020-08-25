import React, { Component, } from 'react';
import { Link } from 'react-router-dom';

export default class Birdwell extends Component<{}, {}> {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <div style={{ textAlign: 'left' }}>
                    <a href={'https://birdwellsolutions.com/'}><img src={require('../../assets/birdwellIcon.png')} style={{ objectFit: 'contain', width: '6vw' }}>

                    </img> </a>

                    <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
                        Birdwell Solutions
                    </div>
                </div>
                <hr></hr>
                <div>
                    <p>
                        Birdwell Solutions LLC provides a way for dev teams to be created based on birdwell's standards.
                        This allows contracts or any other type of technological investment to have a fluid
                        dev process that a client or investor does not have to get in contact with.
                        </p>
                    <p>
                        At birdwell, Jason has a few roles:
                            <li>
                            Provides trained developers to birdwell
                            </li>
                        <li>
                            Leads a team of 10 developers in creating various applications
                            </li>
                        <li>
                            Participates in business decisions
                            </li>
                        <li>
                            Helped raise $60k in sales over 1 year
                            </li>
                    </p>
                    <h3>
                        Birdwell One
                        </h3>
                    <p>
                        This is an express node.js backend. It is setup to be used as a service to multiple other services.
                        In fact, its what's powering the backend of the app <Link to={'/mosaic'}>Mosaic</Link>.
                        Jason and others modify this repository regularly.
                        </p>
                </div>
            </div>

        );
    }
}
