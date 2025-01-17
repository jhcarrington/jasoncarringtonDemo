/* jshint esversion: 6 */
// @ts-ignore

/**
 * CS559 3D World Framework Code
 *
 * Simple object behaviors that work by patching the objects
 *
 * @module SimpleBehaviors
 *  */

import * as T from 'three';

// we need to have the BaseClass definition
import { GrObject } from './GrObject.js';
/**
 * Simple spinning behavior as an example of how to create behaviors as functions
 *
 * @param {GrObject} grobj
 * @param {number} [speed]
 */
export function spinY(grobj, speed) {
  const newSpeed = speed || 0.001;
  const oldTick = grobj.tick;
  grobj.tick = function (delta, timeOfDay) {
    this.objects.forEach((obj) => obj.rotateY(newSpeed * delta));
    oldTick.call(this, delta, timeOfDay);
  };
  return grobj;
}
