import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Document } from 'react-pdf/dist/entry.webpack';
import renderHTML from 'react-render-html'
// var __html = require('./CircularInversion.html');
// var template = { __html: __html };
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import { Document, Page, pdfjs } from 'react-pdf';
//  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// var CircularInversionPdf = require('../../assets/CircularInversion.pdf');
export default class CircularInversion extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {

        const { pageNumber, numPages } = this.state;
        return (
            <div style={{ textAlign: 'center' }}>
                <Document options={{
                    cMapUrl: 'cmaps/',
                    cMapPacked: true,
                }} file="../../assets/jasonPicture.JPG" onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}>

                    {/* <Page pageNumber={pageNumber} /> */}
                </Document>
            </div>

        );
    }
}
