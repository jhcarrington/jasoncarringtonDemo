import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Document } from 'react-pdf/dist/entry.webpack';
// var __html = require('./CircularInversion.html');
// var template = { __html: __html };
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import "react-pdf/dist/Page/AnnotationLayer.css";
import ReactPDF, { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// var CircularInversionPdf = require('../../assets/CircularInversion.pdf');
let temp = require("../../assets/hi.pdf");
export default class CircularInversion extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    console.log("HI");
  };
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <ReactPDF
        onLoadError={(error) => {
          console.log(error);
        }}
        onLoadSuccess={() => {
          console.log("Jason");
        }}
        file="../../assets/CircularInversion.pdf"
      >
        <div style={{ textAlign: "center" }}></div>
      </ReactPDF>
    );
  }
}
