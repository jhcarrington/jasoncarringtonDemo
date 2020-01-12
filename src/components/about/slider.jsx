import React, { Component } from 'react';

// import './styles.css';
import styles from './styles.module.css'

export default class Slider extends React.Component {
    render() {
        return (
            <div style={this.props.style, { backgroundColor: '#dddddd', width: 'auto', height: this.props.height }}>
                <style>{`:root {
              --element-width: ${this.props.percent};
              --element2-width: ${this.props.percent2};
              }`}
                </style>
                <div style={{position: 'absolute', padding:3}}>{this.props.text}</div>
                <span className={this.props.animatedStyle} style={{ backgroundColor: '#66dd66', textAlign: 'center', display: 'flex', verticalAlign: 'center', height: this.props.height }}>
                    
                </span>
                <span style={{backgroundColor: '#ff0000', height: this.props.height, width: 10}}></span>


            </div>
        );
    }
}