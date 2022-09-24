/*jshint esversion: 6 */
// @ts-ignore

import * as T from "three";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { BoxGeometry, MeshStandardMaterial } from "three";
export class Car extends GrObject {
    constructor(color, roadPoints) {
        //
        let bodyMaterialMain = new T.MeshStandardMaterial({
            color: color || '#8B0000',
            vertexColors: T.FaceColors
        });
        let body = new BoxGeometry(3, 0.5, 1.5, 10, 10, 0);
        let tireShape = new T.Shape();
        tireShape.moveTo(-1, 0);
        tireShape.arc(-1, 0.4, 0.4, 0, 2 * Math.PI, false);
        let tire = new T.ExtrudeGeometry(tireShape, {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        let tireMaterial = new T.MeshStandardMaterial({ color: '#444444' })
        let tire1 = new T.Mesh(tire, tireMaterial);
        let tire2 = new T.Mesh(tire, tireMaterial);
        let tire3 = new T.Mesh(tire, tireMaterial);
        let tire4 = new T.Mesh(tire, tireMaterial);

        let bodyMesh = new T.Mesh(body, bodyMaterialMain)
        tire1.position.set(1, 0, 1.5);
        tire2.position.set(1, 0, 0);
        tire3.position.set(3, 0, 1.5);
        tire4.position.set(3, 0, 0);

        let hull = buildCarHull(1, 3.05, 1.5);
        let windows = addWindows(1, 3.07, 1.55)
        let hullMesh = new T.Mesh(hull, bodyMaterialMain);
        let windowMesh = new T.Mesh(windows, new MeshStandardMaterial({ color: '#555555' }));
        hullMesh.translateY(1.1);
        hullMesh.translateZ(0.85);
        windowMesh.translateY(1.1);
        windowMesh.translateZ(0.85);
        let group = new T.Group();
        bodyMesh.translateY(0.85);
        bodyMesh.translateZ(0.85);
        group.add(tire1);
        group.add(tire2);
        group.add(tire3);
        group.add(tire4);
        group.add(bodyMesh);
        group.add(hullMesh);
        group.add(windowMesh);
        // group.add(mesh1);

        super("car", group);
        let rideOn = new T.Object3D();
        rideOn.translateY(0.5);
        rideOn.rotateY(Math.PI / 2)
        this.objects[0].add(rideOn)
        this.rideable = rideOn
        this.roadPoints = roadPoints;
        this.color = color;
    }
    tick() {
        let path = new T.SplineCurve(this.roadPoints);
        var time = 0;
        if (this.color) {
            time = (performance.now() / 50000) + 0.5;
        } else {
            time = performance.now() / 50000;
        }
        let point = path.getPoint(time % 1);

        let rotation = calculateRotation({
            x: this.objects[0].position.x - point.x,
            y: this.objects[0].position.z - point.y
        })
        this.objects[0].position.set(point.x, 0, point.y);
        this.objects[0].rotation.set(0, -rotation - Math.PI, 0);
    }
}
/**
 * @param {{x: number, y: number}} positionChange 
 */
function calculateRotation(positionChange) {
    let rotation = 0;
    if (positionChange.x == 0 && positionChange.y == 0) {
        return 0
    }

    //quadrient 1
    if (positionChange.x > 0 && positionChange.y <= 0) {
        rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
        rotation = -rotation;
    }
    //quadrient 2
    else if (positionChange.x <= 0 && positionChange.y < 0) {
        rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
        rotation = -(Math.PI / 2) - rotation

    }
    //quadrient 3 
    else if (positionChange.x < 0 && positionChange.y >= 0) {
        rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.x) / Math.abs(positionChange.y));
        rotation = -Math.PI - rotation;
    }
    //quadrient 4 
    else if (positionChange.x >= 0 && positionChange.y > 0) {
        rotation = (Math.PI / 2) - Math.atan(Math.abs(positionChange.y) / Math.abs(positionChange.x));
        rotation = -(3 * Math.PI / 2) - rotation;
    }
    return rotation;
}
/**
 * 
 * @param {Number} height 
 * @param {Number} length 
 * @param {Number} width 
 * @returns {T.Geometry}
 */
