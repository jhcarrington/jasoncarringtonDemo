/* jshint esversion: 6 */
// @ts-ignore

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from 'three';
import { GrWorld } from '../libs/CS559-Framework/GrWorld.js';
import { WorldUI } from '../libs/CS559-Framework/WorldUI.js';
import { HouseDesign1, HouseDesign2, HouseDesign3 } from './buildings.js';
import { helicopter } from './helicopter.js';
import { Train } from './train.js';
import { Car } from './car.js';
import { Tree } from './tree.js';
import { BrickWall } from './brickWall.js';
import { GrAdvancedSwing, GrCarousel } from './parkObjects.js';
import { GrObject } from '../libs/CS559-Framework/GrObject.js';
import { GrDumpTruck } from './constructionobjects.js';
import * as InputHelpers from '../libs/CS559-Libs/inputHelpers';
import mainRoadTexture from '../../../assets/Pictures/road/road texture pack-seamless (2).jpg';
import roadSideTexture from '../../../assets/Pictures/road/road texture pack-seamless (4).jpg';
import roadTurnTexture from '../../../assets/Pictures/road/road texture pack-seamless (8).jpg';
import roadSplitTexture from '../../../assets/Pictures/road/road texture pack-seamless (7).jpg';
const mainRoad = new T.TextureLoader().load(mainRoadTexture);
const roadSide = new T.TextureLoader().load(roadSideTexture);
const roadTurn = new T.TextureLoader().load(roadTurnTexture);
const roadSplit = new T.TextureLoader().load(roadSplitTexture);

/** @type {Boolean[][]} */
const treePositions = [[]];
/** @type {T.Vector2[]} */
const freeTreePositions = [];
/** @type {{vector: T.Vector2, tree: Tree}[]} */
const usedTreePositions = [];

