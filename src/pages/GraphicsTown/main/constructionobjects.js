/*jshint esversion: 6 */
// @ts-ignore

import * as T from "three";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
    /**
     * @param {CraneProperties} params
     */
    constructor(params = {}) {
        let crane = new T.Group();

        let exSettings = {
            steps: 2,
            depth: 0.5,
            bevelEnabled: false
        };

        // first, we define the base of the crane.
        // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
        // to create the shape itself.
        /**@type THREE.Shape */
        let base_curve = new T.Shape();
        base_curve.moveTo(-0.5, 0);
        base_curve.lineTo(-0.5, 2);
        base_curve.lineTo(-0.25, 2.25);
        base_curve.lineTo(-0.25, 5);
        base_curve.lineTo(-0.2, 5);
        base_curve.lineTo(-0.2, 5.5);
        base_curve.lineTo(0.2, 5.5);
        base_curve.lineTo(0.2, 5);
        base_curve.lineTo(0.25, 5);
        base_curve.lineTo(0.25, 2.25);
        base_curve.lineTo(0.5, 2);
        base_curve.lineTo(0.5, 0);
        base_curve.lineTo(-0.5, 0);
        let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
        let crane_mat = new T.MeshStandardMaterial({
            color: "yellow",
            metalness: 0.5,
            roughness: 0.7
        });
        let base = new T.Mesh(base_geom, crane_mat);
        crane.add(base);
        base.translateZ(-0.25);

        // Use a similar process to create the cross-arm.
        // Note, we create a group for the arm, and move it to the proper position.
        // This ensures rotations will behave nicely,
        // and we just have that one point to work with for animation/sliders.
        let arm_group = new T.Group();
        crane.add(arm_group);
        arm_group.translateY(4.5);
        let arm_curve = new T.Shape();
        arm_curve.moveTo(-1.5, 0);
        arm_curve.lineTo(-1.5, 0.25);
        arm_curve.lineTo(-0.5, 0.5);
        arm_curve.lineTo(4, 0.4);
        arm_curve.lineTo(4, 0);
        arm_curve.lineTo(-1.5, 0);
        let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
        let arm = new T.Mesh(arm_geom, crane_mat);
        arm_group.add(arm);
        arm.translateZ(-0.25);

        // Finally, add the hanging "wire" for the crane arm,
        // which is what carries materials in a real crane.
        // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
        let wire_group = new T.Group();
        arm_group.add(wire_group);
        wire_group.translateX(3);
        let wire_curve = new T.Shape();
        wire_curve.moveTo(-0.25, 0);
        wire_curve.lineTo(-0.25, -0.25);
        wire_curve.lineTo(-0.05, -0.3);
        wire_curve.lineTo(-0.05, -3);
        wire_curve.lineTo(0.05, -3);
        wire_curve.lineTo(0.05, -0.3);
        wire_curve.lineTo(0.25, -0.25);
        wire_curve.lineTo(0.25, 0);
        wire_curve.lineTo(-0.25, 0);
        let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
        let wire_mat = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.6,
            roughness: 0.3
        });
        let wire = new T.Mesh(wire_geom, wire_mat);
        wire_group.add(wire);
        wire.translateZ(-0.25);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        // This is also where we define parameters for UI sliders.
        // These have format "name," "min", "max", "starting value."
        // Sliders are standardized to have 30 "steps" per slider,
        // so if your starting value does not fall on one of the 30 steps,
        // the starting value in the UI may be slightly different from the starting value you gave.
        super(`Crane-${craneObCtr++}`, crane, [
            ["x", -4, 4, 0],
            ["z", -4, 4, 0],
            ["theta", 0, 360, 0],
            ["wire", 1, 3.5, 2],
            ["arm rotation", 0, 360, 0]
        ]);
        // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
        // This allows us to modify transforms as part of the update function.
        this.whole_ob = crane;
        this.arm = arm_group;
        this.wire = wire_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        crane.scale.set(scale, scale, scale);
    }

    // Wire up the wire position and arm rotation to match parameters,
    // given in the call to "super" above.
    update(paramValues) {
        this.whole_ob.position.x = paramValues[0];
        this.whole_ob.position.z = paramValues[1];
        this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
        this.wire.position.x = paramValues[3];
        this.arm.rotation.y = degreesToRadians(paramValues[4]);
    }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
    /**
     * @param {ExcavatorProperties} params
     */
    constructor(params = {}) {
        let excavator = new T.Group();

        let exSettings = {
            steps: 2,
            depth: 0.4,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        };

        /**@type {THREE.Shape} */
        let base_curve = new T.Shape();
        base_curve.moveTo(-1, 0);
        base_curve.lineTo(-1.2, 0.2);
        base_curve.lineTo(-1.2, 0.4);
        base_curve.lineTo(-1, 0.6);
        base_curve.lineTo(1, 0.6);
        base_curve.lineTo(1.2, 0.4);
        base_curve.lineTo(1.2, 0.2);
        base_curve.lineTo(1, 0);
        base_curve.lineTo(-1, 0);
        let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
        let excavator_mat = new T.MeshStandardMaterial({
            color: "yellow",
            metalness: 0.5,
            roughness: 0.7
        });
        let base = new T.Mesh(base_geom, excavator_mat);
        excavator.add(base);
        base.translateZ(-0.2);

        // We'll add the "pedestal" piece for the cab of the forklift to sit on.
        // It can be considered a part of the treads, to some extent,
        // so it doesn't need a group of its own.
        let pedestal_curve = new T.Shape();
        pedestal_curve.moveTo(-0.35, 0);
        pedestal_curve.lineTo(-0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0);
        pedestal_curve.lineTo(-0.35, 0);
        let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
        let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
        excavator.add(pedestal);
        pedestal.translateY(0.6);
        pedestal.translateZ(-0.2);

        // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
        let cab_group = new T.Group();
        excavator.add(cab_group);
        cab_group.translateY(0.7);
        let cab_curve = new T.Shape();
        cab_curve.moveTo(-1, 0);
        cab_curve.lineTo(1, 0);
        cab_curve.lineTo(1.2, 0.35);
        cab_curve.lineTo(1, 0.75);
        cab_curve.lineTo(0.25, 0.75);
        cab_curve.lineTo(0, 1.5);
        cab_curve.lineTo(-0.8, 1.5);
        cab_curve.lineTo(-1, 1.2);
        cab_curve.lineTo(-1, 0);
        let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
        let cab = new T.Mesh(cab_geom, excavator_mat);
        cab_group.add(cab);
        cab.translateZ(-0.2);

        // Next up is the first part of the bucket arm.
        // In general, each piece is just a series of line segments,
        // plus a bit of extra to get the geometry built and put into a group.
        // We always treat the group as the "pivot point" around which the object should rotate.
        // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
        // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
        // The remaining few pieces are very similar to the arm piece.
        let arm_group = new T.Group();
        cab_group.add(arm_group);
        arm_group.position.set(-0.8, 0.5, 0);
        let arm_curve = new T.Shape();
        arm_curve.moveTo(-2.25, 0);
        arm_curve.lineTo(-2.35, 0.15);
        arm_curve.lineTo(-1, 0.5);
        arm_curve.lineTo(0, 0.25);
        arm_curve.lineTo(-0.2, 0);
        arm_curve.lineTo(-1, 0.3);
        arm_curve.lineTo(-2.25, 0);
        let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
        let arm_mat = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.6,
            roughness: 0.3
        });
        let arm = new T.Mesh(arm_geom, arm_mat);
        arm_group.add(arm);
        arm.translateZ(-0.2);

        let forearm_group = new T.Group();
        arm_group.add(forearm_group);
        forearm_group.position.set(-2.1, 0, 0);
        let forearm_curve = new T.Shape();
        forearm_curve.moveTo(-1.5, 0);
        forearm_curve.lineTo(-1.5, 0.1);
        forearm_curve.lineTo(0, 0.15);
        forearm_curve.lineTo(0.15, 0);
        forearm_curve.lineTo(-1.5, 0);
        let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
        let forearm = new T.Mesh(forearm_geom, arm_mat);
        forearm_group.add(forearm);
        forearm.translateZ(-0.2);

        let bucket_group = new T.Group();
        forearm_group.add(bucket_group);
        bucket_group.position.set(-1.4, 0, 0);
        let bucket_curve = new T.Shape();
        bucket_curve.moveTo(-0.25, -0.9);
        bucket_curve.lineTo(-0.5, -0.5);
        bucket_curve.lineTo(-0.45, -0.3);
        bucket_curve.lineTo(-0.3, -0.2);
        bucket_curve.lineTo(-0.15, 0);
        bucket_curve.lineTo(0.1, 0);
        bucket_curve.lineTo(0.05, -0.2);
        bucket_curve.lineTo(0.5, -0.7);
        bucket_curve.lineTo(-0.25, -0.9);
        let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
        let bucket = new T.Mesh(bucket_geom, arm_mat);
        bucket_group.add(bucket);
        bucket.translateZ(-0.2);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        // The parameters for sliders are also defined here.
        super(`Excavator-${excavatorObCtr++}`, excavator, [
            ["x", -10, 10, 0],
            ["z", -10, 10, 0],
            ["theta", 0, 360, 0],
            ["spin", 0, 360, 0],
            ["arm rotate", 0, 50, 45],
            ["forearm rotate", 0, 90, 45],
            ["bucket rotate", -90, 45, 0]
        ]);
        // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
        // We also save the groups of each object that may be manipulated by the UI.
        this.whole_ob = excavator;
        this.cab = cab_group;
        this.arm = arm_group;
        this.forearm = forearm_group;
        this.bucket = bucket_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        excavator.scale.set(scale, scale, scale);
    }

    // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
    // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
    // while maintaining a nice 0-90 range for the slider itself.
    update(paramValues) {
        this.whole_ob.position.x = paramValues[0];
        this.whole_ob.position.z = paramValues[1];
        this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
        this.cab.rotation.y = degreesToRadians(paramValues[3]);
        this.arm.rotation.z = degreesToRadians(-paramValues[4]);
        this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
        this.bucket.rotation.z = degreesToRadians(paramValues[6]);
    }
}

