/*jshint esversion: 6 */
// @ts-ignore
/* eslint-disable no-unused-expressions */

import * as T from "three";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

import sidingSecondary from "../../../assets/Pictures/sidingSecondary.jpg";
import stoneSiding from "../../../assets/Pictures/stoneSiding.jpg";
import roofing from "../../../assets/Pictures/roofing.jpg";
import mainDoor from "../../../assets/Pictures/mainDoor.jpg";
import window from "../../../assets/Pictures/window.jpg";

let tl = new T.TextureLoader().load(sidingSecondary);
let t2 = new T.TextureLoader().load(stoneSiding);
let t3 = new T.TextureLoader().load(roofing);
let t4 = new T.TextureLoader().load(mainDoor);
let t5 = new T.TextureLoader().load(window);


export class HouseDesign3 extends GrObject {
    constructor() {
        //
        let mesh = buildComplexWalls(1, 1, false);
        let mesh2 = buildComplexWalls(1, 1, true);
        let roof = buildComplexRoof();
        let window1 = buildWindow(0.75, 0.5);
        let window2 = buildWindow(0.75, 0.5);
        let door = buildDoor(0.75, 1);
        mesh2.translateY(1);
        let mesh3 = new T.Mesh(roof, new T.MeshStandardMaterial({ map: t3, roughness: 0.75 }))
        let mesh4 = new T.Mesh(door, new T.MeshStandardMaterial({ map: t4, roughness: 0.75 }))
        let window1Mesh = new T.Mesh(window1, new T.MeshStandardMaterial({ map: t5, roughness: 0.75 }))
        let window2Mesh = new T.Mesh(window2, new T.MeshStandardMaterial({ map: t5, roughness: 0.75 }))
        window1Mesh.translateX(1.001);
        window1Mesh.translateZ(1);
        window1Mesh.translateY(1);
        window2Mesh.translateX(1.001)
        window2Mesh.translateZ(-1);
        window2Mesh.translateY(1);
        mesh4.translateX(1.001);
        mesh3.translateY(2);
        let group = new T.Group();
        group.add(mesh);
        group.add(mesh2);
        group.add(mesh3);
        group.add(mesh4);
        group.add(window1Mesh);
        group.add(window2Mesh);

        super("House2", group);
    }
}
export class HouseDesign2 extends GrObject {
    constructor() {
        //
        let exterierWall1 = buildSquareWall(1, 1);
        let roof = buildSqaureRoof(0.5, 1);
        let door = buildDoor(0.5, 0.25);
        let material1 = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
        let material2 = new T.MeshStandardMaterial({ map: t3, roughness: 0.75 });
        let material3 = new T.MeshStandardMaterial({ map: t4, roughness: 0.75 });
        let mesh1 = new T.Mesh(exterierWall1, material1);
        let mesh2 = new T.Mesh(roof, material2);
        let mesh3 = new T.Mesh(door, material3);
        mesh3.translateX(0.01);
        mesh2.translateY(1);
        let group = new T.Group();
        group.add(mesh1);
        group.add(mesh2);
        group.add(mesh3);

        super("House1", group);
    }
}
export class HouseDesign1 extends GrObject {
    constructor() {
        //
        let exterierWall1 = buildPanelExterier(1);
        let exterierWall2 = buildStoneExterier(1);
        let roof = buildRoof(0.25);
        let door = buildDoor(0.75, 0.5);
        let material1 = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
        let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
        let material3 = new T.MeshStandardMaterial({ map: t3, roughness: 0.75 });
        let material4 = new T.MeshStandardMaterial({ map: t4, roughness: 0.75 });
        let mesh1 = new T.Mesh(exterierWall1, material1);
        let mesh2 = new T.Mesh(exterierWall2, material2);
        let mesh3 = new T.Mesh(roof, material3);
        let mesh4 = new T.Mesh(door, material4);
        mesh3.translateY(1);
        mesh4.translateX(0.01);
        let group = new T.Group();
        group.add(mesh1);
        group.add(mesh2);
        group.add(mesh3);

        group.add(mesh4);
        super("House1", group);
    }
}
/**
 * 
 * @param {Number} height 
 * @param {Number} width 
 * @returns {T.Geometry}
 */
