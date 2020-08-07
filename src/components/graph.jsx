
import * as Types from "../Types";
let above = null;
var infoBoxLoc = null;
/**@type {Types.LanguageStat} */
var displayValue = null;
/**
 * @param {HTMLCanvasElement} canvas
 * @param {{maxData: number, data: [Types.LanguageStat]}} data
 * @param {{width: number, height: number}} graphDim
 */
export function drawGraph(canvas, data, graphDim) {
    /** @type CanvasRenderingContext2D */
    const context = canvas.getContext("2d");
    context.save();
    context.strokeStyle = "#dddddd";
    context.lineWidth = 1
    context.font = graphDim.height / 30 + "px Times New Roman";
    context.textAlign = "left";
    context.fillText(data.data[0].dataLabel, 0, 40);
    context.font = graphDim.height / 20 + "px Times New Roman";
    context.textAlign = "center"
    context.fillText("Programming Language Usage", canvas.width / 2, 80);
    context.translate(60, graphDim.height - 60);
    drawXAxis(context, data, 80);
    drawYAxis(context, data, 80);

    context.translate(-60, -(graphDim.height - 60));
    if (infoBoxLoc) {
        context.translate(infoBoxLoc.x, infoBoxLoc.y);
        drawInfoBox(context, displayValue.time[displayValue.time.length - 1]);
        context.translate(
            -infoBoxLoc.x, -infoBoxLoc.y);
    }
    context.restore();
}


/**
 * @param {{maxData: number, data: [Types.LanguageStat]}} data
 * @param {Number} topOffset
 */
export function drawXAxis(context, data, topOffset) {
    context.save();
    context.beginPath();
    let width = context.canvas.width;
    let interval = width / (data.data.length + 1);
    context.strokeStyle = "#dddddd";
    context.fillStyle = "#000000";
    context.lineWidth = 2
    for (var i = 0; i < data.data.length; i++) {
        context.moveTo(0, 0);
        context.lineTo(interval, 0);
        context.lineTo(interval, - 10);
        context.moveTo(interval, 0);
        context.font = (interval / 5) + "px Times New Roman";
        context.textAlign = "center";
        context.fillText(data.data[i].name, interval * 0.5, 50);
        drawBar(
            context,
            data.data[i],
            { barWidth: interval, percentW: 0.6, width: context.canvas.width, height: context.getTransform().f - topOffset },
            data.maxData
        );
        context.translate(interval, 0);

    }
    context.closePath();
    context.stroke();
    context.restore();
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {{maxData: number, data: [Types.LanguageStat]}} data
 * @param {Number} topOffset
 */
export function drawYAxis(context, data, topOffset) {
    let splits = 4;
    context.save();
    context.beginPath();
    let interval = (context.getTransform().f - topOffset) / data.maxData;
    context.font = interval + "px Times New Roman";

    //draw the lines lining up to the top of the graphs
    context.fillStyle = "#000000";
    context.lineWidth = 2
    //draw the colored lines connecting to the top of the bars
    for (var i = 0; i < data.data.length; i++) {
        context.strokeStyle = data.data[i].color + "33";
        let calculateRelativeHeight = interval * data.data[i].time[data.data[i].time.length - 1].time;
        context.beginPath();
        context.moveTo(0, -calculateRelativeHeight);
        context.lineTo(context.canvas.width - context.getTransform().e, -calculateRelativeHeight);
        context.closePath();
        context.stroke();
    }
    //draw the axis itself
    context.strokeStyle = "#dddddd";
    for (var i = 0; i < data.maxData + 1; i++) {
        //draw the number and emphazise the line
        if (i % (Math.floor(data.maxData / splits)) == 0) {
            context.fillText("" + i, -20, 0);
            context.strokeStyle = "#000000";
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, 0);
            context.lineTo(20, 0);
            context.closePath();
            context.stroke();
        }
        else {
            //just draw the axis slit
            context.strokeStyle = "#dddddd";
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, 0);
            context.lineTo(10, 0);
            context.closePath();
            context.stroke();
        }
        context.beginPath();
        context.strokeStyle = "#dddddd";
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
 * @param {CanvasRenderingContext2D} context
 * @param {Types.LanguageStat} value
 * @param {{barWidth: number, percentW: number, width: height}} barProps
 * @param {number} maxValue
 */
function drawBar(context, value, barProps, maxValue) {
    context.save();
    // context.rotate(Math.PI);
    context.fillStyle = value.color
    //calculate interval
    let interval = barProps.height / maxValue;
    let calculateRelativeHeight = interval * value.time[value.time.length - 1].time;
    let positionOnCanvas = {
        x: context.getTransform().e + barProps.barWidth * ((1 - barProps.percentW) / 2),
        width: barProps.barWidth * barProps.percentW,
        y: context.getTransform().f,
        height: calculateRelativeHeight
    }
    let showBorder = true;
    context.canvas.addEventListener("touchmove", (event) => {
        moveEvent(event);
    })
    context.canvas.addEventListener("mousemove", (event) => {
        moveEvent(event);
    })
    function moveEvent(event) {
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
    let borderWidth = 2;
    if (above == value.name) {

        context.fillStyle = "#000000";
        context.fillRect(
            barProps.barWidth * ((1 - barProps.percentW) / 2) - borderWidth,
            0,
            (barProps.barWidth * barProps.percentW) + (2 * borderWidth),
            //divide max value by the number of graph points. Math.floor(i * (maxValue / 10))
            -(calculateRelativeHeight + borderWidth));
    }
    context.fillStyle = value.color;
    context.fillRect(
        barProps.barWidth * ((1 - barProps.percentW) / 2),
        0,
        barProps.barWidth * barProps.percentW,
        //divide max value by the number of graph points. Math.floor(i * (maxValue / 10))
        -calculateRelativeHeight);


    context.restore();
}
/**
 * @param {CanvasRenderingContext2D} context
 * @param {Types.TimeObject} data
 */
function drawInfoBox(context, data) {
    context.save();
    let date = new Date(data.Created_date)
    let outputString = "Last Changed: " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    let timeOutputString = "Months: " + data.time;
    // context.
    context.textAlign = "left"
    context.fillStyle = "#88f8f8"
    let textWidth = context.measureText(outputString).width + 10;
    let heightOffset = 10;
    if (context.getTransform().e + textWidth > context.canvas.width) {

        context.fillRect(-textWidth, -context.font.split("px")[0] + heightOffset, textWidth, context.font.split("px")[0]);
        context.fillStyle = "#000000"
        context.fillText(outputString, -textWidth, 0);

        // context.fillStyle = "#88f8f8"
        // context.fillRect(-textWidth, -context.font.split("px")[0] + heightOffset - context.font.split("px")[0], textWidth, context.font.split("px")[0]);
        // context.fillStyle = "#000000"
        // context.fillText(timeOutputString, -textWidth, -context.font.split("px")[0] + 10);
    }
    else {
        context.fillRect(0, -context.font.split("px")[0] + heightOffset, textWidth, context.font.split("px")[0]);
        context.fillStyle = "#000000"
        context.fillText(outputString, 0, 0);
        
        // context.fillStyle = "#88f8f8"
        // context.fillRect(0, -context.font.split("px")[0] + heightOffset - context.font.split("px")[0], textWidth, context.font.split("px")[0]);
        // context.fillStyle = "#000000"
        // context.fillText(timeOutputString, 0, -context.font.split("px")[0] + 10);

    }
    context.restore();
}