import React from 'react';
import { grtown } from './main/grtown';
// @ts-ignore
import * as T from 'three';

export default class GraphicsTown extends React.Component {
  canvas?: HTMLCanvasElement;
  canvasContainer?: HTMLDivElement;
  renderer?: T.WebGLRenderer;

  componentDidMount() {
    if (this.canvas) {
      this.renderer = new T.WebGLRenderer({
        canvas: this.canvas,
      });
      grtown(this.renderer, this.canvasContainer);
    }
  }
  render() {
    return (
      <div
        ref={(ref) => (this.canvasContainer = ref || undefined)}
        style={{ textAlign: 'center' }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
            Graphics Town
          </div>
        </div>
        <hr></hr>
        <div style={{ textAlign: 'left' }}>
          <p>
            This is a project Jason worked on in his CS559 - Computer Graphics
            course at UW-Madison.
            <br />
            It uses the CS559 framework to generate the world and it's starting
            ground.
            <br />
            <p style={{ fontSize: 15 }}>
              <i>
                The train texture is by: alexproxyblender (
                <a
                  href={
                    'https://www.turbosquid.com/3d-models/3d-toy-train-1403155'
                  }
                >
                  Credit
                </a>
                )
              </i>
              <br />
              <i>
                The house, road, and tree trunk textures are from{' '}
                <a href={'https://www.sketchuptextureclub.com/'}>
                  sketchuptextureclub
                </a>
              </i>
              <br />
              <i>
                The sky block texture is from{' '}
                <a href={'https://opengameart.org/content/sky-box-sunny-day'}>
                  opengameart
                </a>
              </i>
              <br />
              <i>The brick shader was written by Jason</i>
              <br />
            </p>
          </p>
          <p>
            <b>The Train</b>
            <br />
            The train is given a list of control points as 3Vectors, for this
            particular track, there are 9 controls points. Two other sets of
            control points are generated from these, so there is inner, middle,
            and outer sets. A spline curve for each set is generated, the middle
            one being the one the train will position on. Every control point is
            given 4 train track posts associated with it. Each track post is
            rotated to match the tangent of the spline curve. Paramaterization
            is used to make the train travel at a constant rate around the
            track.
          </p>
          <p>
            <b>The helicopter</b>
            <br />
            The helicopter picks up random trees and places them in random
            locations.
            <br />
            <br />
            The trees themselves use a random number generator to choose random
            trunk heights and random tree formations.
            <br />
            There are two arrays used to keep track of the tree orientation. The
            first array keeps track of the free positions. The second array
            keeps track of the used positions and the Tree objects located
            there. The helicopter generates a random used tree to travel to.
            Once it arrives, a random free space is generated and the helicopter
            begins it's travel there.
          </p>
          <p>
            <b>The Cars</b>
            <br />
            When the road is built, a list of road control points is built
            depending on the road orientation. These control points are used to
            create a spline curve that the cars travel on.
          </p>
          <p>
            P.S. You can click and drag to orient the camera. You can scroll to
            adjust the zoom.
          </p>
        </div>
        <canvas ref={(ref) => (this.canvas = ref || undefined)}></canvas>
      </div>
    );
  }
}
