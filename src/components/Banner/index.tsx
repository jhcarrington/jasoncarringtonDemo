import React from 'react';

export default class Banner extends React.Component<{
    asset: any,
    className: string,
}, {}> {
    render(): JSX.Element {
        return (
            <div className={this.props.className} style={{
                borderRadius: 5,
                borderColor: '#dddddd',
                backgroundColor: '#ffffff',
                borderStyle: 'solid',
                boxShadow: '0px 0px 5px 5px #dddddd',
                borderWidth: 0,
                padding: 5,
                width: '20vw',
                height: '10vw',
                margin: 6
            }}>
                <img src={this.props.asset} style={{ objectFit: 'contain', width: '100%', height: '100%' }}></img>
            </div>
        );
    }
}
