import React, {Component} from 'react';

export default class PageFooterSquiggle extends Component<{}, {}, {
}> {
    canvas?: HTMLCanvasElement;

    componentDidMount() {
        const canvas = this.canvas;
        const context = canvas?.getContext("2d");
        if(canvas && context) {
            context.save();
            context.fillStyle = "#dddddd"
            context.strokeStyle = "#aaaaaa"
            context.lineWidth = 1
            //20 loops within the view
            let intervals = canvas.width / 20;
            for (var i = 0; i < 20; i++) {
                context.arc(0, canvas.height / 2, (intervals / 4), 0, Math.PI, false);
                context.moveTo((intervals / 4), canvas.height / 2);
                context.arc((intervals / 2), canvas.height / 2, (intervals / 4), Math.PI, 0, false);
                context.moveTo(3 * (intervals / 4), canvas.height / 2);
                context.arc((3 * (intervals / 3)), canvas.height / 2, (intervals / 4), Math.PI, Math.PI / 2, true);
                context.translate(intervals, 0);
            }
            context.stroke();
            context.restore();
        }
    }
    render() {
        return(
            <canvas ref={(ref) => (this.canvas = (ref || undefined))} style={{ height: '100px', width: '100%' }}></canvas>
        )
    }
}