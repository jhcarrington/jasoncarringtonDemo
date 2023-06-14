import React from 'react';
import './styles.css';

export default class DemoVideo extends React.PureComponent<{
    demos: Array<{
        src: string,
        title?: string,
    }>,
}, {}> {
    render(): JSX.Element {
        const component: JSX.Element[] = [];
        this.props.demos.forEach((demo) => {
            component.push(
                <div className='demo-video-container'>
                    <div>
                        {demo.title ?? ''}
                    </div>
                    <video
                        className='demo-video'
                        controls>
                        <source src={demo.src} type='video/mp4' />
                    </video>
                </div>
            );
        });

        return (
            <div
                className='demo-video-columns'
                style={{
                    display: 'inline-block',
                    width: '100%'
                }}>
                {component}
            </div>
        );
    }
}
