
import * as Types from "../../Types";

export interface LanguageData {
    maxData: number,
    data: Types.LanguageStat[]
}

export class GraphDimensions {
    height: number;
    width: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}

interface BarProps {
    width: number,
    /** The percent from 0 - 1 that the bar should fill of the width */
    percentW: number,
    height: number,
    borderWidth: number
}


let infoBoxLoc: {
    x: number,
    y: number
} | null;
let above: string | null = null;
let displayValue: Types.LanguageStat | null = null;

export default class Graph {
    canvas: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    data: LanguageData;
    graphDimensions: GraphDimensions;
    barMaxHeight: number;

    axisOffset = {
        left: 60,
        top: 80,
        bottom: 60,
        right: 0
    }
    graphColors = {
        popupBackground: '#88f8f8',
        graphLightLine: "#dddddd",
        graphDarkLine: "#000000"
    }

    yAxisNumberSplitBy: number = 4;
    constructor(canvas: HTMLCanvasElement, data: LanguageData, graphDimensions: GraphDimensions) {
        this.canvas = canvas;
        this.data = data;
        this.graphDimensions = graphDimensions;
        this.barMaxHeight = (graphDimensions.height - this.axisOffset.bottom) - this.axisOffset.top
        const context = this.canvas.getContext('2d');


        if (context) {
            this.context = context;
        }
    }

    public setGraphDimensions(graphDimensions: GraphDimensions) {
        this.graphDimensions = graphDimensions;
    }
    // public setCanvas

    public drawGraph() {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.save();
        // Draw graph axis label
        this.context.strokeStyle = this.graphColors.graphLightLine;
        this.context.lineWidth = 1
        this.context.font = this.graphDimensions.height / 30 + "px Times New Roman";
        this.context.textAlign = "left";
        this.context.fillText(this.data.data[0].dataLabel, 0, 40);

        // Draw graph title
        this.context.font = this.graphDimensions.height / 20 + "px Times New Roman";
        this.context.textAlign = "center"
        this.context.fillText("Programming Language Usage", this.canvas.width / 2, 80);

        // Move the context position to the bottom left corner where the graph origin will be
        this.context.translate(this.axisOffset.left, this.graphDimensions.height - this.axisOffset.bottom);
        this.barMaxHeight = (this.graphDimensions.height - this.axisOffset.bottom) - this.axisOffset.top
        this.drawXAxis();
        this.drawYAxis();

        // Move back to where we started
        this.context.translate(-this.axisOffset.left, -(this.graphDimensions.height - this.axisOffset.bottom));
        if (infoBoxLoc && displayValue) {
            this.context.translate(infoBoxLoc.x, infoBoxLoc.y);
            this.drawInfoBox(displayValue.time[displayValue.time.length - 1]);
            this.context.translate(
                -infoBoxLoc.x, -infoBoxLoc.y);
        }
        this.context.restore();
    }

    private drawXAxis() {
        if (!this.context) return;
        const context = this.context;
        context.save();
        // Begin
        context.beginPath();
        let width = context.canvas.width;

        // width / The number of items we need to display
        let interval = width / (this.data.data.length + 1);
        context.strokeStyle = this.graphColors.graphLightLine; // The lighter lines are lines and use stroke
        context.fillStyle = this.graphColors.graphDarkLine; // The darker lines are rectangles and use fill
        context.lineWidth = 2

        // Iterate through the items drawing each bar
        for (var i = 0; i < this.data.data.length; i++) {
            // Draw line with tick
            context.moveTo(0, 0);
            context.lineTo(interval, 0);
            context.lineTo(interval, -10);
            context.moveTo(interval, 0);

            // TODO: Make this more extendable
            context.font = (interval / 5) + "px Times New Roman";

            context.textAlign = "center";
            // Draw the title halfway between the interval
            context.fillText(this.data.data[i].name, interval / 2, 50);
            const barProps: BarProps = {
                width: interval,
                percentW: 0.6,
                borderWidth: 2,
                // Get the current distance from the top of the canvas and take out the unusable top
                height: this.barMaxHeight
            }
            this.drawBar(
                this.data.data[i],
                barProps
            );
            context.translate(interval, 0);

        }
        context.closePath();
        context.stroke();
        context.restore();
    }
    drawYAxis() {
        if (!this.context) return;
        const context = this.context;
        const data = this.data;

        context.save();
        context.beginPath();
        // Get current vertical offset and take out the unusable height at the top. Divide this by the max number to display
        let interval = this.barMaxHeight / data.maxData;
        // TODO:
        context.font = interval + "px Times New Roman";

        // Draw the lines that pass through the top of each bar
        context.fillStyle = this.graphColors.graphDarkLine;
        context.lineWidth = 2
        // Draw the colored lines connecting to the top of the bars
        for (var i = 0; i < data.data.length; i++) {
            // Add opacity to the colors
            context.strokeStyle = data.data[i].color + "33";
            // Interval * time
            let calculateRelativeHeight = interval * data.data[i].time[data.data[i].time.length - 1].time;
            context.beginPath();
            context.moveTo(0, -calculateRelativeHeight);
            context.lineTo(context.canvas.width - context.getTransform().e, -calculateRelativeHeight);
            context.closePath();
            context.stroke();
        }
        // Draw the axis itself
        context.strokeStyle = this.graphColors.graphLightLine;
        for (var i = 0; i < data.maxData + 1; i++) {
            // Draw the number and emphasize the line
            if (i % (Math.floor(data.maxData / this.yAxisNumberSplitBy)) == 0) {
                context.fillText("" + i, -(this.axisOffset.left / 3), 0);
                context.strokeStyle = this.graphColors.graphDarkLine;
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, 0);
                context.lineTo(this.axisOffset.left / 3, 0);
                context.closePath();
                context.stroke();
            }
            else {
                //just draw the axis slit
                context.strokeStyle = this.graphColors.graphDarkLine;
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, 0);
                context.lineTo(10, 0);
                context.closePath();
                context.stroke();
            }
            context.beginPath();
            context.strokeStyle = this.graphColors.graphLightLine;
            context.moveTo(0, 0);
            context.lineTo(0, -interval);
            context.closePath();
            context.stroke();