const trainTrackPoints = [
  new T.Vector3(10, 3, 15),
  new T.Vector3(-10, 3, 20),
  new T.Vector3(-30, 3, 18),
  new T.Vector3(-30, 3, 0),
  new T.Vector3(-30, 3, -25),
  new T.Vector3(-10, 3, -35),
  new T.Vector3(15, 3, -30),
  new T.Vector3(15, 3, -10),
  new T.Vector3(15, 3, 5),
];
/** m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
export function grtown(renderer, canvasContainer) {
  const width = getComputedStyle(canvasContainer)
    .getPropertyValue('width')
    .slice(0, -2);
  const ratio = 3 / 4;
  // make the world
  const world = new GrWorld({
    renderer,
    width,
    height: width * ratio,
    ambient: 0.6,
    lightColoring: 'c',
    groundplanesize: 80, // make the ground plane big enough for a world of stuff
  });
  const sphere = new T.SphereBufferGeometry(1);
  const mesh = new T.Mesh(sphere, new T.MeshStandardMaterial());

  // setup tree positions
  for (var i1 = 0; i1 <= 10; i1++) {
    const array = [];
    for (let j = 0; j <= 10; j++) {
      array.push(false);
      freeTreePositions.push(new T.Vector2(-j, -i1 - 5));
    }
    treePositions.push(array);
  }
  // put stuff into the world
  // this calls the example code (that puts a lot of objects into the world)
  // you can look at it for reference, but do not use it in your assignment
  // main(world);

  // build and run the UI
  /** @type {GrObject[]} */
  const houses = [];
  /** @type {Car[]} */
  const cars = [];

  // add the houses
  for (var i2 = 0; i2 < 10; i2++) {
    houses[i2] = new HouseDesign3();
    houses[i2].objects[0].translateX(i2 < 5 ? -i2 * 3.5 : -(i2 - 5) * 3.5);
    houses[i2].objects[0].translateZ(i2 >= 5 ? 10 : 0);
    houses[i2].objects[0].rotation.set(0, ((i2 < 5 ? -1 : 1) * Math.PI) / 2, 0);
    world.add(houses[i2]);
  }
  // add inital trees in a checkerboard fashion
  // tree grid: Z: {-5,-15}, X: {0,-10}
  for (var i3 = 0; i3 < 10; i3++) {
    treePositions[i3][i3 % 2 == 0 ? 0 : 2] = true;
    const tree = new Tree((Math.floor(Math.random() * 2) + 1) / 2 + 2);
    tree.objects[0].translateX(-i3);
    tree.objects[0].translateZ(i3 % 2 == 0 ? -5 : -7);
    setPositionUsed(-i3, i3 % 2 == 0 ? -5 : -7, tree);
    world.add(tree);
  }
  for (var i4 = 0; i4 < 10; i4++) {
    treePositions[i4][i4 % 2 == 0 ? 2 : 6] = true;
    const tree = new Tree((Math.floor(Math.random() * 2) + 1) / 2 + 2);
    tree.objects[0].translateX(-i4);
    tree.objects[0].translateZ(i4 % 2 == 0 ? -9 : -11);
    setPositionUsed(-i4, i4 % 2 == 0 ? -9 : -11, tree);
    world.add(tree);
  }
  const swing = new GrAdvancedSwing();
  swing.objects[0].translateZ(-20);
  swing.objects[0].scale.set(0.5, 0.5, 0.5);
  world.add(swing);
  const carousel = new GrCarousel();
  carousel.objects[0].translateZ(-25);
  carousel.objects[0].scale.set(0.5, 0.5, 0.5);
  world.add(carousel);
  // build road
  buildRoad(world);
  // build cars
  for (var i5 = 0; i5 < 2; i5++) {
    cars[i5] = new Car(i5 == 0 ? undefined : '#00ff00', roadPoints);
    cars[i5].objects[0].translateX(i5 < 5 ? -i5 * 6 : -(i5 - 5) * 3.5);
    cars[i5].objects[0].translateZ(5);
    cars[i5].objects[0].rotation.set(0, i5 * Math.PI, 0);
    cars[i5].objects[0].scale.set(0.4, 0.4, 0.4);
    world.add(cars[i5]);
  }
  const dumpTruck = new GrDumpTruck();
  const obj = new T.Object3D();
  obj.position.set(0, 0, 5);
  dumpTruck.objects[0].translateX(0);
  dumpTruck.objects[0].translateZ(3);
  dumpTruck.objects[0].rotation.set(0, 0, 0);
  dumpTruck.objects[0].scale.set(0.4, 0.4, 0.4);
  world.add(dumpTruck);
  // build walls
  const numWalls = 11;
  for (var i6 = 0; i6 < numWalls; i6++) {
    const height = 1;
    const wall = new BrickWall(1, height, 0.5);
    wall.objects[0].translateZ(10);
    wall.objects[0].translateY(height / 2);
    wall.objects[0].translateX(i6 + 2);
    world.add(wall);
  }
  // helper variables
  let heliGoingToPoint = null;
  let heliHasTree = null;
  let heliTree = null;
  const heli1 = new helicopter(1);
  heli1.objects[0].translateZ(5);
  heli1.objects[0].translateX(5);
  heli1.tick = (delta) => {
    const rotor = heli1.objects[0].children.find((obj) => obj.name == 'rotor');

    const tailRotor = heli1.objects[0].children
      .find((obj) => obj.name == 'tail')
      .children.find((obj) => obj.name == 'rotor');
    rotor.rotation.set(
      performance.now() / 250,
      rotor.rotation.y,
      rotor.rotation.z,
    );
    tailRotor.rotation.set(
      tailRotor.rotation.x,
      performance.now() / 250,
      tailRotor.rotation.z,
    );

    if (heliGoingToPoint) {
      const positionChange = {
        x: heli1.objects[0].position.x - heliGoingToPoint.x,
        y: heli1.objects[0].position.z - heliGoingToPoint.z,
      };
      const rotation = calculateRotation(positionChange);
      const speed = 40;
      heli1.objects[0].rotation.set(
        heli1.objects[0].rotation.x,
        Math.PI - rotation,
        heli1.objects[0].rotation.z,
      );
      const newPosition = {
        x: heli1.objects[0].position.x - positionChange.x / speed,
        y: heli1.objects[0].position.z - positionChange.y / speed,
      };
      heli1.objects[0].position.set(
        newPosition.x,
        heli1.objects[0].position.y,
        newPosition.y,
      );
      // helicopter has stopped at a point
      if (
        Math.abs(positionChange.x) < 0.5 &&
        Math.abs(positionChange.y) < 0.5
      ) {
        // path complete
        if (heliHasTree) {
          heliTree.objects[0].translateY(100000);
          setPositionUsed(heliGoingToPoint.x, heliGoingToPoint.z, heliTree);
          heliHasTree = false;
          heliTree = null;
          heliGoingToPoint = null;
        }
        // picked up tree, heading to place it
        else {
          const point = getRandomFreePoint();
          setPositionFree(heliGoingToPoint.x, heliGoingToPoint.z);
          heliGoingToPoint = new T.Vector3(
            point.x,
            heli1.objects[0].position.y,
            point.y,
          );
          heliTree.objects[0].translateY(-100000);
          heliHasTree = true;
        }
      }
    }
    // set the rotation of the copter
    // let rotation = calculateRotation({ x: heli1.objects[0].position.x - x, y: heli1.objects[0].position.z - z });
    // heli1.objects[0].rotation.set(heli1.objects[0].rotation.x, Math.PI - rotation, heli1.objects[0].rotation.z);
    // begin path
    if (!heliGoingToPoint && Math.floor(performance.now()) % 10 == 0) {
      const point = getRandomUsedPoint();
      heliGoingToPoint = new T.Vector3(
        point.vector.x,
        heli1.objects[0].position.y,
        point.vector.y,
      );
      heliTree = point.tree;
    }
  };
  world.add(heli1);
  const curve = buildTrainTrack(world);
  const train = new Train('#658575', curve);
  world.add(train);
  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world, undefined, canvasContainer);
  // now make it go!

  const cube = new T.CubeTextureLoader().load([
    require('../../../assets/Pictures/Back.bmp'),
    require('../../../assets/Pictures/Front.bmp'),
    require('../../../assets/Pictures/Top.jpg'),
    require('../../../assets/Pictures/Bottom.bmp'),
    require('../../../assets/Pictures/Right.bmp'),
    require('../../../assets/Pictures/Left.bmp'),
  ]);
  world.scene.background = cube;
  world.go();
}

