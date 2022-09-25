import React, { useEffect } from 'react';

// import './styles.css';
import styles from './styles.module.css'

interface SliderProps {
    style?: React.CSSProperties;
    height: number;
    animatedStyle: SliderAnimations;
    text: string;
}
export enum SliderAnimations {
    CUMULATIVE = "animateSliderCumulative",
    MAJOR = "animateSliderMajor"
}

export default function Slider(props: SliderProps) {
    useEffect(() => {
        if (Object.keys(styles).length !== Object.keys(SliderAnimations).length) {
            throw { error: "Incorrect Slider configuration" }
        }
    });

    return (
        <div style={{ ...props.style, backgroundColor: '#dddddd', width: 'auto', height: props.height }}>
            <div style={{ position: 'absolute', padding: 3 }}>{props.text}</div>
            <span
                className={styles[props.animatedStyle]}
                style={{
                    backgroundColor: '#66dd66',
                    textAlign: 'center',
                    display: 'flex',
                    verticalAlign: 'center',
                    height: props.height
                }}>

            </span>
            <span style={{
                backgroundColor: '#ff0000',
                height: props.height, width: 10
            }}></span>
        </div>
    );

}