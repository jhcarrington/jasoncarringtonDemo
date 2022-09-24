import * as T from "three";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
/**
 * @param {Number} scale
 */
export class helicopter extends GrObject {
    constructor(scale) {

        let copter = new T.Group();
        super("heli", copter);

        let rideOn = new T.Object3D();
        rideOn.translateY(1);
        rideOn.rotateZ(-Math.PI / 2)
        rideOn.rotateY(Math.PI / 2)
        rideOn.name = "rideOn";
        copter.add(rideOn);
        this.rideable = rideOn
        this.bodyMaterial = new T.MeshStandardMaterial({ color: "#808080" });
        let body = this.buildBody(scale);
        let tail = this.buildTail(scale);
        let rotor = this.buildrotor(new T.MeshStandardMaterial({ color: "#000000" }), scale);
        rotor.rotation.set(0, 0, Math.PI / 2);
        rotor.name = "rotor";
        tail.name = "tail";
        rotor.position.set(scale, 0, 0);
        tail.position.set(0, scale, 0);
        copter.add(body);
        copter.add(tail);
        copter.add(rotor);

        copter.rotation.set(0, Math.PI, Math.PI / 2);

        copter.castShadow = true;
    }
    tick() {
            let theta = performance.now() / 1000;
            let x = 3 * Math.cos(theta);
            let z = 3 * Math.sin(theta);

            let rotor = this.objects[0].children.find((obj) => obj.name == "rotor");

            let tailRotor = this.objects[0].children.find((obj) => obj.name == "tail").children.find((obj) => obj.name == "rotor");
            rotor.rotation.set(performance.now() / 250, rotor.rotation.y, rotor.rotation.z);
            tailRotor.rotation.set(tailRotor.rotation.x, performance.now() / 250, tailRotor.rotation.z);

            //set the rotation of the copter
            let rotation = this.calculateRotation({ x: this.objects[0].position.x - x, y: this.objects[0].position.z - z });
            this.objects[0].rotation.set(this.objects[0].rotation.x, Math.PI - rotation, this.objects[0].rotation.z);

        }
        /**
         * 
         * @param {{x: number, y: number}} positionChange 
         */
    calculateRotation(positionChange) {
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
         * @returns {T.Group}
         */
    buildBody(scale) {
            let body = new T.SphereBufferGeometry(scale);
            let bodyMesh = new T.Mesh(body, this.bodyMaterial);

            let bodyGroup = new T.Group();
            bodyGroup.add(bodyMesh);
            return bodyGroup;
        }
        /**
         * @returns {T.Group}
         */
    buildTail(scale) {

            let tail = new T.CylinderBufferGeometry(scale / 4, scale, scale * 2);
            let tailCap = new T.CylinderGeometry(scale / 4, scale / 4, scale);
            let tailmesh = new T.Mesh(tail, this.bodyMaterial);
            let tailCapMesh = new T.Mesh(tailCap, this.bodyMaterial);
            let tailCapRound = new T.SphereBufferGeometry(scale / 4);
            let tailCapRoundMesh = new T.Mesh(tailCapRound, this.bodyMaterial);
            let stem = new T.CylinderBufferGeometry(scale / 4, scale / 4, scale);
            let stemMesh = new T.Mesh(stem, this.bodyMaterial);
            stemMesh.position.set(scale / 2, scale * 2, 0);
            stemMesh.rotation.set(0, 0, Math.PI / 2);
            tailCapRoundMesh.position.set(0, scale * 2, 0);
            tailCapMesh.position.set(0, scale * 1.5, 0);

            let rotor = this.buildrotor(new T.MeshStandardMaterial({ color: "#000000" }), scale);
            rotor.scale.set(0.5, 0.5, 0.5);
            rotor.rotation.set(Math.PI / 2, 0, 0)
            rotor.position.set(scale / 2, scale * 2, -scale / 5);
            rotor.name = "rotor";
            let tailGroup = new T.Group();
            tailGroup.add(tailmesh);
            tailGroup.add(tailCapMesh);
            tailGroup.add(stemMesh);
            tailGroup.add(tailCapRoundMesh);
            tailGroup.add(rotor);
            return tailGroup;
        }
        /**
         * @param {T.MeshStandardMaterial} material
         * @param {Number} scale
         * @returns {T.Group}
         */
    buildrotor(material, scale) {
        /**
         * @returns {T.Mesh}
         */
        function buildBlade() {
            let blade = new T.CylinderBufferGeometry(scale / 10, scale / 10, scale * 2);
            let bladeMesh = new T.Mesh(blade, material);
            return bladeMesh;
        }
        let stem = new T.CylinderBufferGeometry(scale / 5, scale / 5, scale);
        let rotorHolder = new T.SphereBufferGeometry(scale / 5, scale / 5);
        let rotorHolderMesh = new T.Mesh(rotorHolder, material);
        //build propeller
        let propellerGroup = new T.Group();
        propellerGroup.add(rotorHolderMesh);
        let blade1 = buildBlade();
        let blade2 = buildBlade();
        let blade3 = buildBlade();
        let blade4 = buildBlade();
        blade1.rotation.set(0, 0, Math.PI / 2);
        blade1.position.set(scale / 2, 0, 0);
        blade2.position.set(0, -scale / 2, 0);
        blade3.rotation.set(0, 0, Math.PI / 2);
        blade3.position.set(-scale / 2, 0, 0);
        blade4.position.set(0, scale / 2, 0);
        propellerGroup.add(blade1);
        propellerGroup.add(blade2);
        propellerGroup.add(blade3);
        propellerGroup.add(blade4);
        //done build propeller
        propellerGroup.position.set(0, -scale / 2, 0);
        propellerGroup.rotation.set(Math.PI / 2, 0, 0);
        let stemMesh = new T.Mesh(stem, material);
        let rotorGroup = new T.Group();
        rotorGroup.add(propellerGroup);
        rotorGroup.add(stemMesh);
        return rotorGroup;
    }
}