/**
 * @returns {T.Vector2}
 */
function getRandomFreePoint() {
  // random is from 0 to not including 1, so .length is fine
  const randomIndex = Math.floor(Math.random() * freeTreePositions.length);
  return freeTreePositions[randomIndex];
}
/**
 * @returns {{vector: T.Vector2, tree: Tree}}
 */
function getRandomUsedPoint() {
  // random is from 0 to not including 1, so .length is fine
  const randomIndex = Math.floor(Math.random() * usedTreePositions.length);
  return usedTreePositions[randomIndex];
}
/**
 * O(N)
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Tree} tree
 */
function setPositionUsed(x, y, tree) {
  let indexOf = -1;
  freeTreePositions.forEach((element, index) => {
    if (element.x == x && element.y == y) {
      indexOf = index;
    }
  });
  tree.objects[0].position.set(x, tree.objects[0].position.y, y);
  usedTreePositions.push({
    vector: freeTreePositions.splice(indexOf, 1)[0],
    tree,
  });
}
/**
 * O(N)
 *
 * @param {Number} x
 * @param {Number} y
 */
function setPositionFree(x, y) {
  let indexOf = -1;
  usedTreePositions.forEach((element, index) => {
    if (element.vector.x == x && element.vector.y == y) {
      indexOf = index;
    }
  });
  freeTreePositions.push(usedTreePositions.splice(indexOf, 1)[0].vector);
}
/**
 * @param {{x: number, y: number}} positionChange
 */
function calculateRotation(positionChange) {
  let rotation = 0;
  if (positionChange.x == 0 && positionChange.y == 0) {
    return 0;
  }

  // quadrient 1
  if (positionChange.x > 0 && positionChange.y <= 0) {
    rotation =
      Math.PI / 2 -
      Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
    rotation = -rotation;
  }
  // quadrient 2
  else if (positionChange.x <= 0 && positionChange.y < 0) {
    rotation =
      Math.PI / 2 -
      Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
    rotation = -(Math.PI / 2) - rotation;
  }
  // quadrient 3
  else if (positionChange.x < 0 && positionChange.y >= 0) {
    rotation =
      Math.PI / 2 -
      Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
    rotation = -Math.PI - rotation;
  }
  // quadrient 4
  else if (positionChange.x >= 0 && positionChange.y > 0) {
    rotation =
      Math.PI / 2 -
      Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
    rotation = -((3 * Math.PI) / 2) - rotation;
  }
  return rotation;
}
let firstRoadPoint;
const roadPoints = [];
/**
 *
 * @param {GrWorld} world
 */