function buildWindow(height, width) {

    let window = new T.Geometry();
    //top left 0
    window.vertices.push(new T.Vector3(0, height, -width / 2));
    //top right 1
    window.vertices.push(new T.Vector3(0, height, width / 2));
    //bottom left 2
    window.vertices.push(new T.Vector3(0, 0, -width / 2));
    //bottom right 3
    window.vertices.push(new T.Vector3(0, 0, width / 2));

    let window1 = new T.Face3(2, 0, 1);
    let window2 = new T.Face3(1, 3, 2);
    window.faces.push(window1);
    window.faces.push(window2);

    window.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
    ]);
    window.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);

    window.computeFaceNormals();
    window.uvsNeedUpdate = true;
    return window;
}
/**
 * 
 * @param {Number} height 
 * @param {Number} width 
 * @returns {T.Geometry}
 */
function buildDoor(height, width) {

    let door = new T.Geometry();
    //top left 0
    door.vertices.push(new T.Vector3(0, height, -width / 2));
    //top right 1
    door.vertices.push(new T.Vector3(0, height, width / 2));
    //bottom left 2
    door.vertices.push(new T.Vector3(0, 0, -width / 2));
    //bottom right 3
    door.vertices.push(new T.Vector3(0, 0, width / 2));

    let door1 = new T.Face3(2, 0, 1);
    let door2 = new T.Face3(1, 3, 2);
    door.faces.push(door1);
    door.faces.push(door2);

    door.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
    ]);
    door.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);

    door.computeFaceNormals();
    door.uvsNeedUpdate = true;
    return door;
}
/**
 * 
 * @param {Number} height 
 * @param {Number} width
 * @returns {T.Geometry}
 */
function buildSqaureRoof(height, width) {

    let roof = new T.Geometry();

    //back left 0
    roof.vertices.push(new T.Vector3(-width, 0, -width / 2))
        //back right 1
    roof.vertices.push(new T.Vector3(-width, 0, width / 2))
        //front left 2
    roof.vertices.push(new T.Vector3(0, 0, -width / 2))
        //front right 3
    roof.vertices.push(new T.Vector3(0, 0, width / 2))
        //center 4
    roof.vertices.push(new T.Vector3(-width / 2, height, 0));

    let roof1 = new T.Face3(0, 1, 4);
    let roof2 = new T.Face3(1, 3, 4);
    let roof3 = new T.Face3(4, 3, 2);
    let roof4 = new T.Face3(2, 0, 4);
    roof.faces.push(roof1);
    roof.faces.push(roof2);
    roof.faces.push(roof3);
    roof.faces.push(roof4);
    roof.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(0.5, 1),
    ]);
    roof.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(0.5, 1),
    ]);

    roof.faceVertexUvs[0].push([
        new T.Vector2(0.5, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);
    roof.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(0.5, 1),
    ]);

    roof.computeFaceNormals();
    roof.uvsNeedUpdate = true;
    return roof;
}
/**
 * 
 * @param {Number} height 
 * @param {Number} width
 * @returns {T.Geometry}
 */