function buildCarHull(height, length, width) {
    let hull = new T.Geometry();

    //bottom right back 0
    hull.vertices.push(new T.Vector3(-length / 2, 0, width / 2));
    //bottom left back 1
    hull.vertices.push(new T.Vector3(-length / 2, 0, -width / 2));
    //bottom right front 2
    hull.vertices.push(new T.Vector3(length / 2, 0, width / 2));
    //bottom left front 3
    hull.vertices.push(new T.Vector3(length / 2, 0, -width / 2));

    //hood left 4
    hull.vertices.push(new T.Vector3(length / 3, height / 3, -width / 2));
    //hood right 5
    hull.vertices.push(new T.Vector3(length / 3, height / 3, width / 2));

    //top right back 6
    hull.vertices.push(new T.Vector3(-length / 4, height, width / 2));
    //top left back 7
    hull.vertices.push(new T.Vector3(-length / 4, height, -width / 2));
    //top right front 8
    hull.vertices.push(new T.Vector3(length / 4, height, width / 2));
    //top left front 9
    hull.vertices.push(new T.Vector3(length / 4, height, -width / 2));

    let hood1 = new T.Face3(2, 3, 4);
    let hood2 = new T.Face3(4, 5, 2);
    let frontWindow1 = new T.Face3(4, 9, 8);
    let frontWindow2 = new T.Face3(8, 5, 4);
    let roof1 = new T.Face3(8, 9, 6);
    let roof2 = new T.Face3(9, 7, 6);
    let left1 = new T.Face3(7, 9, 4);
    let left2 = new T.Face3(4, 1, 7);
    let left3 = new T.Face3(3, 1, 4);
    let right1 = new T.Face3(5, 8, 6);
    let right2 = new T.Face3(6, 0, 5);
    let right3 = new T.Face3(5, 0, 2);
    let trunk1 = new T.Face3(1, 0, 6);
    let trunk2 = new T.Face3(6, 7, 1);

    hull.faces.push(hood1);
    hull.faces.push(hood2);
    hull.faces.push(frontWindow1);
    hull.faces.push(frontWindow2);
    hull.faces.push(roof1);
    hull.faces.push(roof2);
    hull.faces.push(left1);
    hull.faces.push(left2);
    hull.faces.push(left3);
    hull.faces.push(right1);
    hull.faces.push(right2);
    hull.faces.push(right3);
    hull.faces.push(trunk1);
    hull.faces.push(trunk2);
    // hull.faces.push()
    hull.computeFaceNormals();
    hull.uvsNeedUpdate = true;
    return hull;


}
/**
 * @param {Number} height 
 * @param {Number} width 
 * @param {Number} length 
 * @returns {T.Geometry}
 */
function addWindows(height, length, width) {
    let hull = new T.Geometry
    let offset = 0.001
        //top right back 0
    hull.vertices.push(new T.Vector3(-length / 5, height, (width + offset) / 2));
    //top right front 1
    hull.vertices.push(new T.Vector3(length / 5, height, (width + offset) / 2));
    //bottom right back 2
    hull.vertices.push(new T.Vector3(-length / 5, height / 4, (width + offset) / 2));
    //bottom right front 3
    hull.vertices.push(new T.Vector3(length / 5, height / 4, (width + offset) / 2));

    //top left back 4
    hull.vertices.push(new T.Vector3(-length / 5, height, -(width + offset) / 2));
    //top left front 5
    hull.vertices.push(new T.Vector3(length / 5, height, -(width + offset) / 2));
    //bottom left back 6
    hull.vertices.push(new T.Vector3(-length / 5, height / 4, -(width + offset) / 2));
    //bottom left front 7
    hull.vertices.push(new T.Vector3(length / 5, height / 4, -(width + offset) / 2));

    //top right front 8
    hull.vertices.push(new T.Vector3((length + offset) / 4, height, width / 2));
    //top left front 9
    hull.vertices.push(new T.Vector3((length + offset) / 4, height, -width / 2));
    //hood left 10
    hull.vertices.push(new T.Vector3((length + offset) / 3, height / 3, -width / 2));
    //hood right 11
    hull.vertices.push(new T.Vector3((length + offset) / 3, height / 3, width / 2));

    //bottom right back 12
    hull.vertices.push(new T.Vector3(-((length + offset) / 2) + (height * .19), height / 4, width / 2));
    //bottom left back 13
    hull.vertices.push(new T.Vector3(-((length + offset) / 2) + (height * .19), height / 4, -width / 2));
    //top right back 14
    hull.vertices.push(new T.Vector3(-(length + offset) / 4, height, width / 2));
    //top left back 15
    hull.vertices.push(new T.Vector3(-(length + offset) / 4, height, -width / 2));
    hull.faces.push(new T.Face3(1, 0, 3));
    hull.faces.push(new T.Face3(0, 2, 3));
    hull.faces.push(new T.Face3(7, 4, 5));
    hull.faces.push(new T.Face3(7, 6, 4));
    hull.faces.push(new T.Face3(10, 9, 8));
    hull.faces.push(new T.Face3(8, 11, 10));
    hull.faces.push(new T.Face3(13, 12, 14));
    hull.faces.push(new T.Face3(14, 15, 13));

    hull.computeFaceNormals();
    hull.uvsNeedUpdate = true;
    return hull
}