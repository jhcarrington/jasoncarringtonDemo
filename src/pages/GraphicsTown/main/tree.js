/* jshint esversion: 6 */
// @ts-ignore

import * as T from 'three';
import { GrObject } from '../libs/CS559-Framework/GrObject.js';

import barkImage from '../../../assets/Pictures/bark.jpg';
const bark = new T.TextureLoader().load(barkImage);
const leafColor = '#526b2d';

export class Tree extends GrObject {
  constructor(height) {
    //
    const tree = new T.Group();
    const treeTrunk = buildTreeSection(height, 0.5);
    const leaves = buildLeaves(height / 2);
    leaves.translateY(height);
    treeTrunk.translateY(height / 2 - 1);
    tree.add(treeTrunk);
    tree.add(leaves);
    super('tree', tree);
  }
}
/**
 * Creates an imaginary sphere and takes random points from it to create circles
 *
 * @param {Number} height
 * @returns {T.Group}
 */
function buildLeaves(height) {
  const group = new T.Group();
  const randomPoints = getRandomPointsOnSphere(15, height / 2);
  const leafMaterial = new T.MeshStandardMaterial({ color: leafColor });
  const sphereGeometry = new T.SphereGeometry(0.5);
  for (let i = 0; i < 15; i++) {
    const mesh = new T.Mesh(sphereGeometry, leafMaterial);
    mesh.position.set(randomPoints[i].x, randomPoints[i].y, randomPoints[i].z);
    group.add(mesh);
  }

  const mesh = new T.Mesh(sphereGeometry, leafMaterial);
  group.add(mesh);
  return group;
}
/**
 * Complex
 *
 * @param {Number} numPoints
 * @returns {T.Vector3[]}
 */
function getRandomPointsOnSphere(numPoints, radius) {
  const vectors = [];
  for (let i = 0; i < numPoints; i++) {
    // randomize which 2 coordinates will be selected and used in x^2 + y^2 + z^2
    // by first getting a random number between 0 and 3
    const dummyCoor = Math.floor(Math.random() * 3); // number between 0 and 2
    const newPoint1 = Math.random() * (2 * radius) - radius;
    const newPoint2 = Math.random() * (2 * radius) - radius;
    const newPoint3 = Math.sqrt(
      Math.pow(radius, 2) - Math.pow(newPoint1, 2) - Math.pow(newPoint2, 2),
    );
    const newX = dummyCoor == 0 ? newPoint3 : newPoint1;
    const newY = dummyCoor == 1 ? newPoint3 : newPoint2;
    const newZ =
      dummyCoor == 2 ? newPoint3 : dummyCoor == 0 ? newPoint1 : newPoint2;
    // check for duplicates
    var duplicates = false;
    vectors.forEach((vector) => {
      if (vector.x == newX && vector.y == newY && vector.z == newZ) {
        duplicates = true;
      }
    });
    if (duplicates) {
      i--;
      continue;
    }
    vectors.push(new T.Vector3(newX, newY, newZ));
  }

  return vectors;
}
/**
 *
 * @param {Number} height //must be >= 1
 * @param {Number} width
 * @returns {T.Group}
 */
function buildTreeSection(height, width) {
  const group = new T.Group();
  const barkMaterial = new T.MeshStandardMaterial({ map: bark });
  for (let i = 0; i < height; i++) {
    const barkCylinder = new T.CylinderBufferGeometry(width / 2, width / 2, 1);
    const barkSection = new T.Mesh(barkCylinder, barkMaterial);
    barkSection.translateY(i);
    group.add(barkSection);
  }
  return group;
}