function buildSquareWall(height, width) {
    let wall = new T.Geometry();
    //top back left 0
    wall.vertices.push(new T.Vector3(-width, height, -width / 2))
        //bottom back left 1
    wall.vertices.push(new T.Vector3(-width, 0, -width / 2))
        //top back right 2
    wall.vertices.push(new T.Vector3(-width, height, width / 2))
        //bottom back right 3
    wall.vertices.push(new T.Vector3(-width, 0, width / 2))

    //top front left 4
    wall.vertices.push(new T.Vector3(0, height, -width / 2))
        //bottom front left 5
    wall.vertices.push(new T.Vector3(0, 0, -width / 2))
        //top front right 6
    wall.vertices.push(new T.Vector3(0, height, width / 2))
        //bottom front right 7
    wall.vertices.push(new T.Vector3(0, 0, width / 2))

    let wall11 = new T.Face3(5, 1, 0);
    let wall12 = new T.Face3(0, 4, 5);
    let wall21 = new T.Face3(0, 1, 3);
    let wall22 = new T.Face3(3, 2, 0);
    let wall31 = new T.Face3(7, 5, 4);
    let wall32 = new T.Face3(4, 6, 7);
    let wall41 = new T.Face3(2, 3, 7);
    let wall42 = new T.Face3(7, 6, 2);

    wall.faces.push(wall11);
    wall.faces.push(wall12);
    wall.faces.push(wall21);
    wall.faces.push(wall22);
    wall.faces.push(wall31);
    wall.faces.push(wall32);
    wall.faces.push(wall41);
    wall.faces.push(wall42);
    let wallTexture1 = [
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
    ]
    let wallTexture2 = [
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
    ]
    let wallTexture3 = [
        new T.Vector2(0, 1),
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
    ]
    let wallTexture4 = [
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
    ]

    wall.faceVertexUvs[0].push(wallTexture2);
    wall.faceVertexUvs[0].push(wallTexture1);
    wall.faceVertexUvs[0].push(wallTexture3);
    wall.faceVertexUvs[0].push(wallTexture4);
    wall.faceVertexUvs[0].push(wallTexture2);
    wall.faceVertexUvs[0].push(wallTexture1);
    wall.faceVertexUvs[0].push(wallTexture3);
    wall.faceVertexUvs[0].push(wallTexture4);
    wall.computeFaceNormals();
    wall.uvsNeedUpdate = true;
    return wall;
}
/**
 * 
 * @param {Number} height 
 * @returns {T.Geometry}
 */
function buildRoof(height) {
    let roof = new T.Geometry();

    //back left 0
    roof.vertices.push(new T.Vector3(-1, 0, -1));
    //back right 1
    roof.vertices.push(new T.Vector3(-1, 0, 1));

    //middle left 2
    roof.vertices.push(new T.Vector3(-0.5, height, -1));
    //middle right 3
    roof.vertices.push(new T.Vector3(-0.5, height, 1));

    //front left 4
    roof.vertices.push(new T.Vector3(0, 0, -1));
    //front right 5
    roof.vertices.push(new T.Vector3(0, 0, 1));
    //
    // geometry.faceVertexUvs = [[]];
    let panel11 = new T.Face3(1, 2, 0);
    let panel12 = new T.Face3(1, 3, 2);
    let panel21 = new T.Face3(4, 2, 5);
    let panel22 = new T.Face3(2, 3, 5);
    roof.faces.push(panel11);
    roof.faces.push(panel12);
    roof.faces.push(panel21);
    roof.faces.push(panel22);

    roof.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
    ]);
    roof.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);

    roof.faceVertexUvs[0].push([
        new T.Vector2(0, 1),
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
    ]);
    roof.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
    ]);

    roof.computeFaceNormals();
    roof.uvsNeedUpdate = true;
    return roof;
}
/**
 * 
 * @param {Number} height
 * @returns {T.Geometry} 
 */
