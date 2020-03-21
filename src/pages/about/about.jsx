import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/slider.jsx';
import { drawGraph } from "../../components/graph.jsx";
import { getGPAstats, getLanguageStats } from "../../routes/index";

const timeData = [{
    language: 'JavaScript',
    months: 6
}]
/**
 * 
 * @typedef {{name: string, color: React.color, startingMY: string/string, months: number, knowledge: number}} Value
 */
export default class About extends Component {
    constructor(props) {
        super(props);
        this.getStats();
        this.state = {
            /**@typedef {{outof:Number, title:String, score:Number}} gpaStat */
            /**@type {[gpaStat]} */
            gpaStats: [],
            /**@typedef {{name:String, color:String, time:Number, dataLabel:String, knowledge:Number}} languageStat */
            /**@type {{maxData:Number, data: [languageStat]}} */
            languageStats: null,
            canvasWith: 0
        }
    }

    componentDidUpdate() {
        const canvas = this.refs.canvas;
        /**@type HTMLCanvasElement */
        let ctx = canvas.getContext('2d');
        let dpi = window.devicePixelRatio;
        function fix_dpi() {
            //create a style object that returns width and height
            let style = {
                height() {
                    return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
                },
                width() {
                    return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
                }
            }
            //set the correct attributes for a crystal clear image!
            canvas.setAttribute('width', style.width() * dpi);
            canvas.setAttribute('height', style.height() * dpi);
        }
        let canvasHeight = 900
        fix_dpi();
        if (this.state.languageStats) {
            drawGraph(canvas, this.state.languageStats, { height: canvas.height, width: canvas.width });
        }
    }
    getStats = async () => {
        try {
            let gpaStats = await getGPAstats();
            let languageStats = await getLanguageStats();
            let maxStat = 0;
            languageStats.forEach((stat) => {
                if (stat.time > maxStat) {
                    maxStat = stat.time;
                }
            })
            this.setState({
                gpaStats: gpaStats,
                languageStats: { maxData: maxStat, data: languageStats }
            })
        } catch (error) {
            console.log(error);
        }
    }
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
                    <img src={require('../../assets/Node.js_logo.svg')} style={{ objectFit: 'contain', width: 200, padding: 10 }} />

                </div>
                <div>
                    {this.state.gpaStats.length > 0 ?
                        <div>
                            <Slider
                                animatedStyle={1}
                                text={this.state.gpaStats[0].title + ": " + this.state.gpaStats[0].score}
                                percent={(this.state.gpaStats[0].score / this.state.gpaStats[0].outof) * 100 + '%'}
                                percent2={(this.state.gpaStats[1].score / this.state.gpaStats[1].outof) * 100 + '%'}
                                height={30}>
                            </Slider>
                            <div style={{ height: 10 }}></div>
                            <Slider animatedStyle={2}
                                text={this.state.gpaStats[1].title + ": " + this.state.gpaStats[1].score}
                                percent={(this.state.gpaStats[0].score / this.state.gpaStats[0].outof) * 100 + '%'}
                                percent2={(this.state.gpaStats[1].score / this.state.gpaStats[1].outof) * 100 + '%'}
                                height={30}>
                            </Slider>
                        </div> : null}
                    <p>
                        Jason is a Full-Stack Developer focused on front-end development. He is fluent in Javascript programming utilizing Node.js's
                        framework. This website you are looking at was built by Jason using React on node.js. This website has a
                        proof of concept back-end which is sending the website gpa and programming language statistics dynamically.
                        This data is being stored in the most popular data management system MongoDB. The Mongo atlas is connected
                        to a node.js backend running express. The backend is hosted on Google Cloud platform using an app engine.<br />
                        <i>Easter egg, try dragging Jason's picture in the top right corner (touchscreen available)</i>
                    </p>
                    <p>
                        Jason was born with dyslexia and writing dysgraphia. Although he developed techniques that worked for him,
                        he always preferred using a keyboard. Because integrated development environment(IDE)s
                        typically have auto complete, his disabilities have never affected his abilities to perform.
                    </p>
                    <p>
                        He got involved with Humorology during his first and second years in college.
                        Humorology is a theatatrical act in which greek life forms casts whose purpose is to raise money.
                        The fall semester of school is where each cast learns the first 10 minutes of their shows, which includes: dancing, singing, dancing and singing, and acting.
                        Based on how much each cast raises and the overall impression of the shows on the judges, the judges pick casts
                        to continue to second semester.
                        Humorology was a new experience for Jason as the only performing experience he had was an occassional Jazz concert, where he
                        would perform improvisational exerpts on the saxophone.
                        The casts he was involved with advanced both years which means both casts worked on perfecting their show for a final performance.
                    </p>
                    <p>
                        Homorology raised about $234,000 in his first year, 2017-2018, and over $400,000 in his second year, 2018-2019
                    </p>
                    <div style={{
                        display: "flex",
                        justifyContent: 'center',
                        height: 'auto'
                    }}>
                        <div style={{
                            border: '3px solid grey',
                            height: '40vw',
                            width: '80%',
                            textAlign: 'center'
                        }} ref={"canvasWrapper"}>
                            <canvas ref="canvas" style={{
                                height: '100%',
                                width: '100%',
                            }} />


                        </div>

                    </div>
                    <p style={{ textAlign: 'center' }}>
                        <text style={{ fontSize: 15 }}>

                            <i>*Graph built by Jason using canvas, dynamically*</i><br />
                            <text style={{ fontSize: 13 }}>
                                Data fed from MongoDB with no labels or data stored within the code</text>
                        </text>
                    </p>

                    <h2>
                        Fun Fact
                    </h2>
                    <p style={{ marginLeft: 20 }}>
                        Jason was born with a syndrome called tethered cord syndrome.
                        This essentially meant he had difficulty breathing, tasting, and performing other functions involving the brain stem.
                        Luckily, he had surgery when he was 10 years old to cut the problematic tissue at the bottom of his spinal cord;
                        He then proceeded to break his back a year later. Fortunately, his back healed well with no complications!</p>

                    <h1>
                        Contact me at
                    </h1>
                    <p>
                        jhcarrington@wisc.edu<br />
                        224-234-1588<br />
                    </p>
                    <p>
                        <Link style={{ color: '#008080' }} to="/Resume.pdf" target="_blank" download>Download My Resume</Link>
                    </p>
                </div>
            </div >

        );
    }
}