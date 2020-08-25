import React, { Component } from 'react';
import { getLanguageStats } from '../../routes/index'
import {  LanguageData, GraphDimensions } from './graph'
import Graph from './graph';
import * as Types from '../../Types';
export default class LanguageGraph extends Component<{}, {
    languageStats: LanguageData
}> {
    canvas?: HTMLCanvasElement;
    graph?: Graph;
    constructor(props: any) {
        super(props);
    }
    async componentDidMount() {
        if (!this.canvas) return;
        const errors = await this.getStats().then((languageData) => {
            this.setState({
                languageStats: languageData
            })
        }).catch((error) => {
            return true;
        });
        if (errors) {
            return;
        }

        const graphDim = new GraphDimensions(this.canvas.height, this.canvas.width);
        this.normalizeCanvas(this.canvas);
        this.graph = new Graph(this.canvas, this.state.languageStats, graphDim);
        this.draw = this.draw.bind(this);
        requestAnimationFrame(this.draw)
    }
    draw() {
        const canvas = this.canvas;
        if (!canvas) return;
        // this.normalizeCanvas(canvas);
        const graphDim = new GraphDimensions(canvas.height, canvas.width);
        this.graph?.setGraphDimensions(graphDim);
        if (this.state.languageStats) {
            this.graph?.drawGraph();
        }
        requestAnimationFrame(this.draw)
    }
    normalizeCanvas(canvas: HTMLCanvasElement) {
        let dpi = window.devicePixelRatio;

        let style = {
            height() {
                return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
            },
            width() {
                return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
            }
        }
        canvas.setAttribute('width', String(style.width() * dpi));
        canvas.setAttribute('height', String(style.height() * dpi));
    }
    getStats = async (): Promise<LanguageData> => {
        try {
            let languageStats = await getLanguageStats();
            let maxStat = 0;
            languageStats.forEach((stat, index) => {
                if (stat.time[stat.time.length - 1].time > maxStat) {
                    maxStat = stat.time[stat.time.length - 1].time;
                }
            })
            const LanguageData: LanguageData = { maxData: maxStat, data: languageStats }
            return LanguageData
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: 'center',
                height: 'auto'
            }}>
                <div style={{
                    border: '3px solid grey',
                    height: '40vw',
                    width: '80%',
                    textAlign: 'center'
                }} ref={"canvasWrapper"}>
                    <canvas ref={(ref) => (this.canvas = (ref || undefined))} style={{
                        height: '100%',
                        width: '100%',
                    }} />


                </div>

            </div>
        );
    }
}