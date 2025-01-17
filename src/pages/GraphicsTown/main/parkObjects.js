/* jshint esversion: 6 */
// @ts-ignore
/* eslint-disable no-unused-expressions */

import * as T from 'three';
import { GrObject } from '../libs/CS559-Framework/GrObject.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

let simpleRoundaboutObCtr = 0;
// A simple merry-go-round.
/**
 * @typedef SimpleRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleRoundabout extends GrObject {
  /**
   * @param {SimpleRoundaboutProperties} params
   */
  constructor(params = {}) {
    const simpleRoundabout = new T.Group();

    const base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    const base_mat = new T.MeshStandardMaterial({
      color: '#888888',
      metalness: 0.5,
      roughness: 0.8,
    });
    const base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    simpleRoundabout.add(base);

    const platform_geom = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4);
    const platform_mat = new T.MeshStandardMaterial({
      color: 'blue',
      metalness: 0.3,
      roughness: 0.6,
    });

    const platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);
    const platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleRoundabout-${simpleRoundaboutObCtr++}`, simpleRoundabout);
    this.whole_ob = simpleRoundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    const scale = params.size ? Number(params.size) : 1;
    simpleRoundabout.scale.set(scale, scale, scale);

    this.tick = function (delta, timeOfDay) {
      this.platform.rotateY(0.005 * delta);
    };
  }
}

let roundaboutObCtr = 0;
// A colorful merry-go-round, with handles and differently-colored sections.
/**
 * @typedef ColoredRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrColoredRoundabout extends GrObject {
  /**
   * @param {ColoredRoundaboutProperties} params
   */
  constructor(params = {}) {
    const roundabout = new T.Group();

    const base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    const base_mat = new T.MeshStandardMaterial({
      color: '#888888',
      metalness: 0.5,
      roughness: 0.8,
    });
    const base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    roundabout.add(base);

    const platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);

    const section_geom = new T.CylinderGeometry(
      2,
      1.8,
      0.3,
      8,
      4,
      false,
      0,
      Math.PI / 2,
    );
    let section_mat;
    let section;

    const handle_geom = buildHandle();
    const handle_mat = new T.MeshStandardMaterial({
      color: '#999999',
      metalness: 0.8,
      roughness: 0.2,
    });
    let handle;

    // in the loop below, we add four differently-colored sections, with handles,
    // all as part of the platform group.
    const section_colors = ['red', 'blue', 'yellow', 'green'];
    for (let i = 0; i < section_colors.length; i++) {
      section_mat = new T.MeshStandardMaterial({
        color: section_colors[i],
        metalness: 0.3,
        roughness: 0.6,
      });
      section = new T.Mesh(section_geom, section_mat);
      handle = new T.Mesh(handle_geom, handle_mat);
      section.add(handle);
      handle.rotation.set(0, Math.PI / 4, 0);
      handle.translateZ(1.5);
      platform_group.add(section);
      section.rotateY((i * Math.PI) / 2);
    }

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Roundabout-${roundaboutObCtr++}`, roundabout);
    this.whole_ob = roundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    const scale = params.size ? Number(params.size) : 1;
    roundabout.scale.set(scale, scale, scale);

    this.tick = function (delta, timeOfDay) {
      this.platform.rotateY(0.005 * delta);
    };

    // This helper function defines a curve for the merry-go-round's handles,
    // then extrudes a tube along the curve to make the actual handle geometry.
    function buildHandle() {
      /** @type THREE.CurvePath */
      const handle_curve = new T.CurvePath();
      handle_curve.add(
        new T.LineCurve3(
          new T.Vector3(-0.5, 0, 0),
          new T.Vector3(-0.5, 0.8, 0),
        ),
      );
      handle_curve.add(
        new T.CubicBezierCurve3(
          new T.Vector3(-0.5, 0.8, 0),
          new T.Vector3(-0.5, 1, 0),
          new T.Vector3(0.5, 1, 0),
          new T.Vector3(0.5, 0.8, 0),
        ),
      );
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0)),
      );
      return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
    }
  }
}