function buildRoad(world) {
  const roadBlock = new T.CubeGeometry(3.5, 0.05, 3.5);
  const sideBlock = new T.CubeGeometry(3.5, 0.05, 2.5);
  let backRoadPoints = [];
  for (var i1 = -1; i1 < 5; i1++) {
    const roadMesh = new T.Mesh(
      roadBlock,
      new T.MeshStandardMaterial({ map: mainRoad }),
    );
    const sideMeshR = new T.Mesh(
      sideBlock,
      new T.MeshStandardMaterial({ map: roadSide }),
    );
    const sideMeshL = new T.Mesh(
      sideBlock,
      new T.MeshStandardMaterial({ map: roadSide }),
    );
    roadMesh.translateX(-i1 * 3.5);
    roadMesh.translateZ(5);
    sideMeshR.translateX(-i1 * 3.5);
    sideMeshR.translateZ(2);
    sideMeshL.translateX(-i1 * 3.5);
    sideMeshL.translateZ(8);
    roadPoints.push(new T.Vector2(-i1 * 3.5, 4.75));
    if (!firstRoadPoint) {
      firstRoadPoint = new T.Vector2(-i1 * 3.5, 4.75);
    }
    world.add(new GrObject('road', roadMesh));

    world.add(new GrObject('road', sideMeshR));
    world.add(new GrObject('side', sideMeshL));
  }
  roadPoints.forEach((point, index) => {
    backRoadPoints[roadPoints.length - 1 - index] = new T.Vector2(
      point.x,
      point.y + 0.5,
    );
  });
  const loopByHouses = buildRoadLoop(roadBlock);
  backRoadPoints.forEach((point) => {
    roadPoints.push(point);
  });

  const roadMesh = new T.Mesh(
    roadBlock,
    new T.MeshStandardMaterial({ map: roadTurn }),
  );
  const sideMeshR = new T.Mesh(
    sideBlock,
    new T.MeshStandardMaterial({ map: roadSide }),
  );
  const sideMeshL = new T.Mesh(
    sideBlock,
    new T.MeshStandardMaterial({ map: roadSide }),
  );
  roadMesh.translateX(2 * 3.5);
  roadMesh.translateZ(5);
  roadMesh.rotateZ(Math.PI);
  roadPoints.push(new T.Vector2(2 * 3.5, 5));

  sideMeshR.translateX(2 * 3.5);
  sideMeshR.translateZ(2);
  sideMeshL.translateX(2 * 3.5);
  sideMeshL.translateZ(8);
  world.add(new GrObject('road', roadMesh));
  world.add(new GrObject('side', sideMeshL));

  backRoadPoints = [];
  world.add(new GrObject('loopByHouses', loopByHouses));
  const groupRoad = new T.Group();
  const groupSideR = new T.Group();
  const groupSideL = new T.Group();
  const tempPoints = [];
  for (var i = -1; i < 5; i++) {
    const roadMesh = new T.Mesh(
      roadBlock,
      new T.MeshStandardMaterial({ map: mainRoad }),
    );
    const sideMeshR = new T.Mesh(
      sideBlock,
      new T.MeshStandardMaterial({ map: roadSide }),
    );
    const sideMeshL = new T.Mesh(
      sideBlock,
      new T.MeshStandardMaterial({ map: roadSide }),
    );
    roadMesh.translateX(-i * 3.5);
    roadMesh.translateZ(5);
    const roadPointAt = new T.Vector2(7.5, -i * 3.5 - 4);
    roadPoints.push(roadPointAt);
    tempPoints.push(roadPointAt);
    sideMeshR.translateX(-i * 3.5);
    sideMeshR.translateZ(2);
    sideMeshL.translateX(-i * 3.5);
    sideMeshL.translateZ(8);
    groupRoad.add(roadMesh);
    groupSideR.add(sideMeshR);
    groupSideL.add(sideMeshL);
  }

  tempPoints.forEach((point, index) => {
    backRoadPoints[tempPoints.length - 1 - index] = new T.Vector2(
      point.x - 1,
      point.y,
    );
  });
  const sideMeshLE1 = new T.Mesh(
    sideBlock,
    new T.MeshStandardMaterial({ map: roadSide }),
  );
  sideMeshLE1.translateX(-5 * 3.5);
  sideMeshLE1.translateZ(8);
  groupSideL.add(sideMeshLE1);
  const sideMeshLE2 = new T.Mesh(
    new T.CubeGeometry(3, 0.05, 2.5),
    new T.MeshStandardMaterial({ map: roadSide }),
  );
  sideMeshLE2.translateX(-5.8 * 3.5);
  sideMeshLE2.translateZ(8);
  groupSideL.add(sideMeshLE2);

  const mainRoadGroup = new T.Group();
  mainRoadGroup.add(groupRoad);
  mainRoadGroup.add(groupSideR);
  mainRoadGroup.add(groupSideL);
  const secondLoop = buildRoadLoop2(roadBlock);

  backRoadPoints.forEach((point) => {
    roadPoints.push(point);
  });
  roadPoints.push(new T.Vector2(2 * 3.5 - 0.5, 4));
  roadPoints.push(firstRoadPoint);
  mainRoadGroup.add(secondLoop);
  mainRoadGroup.rotateY(Math.PI / 2);
  mainRoadGroup.translateY(0);
  mainRoadGroup.translateZ(2);
  mainRoadGroup.translateX(12.5);
  world.add(new GrObject('road', mainRoadGroup));
}