function buildStoneExterier(height) {
    let exterierWall = new T.Geometry();

    //top front left 0
    exterierWall.vertices.push(new T.Vector3(0, height, -1));
    //bottom front left 1
    exterierWall.vertices.push(new T.Vector3(0, 0, -1));

    //top front middle 2
    exterierWall.vertices.push(new T.Vector3(0, height, 0));
    //bottom front middle 3
    exterierWall.vertices.push(new T.Vector3(0, 0, 0));

    //top front right 4
    exterierWall.vertices.push(new T.Vector3(0, height, 1));
    //bottom front right 5
    exterierWall.vertices.push(new T.Vector3(0, 0, 1));
    //
    // geometry.faceVertexUvs = [[]];
    let front11 = new T.Face3(3, 1, 0);
    let front12 = new T.Face3(0, 2, 3);
    let front21 = new T.Face3(4, 5, 3);
    let front22 = new T.Face3(3, 2, 4);
    exterierWall.faces.push(front11);
    exterierWall.faces.push(front12);
    exterierWall.faces.push(front21);
    exterierWall.faces.push(front22);

    exterierWall.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
        new T.Vector2(0, 0),
    ]);
    exterierWall.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
    ]);

    exterierWall.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
    ]);
    exterierWall.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);

    exterierWall.computeFaceNormals();
    exterierWall.uvsNeedUpdate = true;
    return exterierWall;
}
/**
 * 
 * @param {Number} height 
 * @returns {T.Geometry}
 */
function buildPanelExterier(height) {
    let exterierWall1 = new T.Geometry();
    //
    //top back left 0
    exterierWall1.vertices.push(new T.Vector3(-1, height, -1));
    //bottom back left 1
    exterierWall1.vertices.push(new T.Vector3(-1, 0, -1));
    //top front left 2
    exterierWall1.vertices.push(new T.Vector3(0, height, -1));
    //bottom front left 3
    exterierWall1.vertices.push(new T.Vector3(0, 0, -1));

    //top back middle 4
    exterierWall1.vertices.push(new T.Vector3(-1, height, 0));
    //bottom back middle 5
    exterierWall1.vertices.push(new T.Vector3(-1, 0, 0));
    //top front middle 6
    exterierWall1.vertices.push(new T.Vector3(0, height, 0));
    //bottom front middle 7
    exterierWall1.vertices.push(new T.Vector3(0, 0, 0));

    //top back right 8
    exterierWall1.vertices.push(new T.Vector3(-1, height, 1));
    //bottom back right 9
    exterierWall1.vertices.push(new T.Vector3(-1, 0, 1));
    //top front right 10
    exterierWall1.vertices.push(new T.Vector3(0, height, 1));
    //bottom front right 11
    exterierWall1.vertices.push(new T.Vector3(0, 0, 1));

    //roof top left 12
    exterierWall1.vertices.push(new T.Vector3(-0.5, height + 0.25, -1));
    //roof top right 13
    exterierWall1.vertices.push(new T.Vector3(-0.5, height + 0.25, 1));

    //
    // geometry.faceVertexUvs = [[]];
    let left1 = new T.Face3(2, 1, 0);
    let left2 = new T.Face3(2, 3, 1);
    let right1 = new T.Face3(8, 9, 10);
    let right2 = new T.Face3(9, 11, 10);
    let back11 = new T.Face3(0, 1, 5);
    let back12 = new T.Face3(5, 4, 0);
    let back21 = new T.Face3(5, 9, 8);
    let back22 = new T.Face3(8, 4, 5);
    let top1 = new T.Face3(12, 2, 0);
    let top2 = new T.Face3(8, 10, 13);
    exterierWall1.faces.push(left1);
    exterierWall1.faces.push(left2);
    exterierWall1.faces.push(right1);
    exterierWall1.faces.push(right2);
    exterierWall1.faces.push(back11);
    exterierWall1.faces.push(back12);
    exterierWall1.faces.push(back21);
    exterierWall1.faces.push(back22);
    exterierWall1.faces.push(top1);
    exterierWall1.faces.push(top2);

    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 1),
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
    ]);

    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);

    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
        new T.Vector2(0, 0),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
    ]);

    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(1 / 2, 1 / 2),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]);
    exterierWall1.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1 / 2, 1 / 2),
    ]);

    exterierWall1.computeFaceNormals();
    exterierWall1.uvsNeedUpdate = true;
    return exterierWall1;
}
let complexPoints = [
        new T.Vector3(1, 0, -1.5), //front left bottom 0
        new T.Vector3(1, 0, -0.5), //front middleL bottom 1
        new T.Vector3(1, 0, 0.5), //front middleR bottom 2
        new T.Vector3(1, 0, 1.5), //front right bottom 3
        new T.Vector3(1, 1, -1.5), //front left top 4
        new T.Vector3(1, 1, -0.5), //front middleL top 5
        new T.Vector3(1, 1, 0.5), //front middleR top 6
        new T.Vector3(1, 1, 1.5), //front right top 7

        new T.Vector3(0, 0, -1.5), //middle left bottom 8
        new T.Vector3(0, 0, 1.5), //middle right bottom 9
        new T.Vector3(0, 1, -1.5), //middle left top 10
        new T.Vector3(0, 1, 1.5), //middle right top 11

        new T.Vector3(-1, 0, -1.5), //back left bottom 12
        new T.Vector3(-1, 0, -0.5), //back middleL bottom 13
        new T.Vector3(-1, 0, 0.5), //back middleR bottom 14
        new T.Vector3(-1, 0, 1.5), //back right bottom 15
        new T.Vector3(-1, 1, -1.5), //back left top 16
        new T.Vector3(-1, 1, -0.5), //back middleL top 17
        new T.Vector3(-1, 1, 0.5), //back middleR top 18
        new T.Vector3(-1, 1, 1.5), //back right top 19
        //roof
        new T.Vector3(1, 1.5, -1), //Top left front 20
        new T.Vector3(1, 1.5, 1), //top right front 21

    ]
    /**
     * 
     * @param {Number} width 
     * @param {Number} height
     * @param {Boolean} showRoofSnip
     * @returns {T.Group} 
     */
