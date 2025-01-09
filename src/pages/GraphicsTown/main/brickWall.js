import * as T from 'three';
import { GrObject } from '../libs/CS559-Framework/GrObject.js';
import { shaderMaterial } from '../libs/CS559-Framework/shaderHelper.js';
import brickvs from './shader/brick.vs.txt';
import brickfs from './shader/brick.fs.txt';

export class BrickWall extends GrObject {
  constructor(x, y, z) {
    //
    const group = new T.Group();
    const shaderMat = shaderMaterial(brickvs, brickfs, {
      side: T.DoubleSide,
      uniforms: {},
    });
    const geometry = new T.CubeGeometry(x, y, z);
    const mesh = new T.Mesh(geometry, shaderMat);
    group.add(mesh);
    super('brickWall', group);
  }
}
