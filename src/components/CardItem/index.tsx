import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/models';

export default class CardItem extends Component<
  {
    title: string,
    body: JSX.Element,
    screen: Routes,
  },
  {}
> {
  render(): JSX.Element {
    return (
      <Link style={{ textDecorationLine: 'none' }} to={this.props.screen}>
        <div className='card'>
          <div className='card-header'>
            {this.props.title}
          </div>
          <div className='card-body' style={{ color: '#000000' }}>
            {this.props.body}
          </div>
        </div>
      </Link>
    );
  }
}
