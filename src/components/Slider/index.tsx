import { GpaStat } from '../../models/models';
import styles from './styles.module.css';

interface SliderProps {
    style?: React.CSSProperties,
    height: number,
    animatedStyle: SliderAnimations,
    text: string,
    gpaStat: GpaStat,
}
export enum SliderAnimations {
    CUMULATIVE = 'animateSliderCumulative',
    MAJOR = 'animateSliderMajor'
}

export default function Slider(props: SliderProps): JSX.Element {
    const gpaWidth = `${(props.gpaStat.score / props.gpaStat.outof) * 100} + %`;
    let style: React.CSSProperties;
    if (props.animatedStyle === SliderAnimations.CUMULATIVE) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        style = { '--element-cumulative-width': gpaWidth } as React.CSSProperties;
    } else {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        style = { '--element-major-width': gpaWidth } as React.CSSProperties;
    }

    return (
        <div style={style}>
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
                    height: props.height,
                    width: 10
                }}></span>
            </div>

        </div >
    );
}
