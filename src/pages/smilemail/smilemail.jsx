import React, { Component } from 'react';
import styles from './styles.css';
export default class Smilemail extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <div style={{ textAlign: 'left' }}>
                
                    <a target={'_blank'} href={'https://smilemail.com'}><img src={require('../../assets/logoIconSmile.png')} style={{ objectFit: 'contain', width: '7vw' }}>

                    </img>
                        <a target={'_blank'} style={{paddingLeft: 20}} href={'https://apps.apple.com/us/app/smilemail-cards/id1480618428'}><img style={{height: 40, width: 120}} src={require('../../assets/app-store-badge.png')}></img></a>
                        <a target={'_blank'} style={{paddingLeft: 20}} href={'https://play.google.com/store/apps/details?id=com.smilemail'}><img style={{height: 40, widht: 132}} src={require('../../assets/google-play-badge.png')}></img></a>
                    
                    </a>
                    

                    <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
                        Smilemail
                    </div>
                </div>
                <hr></hr>
                <div>
                    <p>
                        Smilemail is a React-Native cross plateform application. It's purpose is to provide a way for people to send voice messages inside of gift cards.

                        </p>
                    <ol>
                        <li>
                            Select an Occassion
                                </li>
                        <li>
                            Select a design. This design includes front, middle, and back pictures
                                </li>
                        <li>
                            Record a voice message to send inside of the card. Playback the recording to make sure it is what the user wants.

                                </li>
                        <li>
                            Input a personal image for the inner card along with the text you want to send.
                                </li>
                        <li>
                            Preview the finished card before checking out.
                                </li>
                        <li>
                            Fill out sender and receiver information. Click submit and Smilemail will create the physical card and mail it to the receiver.
                                </li>

                    </ol>

                    <p>
                        This project was a fun and innovative project to work on. I was the mobile developer so I developed the app itself in React Native. Another person was in charge of creating the API.
                        With the collaboration of both of us we successful developed a working ecommerce app.
                        </p>
                    <b>
                        {"Programming language: "}
                    </b>
                    <text>
                        Javascript
                        </text>
                    <div></div>
                    <b>
                        {"Programming environment: "}
                    </b>
                    <text>
                        React-Native
                        </text>
                </div>
                <div style={{ textAlign: 'center'}}>
                    <video style={{ backgroundColor: '#dddddd', height: 'auto', width: '20vw' }} controls>
                        <source src={require('../../assets/SmilemailDemo.mp4')} type="video/mp4" />
                    </video>
                </div>
            </div>

        );
    }
}
