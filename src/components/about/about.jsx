import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './slider.jsx';
import styles from './styles.module.css';
export default class About extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <div style={{ textAlign: 'center' }}>

                    <img src={require('../../assets/jasonPicture.JPG')} style={{ objectFit: 'contain', width: '20vw', borderRadius: 5 }}>
                    </img>

                </div>
                <h1 style={{ textAlign: 'center', fontSize: 20 }}>
                    About Jason
                    </h1>
                <hr></hr>
                <div style={{ textAlign: 'center' }}>
                    <img src={require('../../assets/wisconsinLogo.jpg')} style={{ objectFit: 'contain', width: '200px' }}></img>
                </div>
                <div><Slider animatedStyle={styles.animateSlider1} text={"Cumulative GPA: 3.156"} percent={(3.156 / 4) * 100 + '%'} percent2={(3.105 / 4) * 100 + '%'} height={30}></Slider>
                    <div style={{ height: 10 }}></div>
                    <Slider animatedStyle={styles.animateSlider2} text={"Major GPA: 3.105"} percent={(3.156 / 4) * 100 + '%'} percent2={(3.105 / 4) * 100 + '%'} height={30}></Slider>

                    <p>
                        If I were to choose between working individually or with a team I have always preferred working with a team. I started out my outside of school programming when I was a Sophomore. I got involved with Datamatch early January of 2019.
                        I had about a month to learn my first programming language outside of Java as Datamatch has a strict release deadline of February 7th. Together with Frank, I learned how to use xcode and program in swift. This project gave Frank
                        and I motivation to begin working on a video game. We worked on this video game for about a month, it was a simple 2D zombie horde game in which you gained speed by tapping and lost speed when you ran into zombies, if you ran out of speed and
                        a zombie were infront of you then you lost. This was coded in C# using the Unity Engine. We discontinued this project when I became too busy with Birdwell Solutions and Uline, I was working both at once. During the summer of 2019 Robinson Cook, Benjamin Pekala and I developed Mirch.
                        It took us all summer to build a beta version of the app on IOS with swift, this project was then put on hold. We had gotten a new client, Smilemail. Alex, the holder of Smilemail, wanted the app to be developed with React Native as a cross platform app.
                        I then set up to learn React native, I had some React experience which went a long way in preparing for React Native. After a week of research, I began working on the app. It took me about 2 months to bring the app from ground 0 to release on the app stores.
                    </p>
                    <p>
                        I got involved with Humorology my first and second years of college. Humorology is a theatatrical act in which sororities and fraternities form a cast
                        whose purpose is to raise the most money. The fall semester of school is where we learn the first 10 minutes of the show, which includes: dancing, singing, dancing and singing, and acting.
                        Based on how much our cast has raised and how much the judges liked our show, we either advanced to the second semester or were done. We advanced both years which meant we learned another 10 minutes.
                        Throughout the second semester we learn and perfect our show so we can perform it. A winner is picked by a judge depending on how well they performed and how much they raised.
                    </p>
                    <p>
                        My first year humo raised about $234,000. The second year we raised over 400,000 dollars!
                    </p>
                    <h2>
                        Fun Fact
                    </h2>
                    <p style={{ marginLeft: 20 }}>I was born with a syndrome called tethered cord syndrome. This essentially meant I had trouble breathing, tasting, and other brain stem related functions. I had surgery when I was 10 to cut the problematic tissue at the bottom of my spinal cord; I then broke my back a year later. Fortunately, my back healed well!</p>
                    <p>
                        <Link style={{ color: '#008080' }} to="/Resume.pdf" target="_blank" download>Download My Resume</Link>

                    </p>
                    <h1>
                        Contact me at
                    </h1>
                    <p>
                        jhcarrington@wisc.edu<br />
                        224-234-1588<br />


                    </p>
                </div>
            </div>

        );
    }
}
