import React from 'react';
import { Link } from 'react-router-dom';
import { Images, parseContent } from '../../utils';
import Content from './content.json';

export default function Birdwell() {
    return (
        <div style={{ textAlign: 'left' }}>
            <div style={{ textAlign: 'left' }}>
                <a href={Content.head.link}><img src={Images.BIRDWELL} style={{ objectFit: 'contain', width: '6vw' }}>

                </img> </a>

                <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
                    {Content.head.title}
                </div>
            </div>
            <hr></hr>
            <div>
                {parseContent(Content)}
                <h3>
                    Birdwell One Api
                    </h3>
                <p>
                    This is an express node.js backend. It is setup to be used as a service to multiple other services.
                    It connects to a <a href={"https://www.mongodb.com/"}>MongoDB</a> database and is deployed on a 
                    Google Cloud Platform app engine.
                    In fact, its what's powering the backend of the app <Link to={'/mosaic'}>Mosaic</Link>.
                    Jason and others modify this repository regularly.
                    </p>
                    <p>
                        On Birdwell One Api, Jason has worked on
                        <li>
                            Setting up a stripe payment system
                        </li>
                        <li>
                            Modifying Mongo database objects
                        </li>
                        <li>
                            Push notifications
                        </li>
                        Jason also uses logs from Google Cloud Platform to evaluate errors
                    </p>
            </div>
        </div>

    );
}
