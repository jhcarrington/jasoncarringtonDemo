import React, { Component } from 'react';
// import styles from './styles.css';
import { Link, Redirect } from 'react-router-dom';



export default class Main extends Component {
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    render() {
        return (
            <div>
                <hr className='hrProjects' />
                <div className="card-columns cols-2">
                    <Link to={'/datamatch'} className="button">
                        <div className='card' >
                            <div className="card-header">Datamatch
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                Lead app developer for DataMatch student org 2019.
                                Lead a team in designing, programming, and troubleshooting an IOS app.
                                Successfully communicated user information between front and back end.
                                Produced an easy to use user interface.
                            </div>

                        </div>

                    </Link>

                    <Link to={'/uline'} className="button">
                        <div className='card'>
                            <div className="card-header">Uline
                                <div className="card-header-actions">
                                    <a className="card-header-action">
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                Windows Systems Engineer Internship
                                </div>
                        </div>
                    </Link>
                    <Link to={'/smilemail'} className="button">
                        <div className='card'>
                            <div className="card-header">Smilemail
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                Worked with web developers to create a react native android/IOS ecommerce app called Smilemail.
                            </div>

                        </div>

                    </Link>
                    <Link to={'/feedthechange'} className="button" >
                        <div className="card">
                            <div className="card-header">Feed The Change
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                Volunteered to build a website for <i>Feed The Change</i>.
                            </div>

                        </div>

                    </Link>

                    <Link to={'/mosaic'} className="button" >
                        <div className="card">
                            <div className="card-header">Mosaic
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                Worked with a web team to develop a social media app for local artists.
                            </div>

                        </div>
                    </Link>
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
                </div>
                <hr className="hrMyself" />
                <div className="card-columns cols-2" >
                    <Link to={'/about'} className="button">
                        <div className="card">
                            <div className="card-header">About
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{ textAlign: 'left' }}>
                                <li>
                                    University of Wisconsin - Madison

                                </li>
                                <li>
                                    Full-Stack Developer
                                </li>
                            </div>

                        </div>
                    </Link>
                    {/* <Link to={'/circularinversion'} className="button" style={{ textDecoration: 'none', color: '#000000' }} >
                        <div className="card">
                            <div className="card-header">Circular Inversion
                            <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{textAlign: 'left'}}>
                                
                            </div>

                        </div>
                    </Link> */}
                </div>


            </div>

        );
    }
}