let simpleSwingObCtr = 0;

// A basic, one-seat swingset.
/**
 * @typedef SimpleSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleSwing extends GrObject {
  /**
   * @param {SimpleSwingProperties} params
   */
  constructor(params = {}) {
    const simpleSwing = new T.Group();
    addPosts(simpleSwing);

    // Here, we create a "hanger" group, which the swing chains will hang from.
    // The "chains" for the simple swing are just a couple thin cylinders.
    const hanger = new T.Group();
    simpleSwing.add(hanger);
    hanger.translateY(1.8);
    const chain_geom = new T.CylinderGeometry(0.05, 0.05, 1.4);
    const chain_mat = new T.MeshStandardMaterial({
      color: '#777777',
      metalness: 0.8,
      roughness: 0.2,
    });
    const l_chain = new T.Mesh(chain_geom, chain_mat);
    const r_chain = new T.Mesh(chain_geom, chain_mat);
    hanger.add(l_chain);
    hanger.add(r_chain);
    l_chain.translateY(-0.75);
    l_chain.translateZ(0.4);
    r_chain.translateY(-0.75);
    r_chain.translateZ(-0.4);

    const seat_group = new T.Group();
    const seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
    const seat_mat = new T.MeshStandardMaterial({
      color: '#554433',
      metalness: 0.1,
      roughness: 0.6,
    });
    const seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleSwing-${simpleSwingObCtr++}`, simpleSwing);
    this.whole_ob = simpleSwing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    const scale = params.size ? Number(params.size) : 1;
    simpleSwing.scale.set(scale, scale, scale);

    this.swing_max_rotation = Math.PI / 4;
    this.swing_direction = 1;
    this.tick = function (delta, timeOfDay) {
      // if we swing too far forward or too far backward, switch directions.
      if (this.hanger.rotation.z >= this.swing_max_rotation) {
        this.swing_direction = -1;
      } else if (this.hanger.rotation.z <= -this.swing_max_rotation) {
        this.swing_direction = 1;
      }
      this.hanger.rotation.z += this.swing_direction * 0.003 * delta;
    };

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      const post_material = new T.MeshStandardMaterial({
        color: 'red',
        metalness: 0.6,
        roughness: 0.5,
      });
      const post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      const flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      const blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      const frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      const brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      const topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }
  }
}

let swingObCtr = 0;

// A more complicated, one-seat swingset.
// This one has actual chain links for its chains,
// and uses a nicer animation to give a more physically-plausible motion.
/**
 * @typedef AdvancedSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrAdvancedSwing extends GrObject {
  /**
   * @param {AdvancedSwingProperties} params
   */
  constructor(params = {}) {
    const swing = new T.Group();
    addPosts(swing);

    const hanger = new T.Group();
    swing.add(hanger);
    hanger.translateY(1.8);
    const l_chain = new T.Group();
    const r_chain = new T.Group();
    hanger.add(l_chain);
    hanger.add(r_chain);
    // after creating chain groups, call the function to add chain links.
    growChain(l_chain, 20);
    growChain(r_chain, 20);
    l_chain.translateZ(0.4);
    r_chain.translateZ(-0.4);

    const seat_group = new T.Group();
    const seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
    const seat_mat = new T.MeshStandardMaterial({
      color: '#554433',
      metalness: 0.1,
      roughness: 0.6,
    });
    const seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Swing-${swingObCtr++}`, swing);
    this.whole_ob = swing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    const scale = params.size ? Number(params.size) : 1;
    swing.scale.set(scale, scale, scale);

    this.swing_angle = 0;
    this.tick = function (delta, timeOfDay) {
      // in this animation, use the sine of the accumulated angle to set current rotation.
      // This means the swing moves faster as it reaches the bottom of a swing,
      // and faster at either end of the swing, like a pendulum should.
      this.swing_angle += 0.005 * delta;
      this.hanger.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 4;
      this.seat.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 16;
    };

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      const post_material = new T.MeshStandardMaterial({
        color: 'red',
        metalness: 0.6,
        roughness: 0.5,
      });
      const post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      const flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      const blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      const frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      const brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      const topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }

    // Helper function to add "length" number of links to a chain.
    function growChain(group, length) {
      const chain_geom = new T.TorusGeometry(0.05, 0.015);
      const chain_mat = new T.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.8,
        roughness: 0.2,
      });
      let link = new T.Mesh(chain_geom, chain_mat);
      group.add(link);
      for (let i = 0; i < length; i++) {
        const l_next = new T.Mesh(chain_geom, chain_mat);
        l_next.translateY(-0.07);
        link.add(l_next);
        l_next.rotation.set(0, Math.PI / 3, 0);
        link = l_next;
      }
    }
  }
}
let carouselObCtr = 0;

// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    const width = 5;
    const carousel = new T.Group();

    const base_geom = new T.CylinderGeometry(width, width, 1, 32);
    const base_mat = new T.MeshStandardMaterial({
      color: 'lightblue',
      metalness: 0.3,
      roughness: 0.8,
    });
    const base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    const platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    const platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32,
    );
    const platform_mat = new T.MeshStandardMaterial({
      color: 'gold',
      metalness: 0.3,
      roughness: 0.8,
    });
    const platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    const cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 5, 16);
    const cpole_mat = new T.MeshStandardMaterial({
      color: 'gold',
      metalness: 0.8,
      roughness: 0.5,
    });
    const cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    const top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3.5);

    const opole_geom = new T.CylinderGeometry(
      0.03 * width,
      0.03 * width,
      4.5,
      16,
    );
    const opole_mat = new T.MeshStandardMaterial({
      color: '#aaaaaa',
      metalness: 0.8,
      roughness: 0.5,
    });
    const poles = [];
    const loader = new OBJLoader();
    loader.load(
      require('../../../assets/Pictures/horse.obj.txt'),
      function (horse) {
        let opole;
        const num_poles = 10;

        for (let i = 0; i < num_poles; i++) {
          const group = new T.Group();
          horse.children.forEach((/** @type T.Mesh */ obj) => {
            group.add(
              new T.Mesh(
                obj.geometry,
                new T.MeshStandardMaterial({
                  color: i % 2 === 0 ? '#6a5b4d' : '#000000',
                }),
              ),
            );
          });
          group.scale.set(0.005, 0.005, 0.005);
          group.rotateY(Math.PI);
          group.name = 'horse';
          const poleMesh = new T.Mesh(opole_geom, opole_mat);
          // let horseMesh = new T.Mesh(group, horseMat);
          opole = new T.Group();
          opole.add(poleMesh);
          opole.add(group);
          platform_group.add(opole);
          opole.translateY(1.5);
          opole.rotateY((2 * i * Math.PI) / num_poles);
          opole.translateX(0.8 * width);
          poles.push({ pole: opole, horseTime: Math.random() * 3 });
        }
      },
    );
    // let horse = new T.BoxGeometry(1, 1);
    // let horseMat = new T.MeshStandardMaterial({
    //   color: '#ff0000'
    // })

    const roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    const roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(5.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel-${carouselObCtr++}`, carousel);
    this.poles = poles;
    this.whole_ob = carousel;
    this.platform = platform;
    this.time = 0;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    const scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);

    this.tick = function (step, delta, timeOfDay) {
      this.whole_ob.rotateY(0.001 * delta);
      this.time += step / 1000;
      this.poles?.forEach((pole) => {
        const oldY = pole.pole.children[0]
          ? pole.pole.children[0].position.y
          : null;
        if (oldY === null) {
          return;
        }
        // time in seconds

        pole.pole.getObjectByName('horse').position.y =
          Math.sin(this.time + pole.horseTime) * 0.5;
      });
    };
  }
}