            context.font = interval + "px Times New Roman";
            context.textAlign = "center";
            context.translate(0, -interval);
        }
        context.closePath();
        context.stroke();
        context.restore();
    }

    /**
     * 
     */
    private drawBar(value: Types.LanguageStat, barProps: BarProps) {
        if (!this.context) return;
        const context = this.context;

        context.save();
        const barWidth = barProps.percentW * barProps.width;

        // Take out the width that the bar takes up from the total width and divide this into two equal segments
        const nonFillPortionWidth = (barProps.width - barWidth) / 2;

        context.fillStyle = value.color
        //calculate interval
        let interval = barProps.height / this.data.maxData;
        // Interval
        let calculateRelativeHeight = interval * value.time[value.time.length - 1].time;
        let positionOnCanvas = {
            // Get the current horizontal distance from the left and add on the non fill distance
            x: context.getTransform().e + nonFillPortionWidth,
            width: barWidth,
            // Get the current vertical distance from the top
            y: context.getTransform().f,
            height: calculateRelativeHeight
        }

        // this.canvas.addEventListener("touchmove", (event) => {
        //     moveEvent(event);
        // })
        this.canvas.addEventListener("mousemove", (event) => {
            moveEvent(event);
        })
        function moveEvent(event: MouseEvent) {

            let locationX = (event.offsetX / context.canvas.offsetWidth) * context.canvas.width
            let locationY = (event.offsetY / context.canvas.offsetHeight) * context.canvas.height
            if (locationX > positionOnCanvas.x &&
                locationX < positionOnCanvas.x + positionOnCanvas.width &&
                locationY < positionOnCanvas.y &&
                locationY > positionOnCanvas.y - positionOnCanvas.height) {
                above = value.name;
                infoBoxLoc = {
                    x: positionOnCanvas.x + positionOnCanvas.width,
                    y: positionOnCanvas.y - positionOnCanvas.height
                }
                displayValue = value;
            }
            else {
                if (value.name == above) {
                    above = null;

                    infoBoxLoc = null;
                    displayValue = null;
                }
            }
        }
        // Determine if the bar is being hovered over
        if (above == value.name) {
            context.fillStyle = this.graphColors.graphDarkLine;
            context.fillRect(
                nonFillPortionWidth - barProps.borderWidth,
                0,
                barWidth + (2 * barProps.borderWidth),
                -(calculateRelativeHeight + barProps.borderWidth));
        }
        context.fillStyle = value.color;
        context.fillRect(
            nonFillPortionWidth,
            0,
            barWidth,
            -calculateRelativeHeight);
        context.restore();
    }
    /**
     * 
     */
    private drawInfoBox(timeObject: Types.TimeObject) {
        if (!this.context) return;
        const context = this.context;

        context.save();
        // Get last changed banner
        let date = new Date(timeObject.Created_date);
        let outputString = "Last Changed: " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        context.textAlign = "left"
        context.fillStyle = this.graphColors.popupBackground;

        // Get the size of the text and add padding
        let textWidth = context.measureText(outputString).width + 10;
        let heightOffset = 10;
        if (context.getTransform().e + textWidth > context.canvas.width) {
            context.fillRect(-textWidth, -context.font.split("px")[0] + heightOffset, textWidth, Number(context.font.split("px")[0]));
            context.fillStyle = this.graphColors.graphLightLine
            context.fillText(outputString, -textWidth, 0);
        }
        else {
            context.fillRect(0, -context.font.split("px")[0] + heightOffset, textWidth, Number(context.font.split("px")[0]));
            context.fillStyle = this.graphColors.graphLightLine
            context.fillText(outputString, 0, 0);
        }
        context.restore();
    }
}