import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GPASlider, { SliderAnimations } from '../../components/Slider';
import * as Types from '../../Types';
import LanguageGraph from '../../components/LanguageGraph';
import { getGPAstats, getLanguageStats } from "../../routes";
import Banner from '../../components/Banner';
import './styles.css';

interface Value {
    name: string,
    color: string,
    startingMY: string,
    months: number,
    knowledge: number
}
const timeData = [{
    language: 'JavaScript',
    months: 6
}]

export default class About extends Component<{}, {
    gpaStats: Types.GpaStat[],
    canvasWith: number,
    canvas: any

}> {
    constructor(props: any) {
        super(props);

        this.getStats();
        this.state = {
            gpaStats: [],
            canvasWith: 0,
            canvas: null
        }
    }
    componentDidMount() {
    }
    getStats = async () => {
        try {
            let gpaStats = await getGPAstats();

            this.setState({
                gpaStats: gpaStats,
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
                {/* <div>

                    <MoreOptionsLabel />
                </div> */}
                <h1 style={{ textAlign: 'center', fontSize: 20 }}>
                    About Jason
                    </h1>
                <hr></hr>
                <div className={'info-columns cols-2'} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <Banner className={'info'} asset={require('../../assets/wisconsinLogo.jpg')} />
                    <Banner className={'info'} asset={require('../../assets/Node.js_logo.svg')} />

                </div>
                <div>
                    {this.state.gpaStats.length > 0 ?
                        <div>
                            <style>{`:root {
                                    --element-cumulative-width: ${(this.state.gpaStats[0].score / this.state.gpaStats[0].outof) * 100 + '%'};
                                    --element-major-width: ${(this.state.gpaStats[1].score / this.state.gpaStats[1].outof) * 100 + '%'};
                                }`}
                            </style>
                            <GPASlider
                                animatedStyle={SliderAnimations.CUMULATIVE}
                                text={this.state.gpaStats[0].title + ": " + this.state.gpaStats[0].score}
                                height={30}>
                            </GPASlider>
                            <div style={{ height: 10 }}></div>
                            <GPASlider animatedStyle={SliderAnimations.MAJOR}
                                text={this.state.gpaStats[1].title + ": " + this.state.gpaStats[1].score}
                                height={30}>
                            </GPASlider>
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
                        Humorology raised about $234,000 in his first year, 2017-2018, and over $400,000 in his second year, 2018-2019
                    </p>
                    <LanguageGraph />
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
