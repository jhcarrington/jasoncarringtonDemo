import React, { Component } from 'react';
import CardItem from '../../components/CardItem';
import { Routes } from '../../Types';
import './styles.css';

export default class Main extends Component<{}, {}> {
    routeChange: any;
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    render() {
        return (
            <div>
                <hr className='hrProjects' />
                <div className="card-columns cols-2">
                    <CardItem
                        title={'TASC'}
                        screen={Routes.TASC_MPX_DEV}
                        body={<div>Full stack, Software Engineering internship
                             <lo style={{ textAlign: 'left' }}>
                                <li>
                                    Front End: Angular
                                </li>
                                <li>
                                    Back End: AWS Serverless
                                </li>
                            </lo>
                        </div>} />
                    <CardItem
                        title={'Uline'}
                        screen={Routes.ULINE}
                        body={<div>Windows Systems Engineer Internship</div>} />
                    <CardItem
                        title={'Graphics Town'}
                        screen={Routes.GRAPHICS}
                        body={<div>Developed an interactive animated world</div>} />
                    <CardItem
                        title={'Smilemail'}
                        screen={Routes.SMILEMAIL}
                        body={
                            <div>
                                Worked with web developers to create a react native android/IOS ecommerce app called Smilemail.
                        </div>} />
                    <CardItem screen={Routes.DATAMATCH} title={'Datamatch'} body={
                        <div>Lead app developer for DataMatch student org 2019.
                        Led a team in designing, programming, and troubleshooting an IOS app.
                        Successfully communicated user information between front and back end.
                        Produced an easy to use user interface.</div>
                    } />
                    <CardItem
                        title={'Mosaic'}
                        screen={Routes.MOSAIC}
                        body={
                            <div>
                                Worked with a web team to develop a social media app for local artists.
                        </div>} />

                    <div className="card" id="card">
                        <div className="card-header">Data Structures
                            <div className="card-header-actions">
                                <a className="card-header-action">

                                </a>
                            </div>
                        </div>
                        <div className="card-body">
                            <lo style={{ textAlign: 'left' }}>
                                <li>
                                    <a target={'_blank'} href={'https://github.com/jhcarrington/AVLTree'}>AVL Tree</a>
                                </li>
                                <li>
                                    <a target={'_blank'} href={'https://github.com/jhcarrington/FoodQuery'}>B+ Tree</a>
                                </li>
                                <li>
                                    <a target={'_blank'} href={'https://github.com/jhcarrington/HashTable'}>Hash Table</a>
                                </li>
                            </lo>
                        </div>

                    </div>
                    <div className="card" id="card">
                        <div className="card-header">jasoncarrington.me
                            <div className="card-header-actions">
                                <a className="card-header-action">

                                </a>
                            </div>
                        </div>
                        <div className="card-body">
                            <lo style={{ textAlign: 'left' }}>
                                <li>
                                    <a target={'_blank'} href={'https://github.com/jhcarrington/jasoncarringtonDemo'}>Source Code</a>
                                </li>
                            </lo>
                        </div>

                    </div>
                </div>
                <hr className="hrMyself" />
                <div className="card-columns cols-2" >
                    <CardItem
                        title={'About'}
                        screen={Routes.ABOUT}
                        body={
                            <div style={{ textAlign: 'left' }}>
                                <li>
                                    University of Wisconsin - Madison
                                    </li>
                                <li>
                                    Full-Stack Developer
                                    </li>
                                <li>
                                    Programming experience
                                    </li>
                                <li>
                                    Resume
                                    </li>
                            </div>
                        } />
                    <CardItem
                        title={'Birdwell Solutions'}
                        screen={Routes.BIRDWELL}
                        body={
                            <div style={{ textAlign: 'center' }}>
                                <i style={{ textAlign: 'center' }}>
                                    ** Head of Engineering **
                            </i>
                                <div style={{ textAlign: 'left' }}>
                                    <li>
                                        Lead a team of 10 developers
                            </li>
                                    <li>
                                        Manage training
                            </li>
                                    <li>
                                        Full stack node.js engineer
                            </li>
                                </div>
                            </div>
                        } />
                </div>
            </div>
        );
    }
}