/**
 * @param {T.Geometry} roadBlock
 * @returns {T.Group}
 */
function buildRoadLoop(roadBlock) {
  // build loop at end of houses
  const group = new T.Group();
  const roadMeshSplit = new T.Mesh(
    roadBlock,
    new T.MeshStandardMaterial({ map: roadSplit }),
  );
  roadMeshSplit.translateX(-5 * 3.5);
  roadMeshSplit.translateZ(5);
  roadPoints.push(new T.Vector2(-4.8 * 3.5, 4.75));
  roadMeshSplit.rotateY(Math.PI / 2);
  group.add(roadMeshSplit);
  const tempRoadPoints = [];
  for (let i = 0; i < 4; i++) {
    const roadMesh1 = new T.Mesh(
      roadBlock,
      new T.MeshStandardMaterial({ map: roadTurn }),
    );
    const xCor = -((5 + (i / 2 >= 1 ? 1 : 0)) * 3.5);
    const zCor = i / 2 >= 1 ? (i % 2 ? 8.5 : 1.5) : i % 2 ? 1.5 : 8.5;
    roadMesh1.translateX(xCor);
    roadMesh1.translateZ(zCor);
    roadMesh1.rotateY(Math.PI + (Math.PI / 2) * i);
    if (i == 0) {
      tempRoadPoints[3] = new T.Vector2(xCor, zCor);
    }
    if (i == 1) {
      tempRoadPoints[0] = new T.Vector2(xCor, zCor);
    }
    if (i == 2) {
      tempRoadPoints[1] = new T.Vector2(xCor, zCor);
    }
    if (i == 3) {
      tempRoadPoints[2] = new T.Vector2(xCor, zCor);
    }
    group.add(roadMesh1);
  }
  roadPoints.push(tempRoadPoints[0]);
  roadPoints.push(tempRoadPoints[1]);
  roadPoints.push(new T.Vector2(-6.15 * 3.5, 5));
  roadPoints.push(tempRoadPoints[2]);
  roadPoints.push(tempRoadPoints[3]);

  const roadMeshFinish = new T.Mesh(
    roadBlock,
    new T.MeshStandardMaterial({ map: mainRoad }),
  );
  roadMeshFinish.translateX(-6 * 3.5);
  roadMeshFinish.translateZ(5);
  roadMeshFinish.rotateY(Math.PI / 2);
  roadPoints.push(new T.Vector2(-4.8 * 3.5, 5.25));
  group.add(roadMeshFinish);
  return group;
}
/**
 * @param {T.Geometry} roadBlock
 * @returns {T.Group}
 */
