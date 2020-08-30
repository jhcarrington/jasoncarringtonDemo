import React, { Component, HTMLAttributes } from 'react';

// import './styles.css';
import styles from './styles.module.css'

interface SliderProps {
    style?: React.CSSProperties,
    height: number,
    animatedStyle: SliderAnimations,
    text: string
}
export enum SliderAnimations {
    CUMULATIVE = "animateSliderCumulative",
    MAJOR = "animateSliderMajor"
}

/**
 * In order to add a Slider 
 */
export default class Slider extends React.Component<SliderProps, {}> {
    componentDidMount() {
        // Add a new animation into the css file manually
        if(Object.keys(styles).length != Object.keys(SliderAnimations).length) {
            throw {error: "Incorrect Slider configuration"}
        }
    }
    render() {
        console.log(Object.keys(styles).length)
        return (
            <div style={{...this.props.style, backgroundColor: '#dddddd', width: 'auto', height: this.props.height}}>
                <div style={{ position: 'absolute', padding: 3 }}>{this.props.text}</div>
                <span
                    className={styles[this.props.animatedStyle]}
                    style={{
                        backgroundColor: '#66dd66',
                        textAlign: 'center',
                        display: 'flex',
                        verticalAlign: 'center',
                        height: this.props.height
                    }}>

                </span>
                <span style={{
                    backgroundColor: '#ff0000',
                    height: this.props.height, width: 10
                }}></span>
            </div>
        );
    }
}