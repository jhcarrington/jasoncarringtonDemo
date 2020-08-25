import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export enum screens {
    DATAMATCH = '/datamatch',
    ULINE = '/uline',
    SMILEMAIL = '/smilemail',
    MOSAIC = '/mosaic',
    BIRDWELL = '/birdwell',
    ABOUT = '/about'

}
export default class CardItem extends Component<{
    title: string,
    body: JSX.Element,
    screen: screens
}, {}> {
    render() {
        return(
            <Link style={{textDecorationLine: 'none'}} to={this.props.screen}>
            <div className='card' >
                <div className="card-header">{this.props.title}
                <div className="card-header-actions">
                        <a className="card-header-action">

                        </a>
                    </div>
                </div>
                <div className="card-body" style={{ color: '#000000' }}>{this.props.body}
                </div>

            </div>

        </Link>
        );
    }
}