let forkliftObCtr = 0;
// A forklift
/**
 * @typedef ForkLiftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrForkLift extends GrObject {
    /**
     * @param {ForkLiftProperties} params
     */
    constructor(params = {}) {
        let forklift = new T.Group();

        let exSettings = {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        };

        // As with the crane, we define the base (treads) of the excavator.
        // We draw a line, then extrude the line with ExtrudeGeometry,
        // to get the "cutout" style object.
        // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
        // This makes rotation about the y-axis work nicely
        // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
        //  rather than an axis through the center of the piece).
        /**@type THREE.Shape */
        let base_curve = new T.Shape();
        base_curve.moveTo(-1, 0);
        base_curve.arc(-1.2, 0.4, 0.4, 0, 2 * Math.PI, false);
        let base_geom = new T.ExtrudeGeometry(base_curve, {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        let excavator_mat = new T.MeshStandardMaterial({
            color: "#dddddd",
            metalness: 0.5,
            roughness: 0.7
        });
        let tireMaterial = new T.MeshStandardMaterial({ color: '#0f0f0f' })
        let tire1 = new T.Mesh(base_geom, tireMaterial);
        let tire2 = new T.Mesh(base_geom, tireMaterial);
        let tire3 = new T.Mesh(base_geom, tireMaterial);
        let tire4 = new T.Mesh(base_geom, tireMaterial);
        let base = new T.Group();
        tire1.position.set(1.2, 0, 0.8);
        tire2.position.set(1.2, 0, 0);
        tire3.position.set(2.5, 0, 0.8);
        tire4.position.set(2.5, 0, 0);
        base.add(tire1);
        base.add(tire2);
        base.add(tire3);
        base.add(tire4);
        forklift.add(base);
        base.translateZ(-0.2);

        // We'll add the "pedestal" piece for the cab of the excavator to sit on.
        // It can be considered a part of the treads, to some extent,
        // so it doesn't need a group of its own.
        let pedestal_curve = new T.Shape();
        pedestal_curve.moveTo(-0.35, 0);
        pedestal_curve.lineTo(-0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0);
        pedestal_curve.lineTo(-0.35, 0);
        let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
        let pedestal = new T.Mesh(pedestal_geom, new T.MeshStandardMaterial({ color: '#050505' }));
        // dumptruck.add(pedestal);
        pedestal.translateY(0.6);
        pedestal.translateZ(-0.2);

        // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
        let cab_group = new T.Group();
        forklift.add(cab_group);
        cab_group.translateY(0.7);
        let cab_curve = new T.Shape();
        cab_curve.moveTo(-1.5, 0);
        cab_curve.lineTo(1, 0);
        cab_curve.lineTo(1, 0.45);
        cab_curve.lineTo(1, 0.45);
        cab_curve.lineTo(1, 1.5);
        cab_curve.lineTo(-1.3, 1.5);
        cab_curve.lineTo(-1.5, 1.2);
        cab_curve.lineTo(-1.5, 0);
        let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
        let cab = new T.Mesh(cab_geom, excavator_mat);
        cab_group.add(cab);
        cab.translateZ(-0.2);

        let armGroup = new T.Group();
        cab_group.add(armGroup);
        armGroup.position.set(-0.8, 0.5, 0);
        let innerRail = new T.Shape();
        innerRail.moveTo(-0.5, 0);
        innerRail.lineTo(-0.5, 1);
        innerRail.lineTo(-0.5, -1);
        innerRail.lineTo(-0.6, -1);
        innerRail.lineTo(-0.6, 1)
        innerRail.lineTo(-0.5, 1);

        let outerRail = new T.Shape();
        outerRail.moveTo(-0.6, 0);
        outerRail.lineTo(-0.6, 1);
        outerRail.lineTo(-0.6, -1);
        outerRail.lineTo(-0.7, -1);
        outerRail.lineTo(-0.7, 1)
        outerRail.lineTo(-0.6, 1);

        let arm = new T.Shape();
        arm.moveTo(-.7, 0);
        arm.lineTo(-1.7, 0);
        arm.lineTo(-1.7, 0.01);
        arm.lineTo(-.7, 0.01)
        let armSettings = {
            steps: 2,
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        }
        let leftArm = new T.ExtrudeGeometry(arm, armSettings);
        let rightArm = new T.ExtrudeGeometry(arm, armSettings);
        let innerRackGeom = new T.ExtrudeGeometry(innerRail, exSettings);
        let outerRackGeom = new T.ExtrudeGeometry(outerRail, exSettings);
        let rackMat = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.6,
            roughness: 0.3
        });
        let innerRack = new T.Mesh(innerRackGeom, rackMat);
        let outerRack = new T.Mesh(outerRackGeom, rackMat);
        let leftArmMesh = new T.Mesh(leftArm, rackMat);
        let rightArmMesh = new T.Mesh(rightArm, rackMat);
        let armExtensionGroup = new T.Group();
        armExtensionGroup.add(leftArmMesh);
        armExtensionGroup.add(rightArmMesh);

        leftArmMesh.position.z = 1 - armSettings.depth;
        // leftArmMesh.position.z = 0.4;
        // rightArmMesh.position.z = -.1
        leftArmMesh.position.y = -1;
        rightArmMesh.position.y = -1;
        let outerRackGroup = new T.Group();
        outerRackGroup.add(outerRack);
        outerRackGroup.add(armExtensionGroup);
        armGroup.add(innerRack);
        armGroup.add(outerRackGroup);
        innerRack.translateZ(-0.2);
        innerRack.translateX(-0.4);
        outerRackGroup.translateZ(-0.2);
        outerRackGroup.translateX(-0.4);

        super(`ForkLift-${forkliftObCtr++}`, forklift, [
            ["x", -10, 10, 0],
            ["z", -10, 10, 0],
            ["theta", 0, 360, 0],
            ["fork distance", 0.7, 0.9, 0.9],
            ["outerRack", 0, 2, 0],
            ["arms", 0, 1, 0],
            ["arm tilt", 0, 15, 0]
        ]);

        this.whole_ob = forklift;
        this.cab = cab_group;
        this.armGroup = armGroup;
        this.outerRack = outerRackGroup;
        this.armExtensions = armExtensionGroup;
        this.leftArm = leftArmMesh;
        this.rightArm = rightArmMesh;
        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        forklift.scale.set(scale, scale, scale);
    }

    update(paramValues) {
        this.whole_ob.position.x = paramValues[0];
        this.whole_ob.position.z = paramValues[1];
        this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
        // this.cab.rotation.y = degreesToRadians(paramValues[3]);
        this.leftArm.position.z = paramValues[3];
        this.rightArm.position.z = 0.9 - paramValues[3];
        this.outerRack.position.y = paramValues[4];
        this.armExtensions.position.y = paramValues[5];
        this.armGroup.rotation.z = -degreesToRadians(paramValues[6]);
    }
}

