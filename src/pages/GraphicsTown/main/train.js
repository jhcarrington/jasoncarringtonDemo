/* jshint esversion: 6 */
// @ts-ignroe

import * as T from 'three'
import { GrObject } from '../libs/CS559-Framework/GrObject.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import trainTexture from '../../../assets/Pictures/TREN.obj.txt';

export class Train extends GrObject {
  constructor (color, curve) {
    //
    const group1 = new T.Group()
    const loader = new OBJLoader()
    loader.load(trainTexture, function (train) {
      const group = new T.Group()
      train.children.forEach((/** @type T.Mesh */ obj) => {
        group.add(new T.Mesh(obj.geometry, new T.MeshStandardMaterial({ color })))
      });
      group.scale.set(0.2, 0.2, 0.2);
      group.translateY(3.2);
      group.translateZ(-5);
      group.name = 'trainItself';
      group1.add(group);

    })
    super('train', group1);
    const rideOn = new T.Object3D()
    rideOn.translateY(1);
    rideOn.name = 'rideOn'
    if (this.objects[0]) {
      this.objects[0].add(rideOn)
      this.rideable = rideOn
    }
    this.curve = curve;
  }

  tick () {
    if (this.objects[0].getObjectByName('trainItself')) {
      const time = performance.now() / 10000
      const point = this.curve.getPoint(time % 1)

      const rotation = calculateRotation({
        x: this.objects[0].getObjectByName('trainItself').position.x - point.x,
        y: this.objects[0].getObjectByName('trainItself').position.z - point.y
      });
      this.objects[0].getObjectByName('trainItself').position.set(
        point.x,
        this.objects[0].getObjectByName('trainItself').position.y,
        point.y);
      this.objects[0].getObjectByName('trainItself').rotation.set(0, -rotation - (Math.PI / 2), 0);
      this.objects[0].getObjectByName('rideOn').position.set(point.x, 3.1 + 1, point.y);
      this.objects[0].getObjectByName('rideOn').rotation.set(0, -rotation - (Math.PI / 2), 0);
    }
  }
}
/**
 * @param {{x: number, y: number}} positionChange
 */
function calculateRotation (positionChange) {
  let rotation = 0;
  if (positionChange.x == 0 && positionChange.y == 0) {
    return 0
  }

  // quadrient 1
  if (positionChange.x > 0 && positionChange.y <= 0) {
    rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
    rotation = -rotation;
  }
  // quadrient 2
  else if (positionChange.x <= 0 && positionChange.y < 0) {
    rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
    rotation = -(Math.PI / 2) - rotation

  }
  // quadrient 3
  else if (positionChange.x < 0 && positionChange.y >= 0) {
    rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
    rotation = -Math.PI - rotation;
  }
  // quadrient 4
  else if (positionChange.x >= 0 && positionChange.y > 0) {
    rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
    rotation = -(3 * Math.PI / 2) - rotation;
  }
  return rotation;
}
