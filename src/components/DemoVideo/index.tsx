import React from 'react';
import './styles.css'

export default class DemoVideo extends React.PureComponent<{
    demos: {
        src: string,
        title?: string
    }[]
}, {}>{
    render() {
        var component: JSX.Element[] = [];
        this.props.demos.forEach((demo) => {
            component.push(
                <div className={'test'} style={{width: '20vw'}}>
                    <div>
                        {demo.title || ""}
                    </div>
                    <video style={{ backgroundColor: '#dddddd', alignSelf: 'center', height: 'auto', width: '20vw' }} controls>
                        <source src={demo.src} type="video/mp4" />
                    </video>
                </div>
            )
        })
        return (
            <div className="test-columns cols-2" style={{
                display: 'inline-block',
                width: '100%',
            }}>
                {component}
            </div>
        );
    }
}