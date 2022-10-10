import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BirdwellMediaUrls, getMediaUrl } from './birdwell.service';

export default function Birdwell(): ReactElement {
    return (
        <div style={{ textAlign: 'left' }}>
            <div style={{ textAlign: 'left' }}>
                <a href={'https://birdwellsolutions.com/'}>
                    <img
                        src={getMediaUrl(BirdwellMediaUrls.BirdwellLogo)}
                        style={{ objectFit: 'contain', width: '3rem' }}
                    >
                    </img> </a>

                <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
                    Birdwell Solutions
                </div>
            </div>
            <hr></hr>
            <div>
                <p>
                    Birdwell Solutions LLC provides a way for development teams to be created based on Birdwell's standards.
                    This allows contracts or any other type of technological investment to have a fluid
                    development process that a client or investor does not have to get in involved with.
                </p>
                <p>
                    At birdwell, Jason has a few roles:
                    <li>
                        Provides trained developers to birdwell
                    </li>
                    <li>
                        Leads a team of 10 developers in creating various applications
                        <ol>
                            <li>
                                Manages tasks using Jira and an agile mindset
                            </li>
                            <li>
                                Reviews code using both bitbucket and standard github
                            </li>
                            <li>
                                Works on both frontend and backend with the roll of setting up the baseline system
                            </li>
                        </ol>
                    </li>
                    <li>
                        Participates in business decisions
                    </li>
                    <li>
                        Helped raise $60k in sales over 1 year
                    </li>
                </p>
                <h3>
                    Birdwell One Api
                </h3>
                <p>
                    This is an express node.js backend. It is setup to be used as a service to multiple other services.
                    It connects to a <a href={'https://www.mongodb.com/'}>MongoDB</a> database and is deployed on a
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
        </div >

    );
}