function buildComplexWalls(width, height, showRoofSnip) {
    let group = new T.Group();
    let material1 = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
    let material3 = new T.MeshStandardMaterial({ map: t3, roughness: 0.75 });
    let material4 = new T.MeshStandardMaterial({ map: t4, roughness: 0.75 });

    let wall = new T.Geometry();

    wall.vertices = complexPoints;
    wall.faces.push(new T.Face3(8, 4, 0));
    wall.faces.push(new T.Face3(8, 10, 4));
    wall.faces.push(new T.Face3(10, 8, 12));
    wall.faces.push(new T.Face3(12, 16, 10));
    wall.faces.push(new T.Face3(3, 7, 9));
    wall.faces.push(new T.Face3(7, 11, 9));
    wall.faces.push(new T.Face3(15, 9, 11));
    wall.faces.push(new T.Face3(11, 19, 15));
    wall.faces.push(new T.Face3(17, 16, 12));
    wall.faces.push(new T.Face3(12, 13, 17));
    wall.faces.push(new T.Face3(18, 17, 13));
    wall.faces.push(new T.Face3(13, 14, 18));
    wall.faces.push(new T.Face3(19, 18, 14));
    wall.faces.push(new T.Face3(14, 15, 19));

    wall.computeFaceNormals();
    wall.uvsNeedUpdate = true;
    let wallMesh = new T.Mesh(wall, material1);
    let front = new T.Geometry();
    front.vertices = complexPoints;
    front.faces.push(new T.Face3(0, 4, 5));
    front.faces.push(new T.Face3(5, 1, 0));
    front.faces.push(new T.Face3(1, 5, 6));
    front.faces.push(new T.Face3(6, 2, 1));
    front.faces.push(new T.Face3(2, 6, 7));
    front.faces.push(new T.Face3(7, 3, 2));
    if (showRoofSnip) {
        front.faces.push(new T.Face3(20, 5, 4));
        front.faces.push(new T.Face3(21, 7, 6));
    }
    let frontTextureVector = [
        [
            new T.Vector2(0, 0),
            new T.Vector2(0, 1),
            new T.Vector2(1, 1),
        ],
        [
            new T.Vector2(1, 1),
            new T.Vector2(1, 0),
            new T.Vector2(0, 0),
        ],
        [
            new T.Vector2(0.5, 1),
            new T.Vector2(1, 0),
            new T.Vector2(0, 0),
        ],
    ]

    front.faceVertexUvs[0].push(frontTextureVector[0]);
    front.faceVertexUvs[0].push(frontTextureVector[1]);
    front.faceVertexUvs[0].push(frontTextureVector[0]);
    front.faceVertexUvs[0].push(frontTextureVector[1]);
    front.faceVertexUvs[0].push(frontTextureVector[0]);
    front.faceVertexUvs[0].push(frontTextureVector[1]);

    front.faceVertexUvs[0].push(frontTextureVector[2]);
    front.faceVertexUvs[0].push(frontTextureVector[2]);

    front.computeFaceNormals();
    front.uvsNeedUpdate = true;
    let frontMesh = new T.Mesh(front, material2);

    front.faces.push
    group.add(wallMesh);
    group.add(frontMesh);
    return group;
}
let complexRoofPoints = [
        new T.Vector3(1, 0, -1.5), //front left bottom 0
        new T.Vector3(1, 0, -0.5), //front middleL bottom 1
        new T.Vector3(1, 0, 0.5), //front middleR bottom 2
        new T.Vector3(1, 0, 1.5), //front right bottom 3

        new T.Vector3(0, 0, -1.5), //middle left bottom 4
        new T.Vector3(0, 0, 1.5), //middle right bottom 5

        new T.Vector3(-1, 0, -1.5), //back left bottom 6
        new T.Vector3(-1, 0, -0.5), //back middleL bottom 7
        new T.Vector3(-1, 0, 0.5), //back middleR bottom 8
        new T.Vector3(-1, 0, 1.5), //back right bottom 9

        new T.Vector3(1, 0.5, -1), //Top left front 10
        new T.Vector3(0, 0.5, -1), //Top left middle 11
        new T.Vector3(-0.5, 0.5, -1), //Top left back 12
        new T.Vector3(-0.5, 0.5, -0.5), //top middleL back 13
        new T.Vector3(-0.5, 0.5, 0.5), //top middleR back 14
        new T.Vector3(1, 0.5, 1), //top right front 15
        new T.Vector3(0, 0.5, 1), //top right middle 16
        new T.Vector3(-0.5, 0.5, 1), //top right back 17

        new T.Vector3(0, 0, -0.5), //middle middleL bottom 18
        new T.Vector3(0, 0, 0.5), //middle middleR bottom 19

    ]
    /**
     * @returns {T.Geometry}
     */