let dumptruckObCtr = 0;
// A forklift
/**
 * @typedef DumpTruckProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrDumpTruck extends GrObject {
    /**
     * @param {DumpTruckProperties} params
     */
    constructor(params = {}) {
        let dumptruck = new T.Group();

        let exSettings = {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        };

        // As with the crane, we define the base (treads) of the excavator.
        // We draw a line, then extrude the line with ExtrudeGeometry,
        // to get the "cutout" style object.
        // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
        // This makes rotation about the y-axis work nicely
        // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
        //  rather than an axis through the center of the piece).
        /**@type THREE.Shape */
        let base_curve = new T.Shape();
        base_curve.moveTo(-1, 0);
        base_curve.arc(-1.2, 0.4, 0.4, 0, 2 * Math.PI, false);
        let base_geom = new T.ExtrudeGeometry(base_curve, {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        let excavator_mat = new T.MeshStandardMaterial({
            color: "#dddddd",
            metalness: 0.5,
            roughness: 0.7
        });
        let tireMaterial = new T.MeshStandardMaterial({ color: '#0f0f0f' })
        let tire1 = new T.Mesh(base_geom, tireMaterial);
        let tire2 = new T.Mesh(base_geom, tireMaterial);
        let tire3 = new T.Mesh(base_geom, tireMaterial);
        let tire4 = new T.Mesh(base_geom, tireMaterial);
        let base = new T.Group();
        tire1.position.set(1.2, 0, 0.8);
        tire2.position.set(1.2, 0, 0);
        tire3.position.set(3, 0, 0.8);
        tire4.position.set(3, 0, 0);
        base.add(tire1);
        base.add(tire2);
        base.add(tire3);
        base.add(tire4);
        dumptruck.add(base);
        base.translateZ(-0.2);

        // We'll add the "pedestal" piece for the cab of the excavator to sit on.
        // It can be considered a part of the treads, to some extent,
        // so it doesn't need a group of its own.
        let pedestal_curve = new T.Shape();
        pedestal_curve.moveTo(-0.35, 0);
        pedestal_curve.lineTo(-0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0.25);
        pedestal_curve.lineTo(0.35, 0);
        pedestal_curve.lineTo(-0.35, 0);
        let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
        let pedestal = new T.Mesh(pedestal_geom, new T.MeshStandardMaterial({ color: '#050505' }));
        // dumptruck.add(pedestal);
        pedestal.translateY(0.6);
        pedestal.translateZ(-0.2);

        // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
        let cab_group = new T.Group();
        dumptruck.add(cab_group);
        cab_group.translateY(0.7);
        let cab_curve = new T.Shape();
        cab_curve.moveTo(-1.5, 0);
        cab_curve.lineTo(1.5, 0);
        cab_curve.lineTo(1.7, 0.35);
        cab_curve.lineTo(1.5, 0.45);
        cab_curve.lineTo(-.25, 0.45);
        cab_curve.lineTo(-.25, 1.5);
        cab_curve.lineTo(-1.3, 1.5);
        cab_curve.lineTo(-1.5, 1.2);
        cab_curve.lineTo(-1.5, 0);
        let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
        let cab = new T.Mesh(cab_geom, excavator_mat);
        cab_group.add(cab);
        cab.translateZ(-0.2);

        let bucketGroup = new T.Group();
        dumptruck.add(bucketGroup);
        bucketGroup.translateY(1.25);
        bucketGroup.translateZ(-0.2);
        let bucket = new T.Shape();
        bucket.moveTo(0, 0);
        bucket.lineTo(1.7, 0);
        bucket.lineTo(1.7, 0.1);
        bucket.lineTo(0, 0.1);
        bucket.lineTo(0, 0);

        let sideBucket = new T.Shape();
        sideBucket.moveTo(0, 0);
        sideBucket.moveTo(0, 0);
        sideBucket.lineTo(1.3, 0);
        sideBucket.lineTo(1.3, 0.1);
        sideBucket.lineTo(0, 0.1);
        sideBucket.lineTo(0, 0);
        let bucketGeom = new T.ExtrudeGeometry(bucket, {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        let sideBucketGeom = new T.ExtrudeGeometry(sideBucket, {
                steps: 2,
                depth: 1,
                bevelEnabled: true,
                bevelThickness: 0.2,
                bevelSize: 0.1,
                bevelSegments: 2
            })
            // let outerRackGeom = new T.ExtrudeGeometry(outerRail, exSettings);
        let rackMat = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.6,
            roughness: 0.3
        });
        let bottomBucketMesh = new T.Mesh(bucketGeom, rackMat);
        let rightBucketMesh = new T.Mesh(bucketGeom, rackMat);
        let leftBucketMesh = new T.Mesh(bucketGeom, rackMat);
        let nearWallMesh = new T.Mesh(sideBucketGeom, rackMat);
        rightBucketMesh.rotation.x = Math.PI * 3 / 2;
        leftBucketMesh.rotation.x = Math.PI * 3 / 2;
        leftBucketMesh.position.z = 1.2;
        nearWallMesh.rotation.x = Math.PI * 3 / 2;
        nearWallMesh.rotation.z = Math.PI / 2;
        nearWallMesh.position.z = 1.2
        bucketGroup.add(bottomBucketMesh);
        bucketGroup.add(rightBucketMesh)
        bucketGroup.add(leftBucketMesh);
        bucketGroup.add(nearWallMesh);
        super(`DumpTruck-${dumptruckObCtr++}`, dumptruck, [
            ["x", -10, 10, 0],
            ["z", -10, 10, 0],
            ["theta", 0, 360, 0],
            ["dump bucket", 0, 45, 0]
        ]);

        this.whole_ob = dumptruck;
        this.cab = cab_group;
        this.bucketGroup = bucketGroup;
        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        dumptruck.scale.set(scale, scale, scale);
    }

    update(paramValues) {
        this.whole_ob.position.x = paramValues[0];
        this.whole_ob.position.z = paramValues[1];
        this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
        this.bucketGroup.rotation.z = -degreesToRadians(paramValues[3]);
        this.bucketGroup.position.y = 1.45 + (paramValues[3] / 45)
    }
}