function buildRoadLoop2(roadBlock) {
  // build loop at end of houses
  const group = new T.Group();
  const roadMeshSplit = new T.Mesh(
    roadBlock,
    new T.MeshStandardMaterial({ map: roadSplit }),
  );
  roadMeshSplit.translateX(2 * 3.5);
  roadMeshSplit.translateZ(5);
  roadPoints.push(new T.Vector2(8, -5.5 * 3.5));
  roadMeshSplit.rotateY((3 * Math.PI) / 2);
  group.add(roadMeshSplit);
  const tempRoadPoints = [];
  for (let i = 0; i < 4; i++) {
    const xCor = (2 + (i / 2 >= 1 ? 1 : 0)) * 3.5;
    const zCor = i / 2 >= 1 ? (i % 2 ? 8.5 : 1.5) : i % 2 ? 1.5 : 8.5;
    const roadMesh1 = new T.Mesh(
      roadBlock,
      new T.MeshStandardMaterial({ map: roadTurn }),
    );
    roadMesh1.translateX(xCor);
    roadMesh1.translateZ(zCor);
    roadMesh1.rotateY(Math.PI / 2 - (Math.PI / 2) * i);
    group.add(roadMesh1);
    const vector = new T.Vector2(zCor + 8.75, -xCor - 12.5);
    const vector2 = new T.Vector2(zCor - 4.75, -xCor - 12.5);
    if (i == 0) {
      tempRoadPoints[3] = vector2;
    }
    if (i == 1) {
      tempRoadPoints[0] = vector;
    }
    if (i == 2) {
      tempRoadPoints[1] = vector;
    }
    if (i == 3) {
      tempRoadPoints[2] = vector2;
    }
  }
  roadPoints.push(tempRoadPoints[0]);
  roadPoints.push(tempRoadPoints[1]);
  roadPoints.push(new T.Vector2(8, -6.75 * 3.5));
  roadPoints.push(tempRoadPoints[2]);
  roadPoints.push(tempRoadPoints[3]);

  roadPoints.push(new T.Vector2(5.25, -5.5 * 3.5));
  const roadMeshFinish = new T.Mesh(
    roadBlock,
    new T.MeshStandardMaterial({ map: mainRoad }),
  );
  roadMeshFinish.translateX(3 * 3.5);
  roadMeshFinish.translateZ(5);
  roadMeshFinish.rotateY(Math.PI / 2);
  group.add(roadMeshFinish);
  return group;
}

/**
 *
 * @param {GrWorld} world
 * @returns {T.SplineCurve}
 */
function buildTrainTrack(world) {
  const cube = new T.CubeGeometry(1, 1, 1);

  const track = new T.Group();

  const trackPoints = [];
  const lastPoint = trainTrackPoints[trainTrackPoints.length - 1];
  trackPoints.push(new T.Vector2(lastPoint.x, lastPoint.z));
  trainTrackPoints.forEach((/** @type {T.Vector3} */ point, index) => {
    const mesh = new T.Mesh(
      cube,
      new T.MeshStandardMaterial({ color: '#ff0000' }),
    );
    mesh.translateX(point.x);
    mesh.translateY(point.y);
    mesh.translateZ(point.z);

    trackPoints.push(new T.Vector2(point.x, point.z));
  });

  const innerCurve = new T.SplineCurve(trackPoints);
  const outerTrackPoints = [];
  const middleTrackPoints = [];
  const outerTrackOffset = 1; // offset
  let firstPoint;
  // take an extra 4 points to make the second line smoother
  for (let i = 0; i <= trackPoints.length * 4; i++) {
    let tangentCurve = innerCurve.getTangent(i / (trackPoints.length * 4));
    const initialPoint = innerCurve.getPoint(i / (trackPoints.length * 4));

    // rotate 90 degrees
    tangentCurve = new T.Vector2(tangentCurve.y, -tangentCurve.x);
    const newPoint = new T.Vector2(
      initialPoint.x + tangentCurve.x * outerTrackOffset,
      initialPoint.y + tangentCurve.y * outerTrackOffset,
    );
    const newPointPost = new T.Vector2(
      initialPoint.x + tangentCurve.x * (outerTrackOffset / 2),
      initialPoint.y + tangentCurve.y * (outerTrackOffset / 2),
    );
    middleTrackPoints.push(newPointPost);
    if (i % 2) {
      const post = buildPost(3);
      // first good
      post.translateX(newPointPost.x + (tangentCurve.x > 0 ? 0.5 : -0.5));
      post.translateY(1 / 2);
      post.translateZ(newPointPost.y + (tangentCurve.y > 0 ? 0.5 : -0.3));
      post.rotateY(
        Math.PI - calculateRotation({ x: tangentCurve.x, y: tangentCurve.y }),
      );

      track.add(post);
    }
    if (i == 0) {
      firstPoint = newPoint;
    }
    outerTrackPoints.push(newPoint);
  }

  outerTrackPoints.push(firstPoint);
  const outerCurve = new T.SplineCurve(outerTrackPoints);
  const middleCurve = new T.SplineCurve(middleTrackPoints);
  const outerCurvePoints = outerCurve.getPoints(50);
  const innerCurvePoints = innerCurve.getPoints(50);
  const bufferPoints = new T.BufferGeometry().setFromPoints(innerCurvePoints);
  const bufferPoints2 = new T.BufferGeometry().setFromPoints(outerCurvePoints);

  const trackMesh = new T.Line(
    bufferPoints,
    new T.MeshStandardMaterial({ color: '#0000ff' }),
  );
  const trackMesh2 = new T.Line(
    bufferPoints2,
    new T.MeshStandardMaterial({ color: '#0000ff' }),
  );

  trackMesh.rotateX(Math.PI / 2);
  trackMesh.translateZ(-3);
  trackMesh2.rotateX(Math.PI / 2);
  trackMesh2.translateZ(-3);
  world.add(new GrObject('track1', trackMesh));
  world.add(new GrObject('track2', trackMesh2));
  world.add(new GrObject('track', track));
  return middleCurve;
}