function buildComplexRoof() {
    let roof = new T.Geometry();

    roof.vertices = complexRoofPoints;
    roof.faces.push(new T.Face3(0, 4, 10));
    roof.faces.push(new T.Face3(4, 11, 10));
    roof.faces.push(new T.Face3(4, 6, 12));
    roof.faces.push(new T.Face3(4, 12, 11));

    roof.faces.push(new T.Face3(10, 18, 1));
    roof.faces.push(new T.Face3(10, 11, 18));
    roof.faces.push(new T.Face3(18, 11, 12));

    roof.faces.push(new T.Face3(15, 5, 3));
    roof.faces.push(new T.Face3(15, 16, 5));
    roof.faces.push(new T.Face3(17, 9, 5));
    roof.faces.push(new T.Face3(16, 17, 5));

    roof.faces.push(new T.Face3(2, 19, 15));
    roof.faces.push(new T.Face3(19, 16, 15));
    roof.faces.push(new T.Face3(17, 16, 19));

    roof.faces.push(new T.Face3(7, 12, 6));
    roof.faces.push(new T.Face3(13, 12, 7));
    roof.faces.push(new T.Face3(7, 8, 13));
    roof.faces.push(new T.Face3(13, 8, 14));
    roof.faces.push(new T.Face3(9, 17, 8));
    roof.faces.push(new T.Face3(8, 17, 14));

    roof.faces.push(new T.Face3(18, 12, 13));
    roof.faces.push(new T.Face3(13, 14, 18));
    roof.faces.push(new T.Face3(19, 18, 14));
    roof.faces.push(new T.Face3(14, 17, 19));

    roof.faces.push(new T.Face3(1, 18, 19));
    roof.faces.push(new T.Face3(19, 2, 1));
    let roofTexture1 = [
        new T.Vector2(0, 1),
        new T.Vector2(1, 1),
        new T.Vector2(0, 0),
    ]
    let roofTexture2 = [
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
    ]
    let roofTexture3 = [
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
        new T.Vector2(0.5, 0),
    ]
    let roofTexture4 = [
        new T.Vector2(0.5, 1),
        new T.Vector2(0, 0),
        new T.Vector2(0.5, 0),
    ]
    let roofTexture5 = [
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
    ]
    let roofTexture6 = [
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
    ]
    let roofTexture7 = [
        new T.Vector2(0.5, 1),
        new T.Vector2(0.5, 0),
        new T.Vector2(0, 0),
    ]
    let roofTexture8 = [
        new T.Vector2(0.5, 0),
        new T.Vector2(1, 1),
        new T.Vector2(0, 1),
    ]
    let roofTexture9 = [
        new T.Vector2(0.5, 0),
        new T.Vector2(0, 0),
        new T.Vector2(0.5, 1),
    ]
    let roofTexture11 = [
        new T.Vector2(0, 1),
        new T.Vector2(0.5, 0),
        new T.Vector2(1, 1),
    ]
    let roofTexture12 = [
        new T.Vector2(0.5, 0),
        new T.Vector2(0, 0),
        new T.Vector2(0.5, 1),
    ]
    let roofTexture13 = [
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
        new T.Vector2(1, 0),
    ]
    let roofTexture14 = [
        new T.Vector2(1, 1),
        new T.Vector2(0.5, 0),
        new T.Vector2(1, 0),
    ]
    let roofTexture15 = [
        new T.Vector2(1, 0),
        new T.Vector2(0, 0),
        new T.Vector2(1, 1),
    ]
    let roofTexture16 = [
        new T.Vector2(0.5, 0),
        new T.Vector2(0, 0),
        new T.Vector2(0.5, 1),
    ]
    let roofTexture10 = [
        new T.Vector2(0, 0),
        new T.Vector2(0.5, 0),
        new T.Vector2(0.5, 1),
    ]
    roof.faceVertexUvs[0].push(roofTexture1);
    roof.faceVertexUvs[0].push(roofTexture2);
    roof.faceVertexUvs[0].push(roofTexture3);
    roof.faceVertexUvs[0].push(roofTexture4);
    roof.faceVertexUvs[0].push(roofTexture5);
    roof.faceVertexUvs[0].push(roofTexture6);
    roof.faceVertexUvs[0].push(roofTexture7);

    roof.faceVertexUvs[0].push(roofTexture5);
    roof.faceVertexUvs[0].push(roofTexture6);
    roof.faceVertexUvs[0].push(roofTexture8);
    roof.faceVertexUvs[0].push(roofTexture9);
    roof.faceVertexUvs[0].push(roofTexture1);
    roof.faceVertexUvs[0].push(roofTexture2);

    roof.faceVertexUvs[0].push(roofTexture10);
    roof.faceVertexUvs[0].push(roofTexture11);
    roof.faceVertexUvs[0].push(roofTexture12);
    roof.faceVertexUvs[0].push(roofTexture1);
    roof.faceVertexUvs[0].push(roofTexture13);
    roof.faceVertexUvs[0].push(roofTexture11);
    roof.faceVertexUvs[0].push(roofTexture14);
    roof.faceVertexUvs[0].push(roofTexture14);
    roof.faceVertexUvs[0].push(roofTexture15);
    roof.faceVertexUvs[0].push(roofTexture1);
    roof.faceVertexUvs[0].push(roofTexture16);


    roof.computeFaceNormals();
    roof.uvsNeedUpdate = true;
    return roof
}