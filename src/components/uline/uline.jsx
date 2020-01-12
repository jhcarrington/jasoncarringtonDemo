import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './styles.css';
export default class Uline extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>

                <a target={'_blank'} href='https://uline.com'><img src={require('../../assets/uline.jpg')} style={{ objectFit: 'contain', width: '100px' }}>
                </img></a>
                <div style={{ textAlign: 'center', fontSize: 20 }}>
                    Uline
                    </div>
                <hr></hr>
                <div>
                    <p>
                        At Uline I had two main projects I was working on.
                            <lo>
                            <li>
                                Server Install Script
                                </li>
                            <li>
                                Database Manager
                                </li>
                        </lo>
                        <b>{"Top skills gained from the internship: "}</b>
                        <text>ASP.NET, python, windows scripting, SQL</text>
                        <div style={{ height: 10 }}></div>
                        <b>{"Other skills gained from the internship: "}</b>
                        <text>Setting up a web server with RDC (Remote Desktop Connection) and IIS (Internet Information Service)</text>
                    </p>
                    <div className="card-columns cols-2">
                        <div className="card" id="card" style={{ boxShadow: 'none' }}>
                            <div className="card-header" style={{ color: '#000000' }}>Server Install Script
                                    <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{ color: '#000000' }}>
                                <p>I was put in charge of installing ESXI, a virtual server operating system, onto hp proliant servers. Part of this process is configuring the IP addresses so Uline's server and network team can easily solve outages.
                                    </p>
                                <p>
                                    This process itself takes about an hour per server.
                                    The server install script uses a baseline batch script to achieve a faster install time.
                                    This batch script calls python scripts to recognize and change the boot order to PXE boot.
                                    Then I setup the BIOS with some proliant built in scripting tools.
                                    Then setup the ILO (integrated lights out) using another scripting tool.
                                    Finally, configuring the smart arrays using esxi command line calls.
                                    This whole process takes place on a desktop used as THCP and TFTP servers, as well as NS file share server.
                                    Essentially creating a private network to perform IP changes.
                                    </p>
                            </div>

                        </div>
                        <div className="card" id="card" style={{ boxShadow: 'none' }}>
                            <div className="card-header" style={{ color: '#000000' }}>Database Manager
                                    <div className="card-header-actions">
                                    <a className="card-header-action">

                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{ color: '#000000' }}>
                                <p>
                                    Uline has multiple SQL servers with many databases with many tables.
                                    My task was to manage all of this data into one UI so that users can make reports about data.
                                    </p>
                                <p>
                                    My first task was to learn SQL, I was handed a SQL for dummies textbook and began learning.
                                    I then had to learn how to make a we app, which was going to be ASP.NET.
                                    Once I learned all the required skills I began making the UI.
                                        <ol>
                                        Each selection has a search feature
                                            <li>
                                            The UI dynamically generates drop down lists for all available servers.

                                            </li>
                                        <li>
                                            One or more servers can be selected and then opened. Which will open the databases of the selected servers.
                                            </li>
                                        <li>
                                            One or more databases can be selected, which opens the tables of the selected databases
                                            </li>
                                        <li>
                                            One or more tables can be selected, which opens the table headers.
                                            </li>
                                        <li>
                                            Each selected header has options such as filters, is included, order by.
                                            These options are converted into SQL commands which will gather and JOIN the correct objects.

                                            </li>
                                        <li>
                                            Download the report
                                            </li>

                                    </ol>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