function buildPost(height) {
  const ceil = Math.ceil(height);
  const group = new T.Group();
  for (let j = 0; j < ceil; j++) {
    const postSection = buildPostSection(height / ceil);
    postSection.translateY(j * (height / ceil));
    group.add(postSection);
  }
  return group;
}
/**
 *
 * @param {Number} height
 * @returns {T.Group}
 */
function buildPostSection(height) {
  const postMaterial = new T.MeshStandardMaterial({ color: '#663300' });
  const postSpindle = new T.CylinderBufferGeometry(0.1, 0.1, height);
  const group = new T.Group();
  const frontRightSpindle = new T.Mesh(postSpindle, postMaterial);
  const frontLeftSpindle = new T.Mesh(postSpindle, postMaterial);
  const backRightSpindle = new T.Mesh(postSpindle, postMaterial);
  const backLeftSpindle = new T.Mesh(postSpindle, postMaterial);
  const frontRightCross = buildPostCross(height);
  const frontLeftCross = buildPostCross(height);
  const backRightCross = buildPostCross(height);
  const backLeftCross = buildPostCross(height);
  frontLeftCross.rotateZ(Math.PI / 2);
  backRightCross.rotateY(Math.PI / 2);
  backLeftCross.rotateY(Math.PI / 2);
  frontRightCross.translateX(0.5);
  frontLeftCross.translateZ(1);
  frontLeftCross.translateY(-0.5);
  backRightCross.translateX(-0.5);
  backLeftCross.translateX(-0.5);
  backLeftCross.translateZ(1);

  frontRightSpindle.translateZ(1);
  frontRightSpindle.translateX(1);
  backRightSpindle.translateZ(0);
  backRightSpindle.translateX(1);
  frontLeftSpindle.translateZ(1);
  frontLeftSpindle.translateX(0);
  backLeftSpindle.translateZ(0);
  backLeftSpindle.translateX(0);
  group.add(frontRightSpindle);
  group.add(frontLeftSpindle);
  group.add(backRightSpindle);
  group.add(backLeftSpindle);
  group.add(frontRightCross);
  group.add(frontLeftCross);
  group.add(backRightCross);
  group.add(backLeftCross);
  return group;
}
/**
 *
 *
 * @param {*} height
 * @returns {T.Group}
 */
function buildPostCross(height) {
  const postMaterial = new T.MeshStandardMaterial({ color: '#663300' });
  const postSpindle = new T.CylinderBufferGeometry(0.1, 0.1);
  const group = new T.Group();

  const rightSpindle = new T.Mesh(postSpindle, postMaterial);
  const leftSpindle = new T.Mesh(postSpindle, postMaterial);
  rightSpindle.rotateZ(Math.PI / 4);
  leftSpindle.rotateZ(-Math.PI / 4);
  group.add(rightSpindle);
  group.add(leftSpindle);
  return group;
}
