import React, { Component } from 'react';
export default class FeedTheChange extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <div style={{ textAlign: 'left' }}>
                    <a href={'https://feedthechange.herokuapp.com/'}><img src={require('../../assets/ftc512.jpg')} style={{ objectFit: 'contain', width: '7vw' }}>

                    </img> </a>

                    <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
                        Feed The Change
                    </div>
                </div>
                <hr></hr>
                <div>
                    <p>
                        Feed the change is a reverse soup kitchen that goes out to the streets to deliver both perishable and non perishable
                        food items as well as utilities. They also provide information that details all of the resouces people have 
                        at their disposal should they want to act. 
                        </p>
                   

                    <p>
                    The website for feed the change is still in development. The development website is <a href={'https://feedthechange.herokuapp.com/'} >https://feedthechange.herokuapp.com/</a>
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
                        React
                        </text>
                </div>
            </div>

        );
    }
}
