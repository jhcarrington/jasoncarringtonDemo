import { ReactElement } from 'react';
import CardItem from '../../components/CardItem/CardItem';
import './Projects.css';
import { ProjectRoutes } from '../../App';
import { Outlet } from 'react-router-dom';

export default function Projects(): ReactElement {
  return (
    <div>
      <Outlet />
      <div className="projects-container">
        <CardItem
          title={'Johnson Health Tech'}
          screen={ProjectRoutes.JHT}
          body={
            <div>
              <i style={{ textAlign: 'center' }}>* Web Developer III *</i>
              <div style={{ textAlign: 'left' }}>
                <li>Primary: AWS, TypeScript, MongoDB</li>
                <li>Secondary: React, DynamoDB</li>
              </div>
            </div>
          }
        />
        <CardItem
          title={'TASC'}
          screen={ProjectRoutes.TASC_MPX_DEV}
          body={
            <div>
              <i style={{ textAlign: 'center' }}>
                * Full stack, Application Developer II *
              </i>
              <div style={{ textAlign: 'left' }}>
                <li>Front End: Angular and Flutter</li>
                <li>Back End: AWS Serverless and Firebase</li>
              </div>
            </div>
          }
        />
        <CardItem
          title={'Uline'}
          screen={ProjectRoutes.ULINE}
          body={<div>Windows Systems Engineer Internship</div>}
        />
        <CardItem
          title={'Graphics Town'}
          screen={ProjectRoutes.GRAPHICS}
          body={<div>Developed an interactive animated world</div>}
        />
        <CardItem
          title={'Smilemail'}
          screen={ProjectRoutes.SMILEMAIL}
          body={
            <div>
              Worked with web developers to create a react native android/IOS
              ecommerce app called Smilemail.
            </div>
          }
        />
        <CardItem
          screen={ProjectRoutes.DATAMATCH}
          title={'Datamatch'}
          body={
            <div>
              Lead app developer for DataMatch student org 2019. Led a team in
              designing, programming, and troubleshooting an IOS app.
              Successfully communicated user information between front and back
              end. Produced an easy to use user interface.
            </div>
          }
        />

        <CardItem
          title={'Captain Service'}
          screen={ProjectRoutes.CAPTAIN_SERVICE}
          body={
            <div>
              Built an uber like app for mechanics, electricians and plumbers.
              Worked on the front end and back end.
            </div>
          }
        />
        <CardItem
          title={'Mosaic'}
          screen={ProjectRoutes.MOSAIC}
          body={
            <div>
              Worked with a web team to develop a social media app for local
              artists.
            </div>
          }
        />

        <div className="card" id="card">
          <div className="card-header">
            Data Structures (undergrad projects)
          </div>
          <div className="card-body">
            <ol style={{ textAlign: 'left' }}>
              <li>
                <a
                  target={'_blank'}
                  href={'https://github.com/jhcarrington/AVLTree'}
                  rel="noreferrer"
                >
                  AVL Tree
                </a>
              </li>
              <li>
                <a
                  target={'_blank'}
                  href={'https://github.com/jhcarrington/FoodQuery'}
                  rel="noreferrer"
                >
                  B+ Tree
                </a>
              </li>
              <li>
                <a
                  target={'_blank'}
                  href={'https://github.com/jhcarrington/HashTable'}
                  rel="noreferrer"
                >
                  Hash Table
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="card" id="card">
          <div className="card-header">jasoncarrington.com</div>
          <div className="card-body">
            <a
              target={'_blank'}
              href={'https://github.com/jhcarrington/jasoncarringtonDemo'}
              rel="noreferrer"
              style={{ color: '#008080' }}
            >
              Source Code
            </a>
          </div>
        </div>
        <CardItem
          title={'Birdwell Solutions'}
          screen={ProjectRoutes.BIRDWELL}
          body={
            <div style={{ textAlign: 'center' }}>
              <i style={{ textAlign: 'center' }}>* Head of Engineering *</i>
              <div style={{ textAlign: 'left' }}>
                <li>Led a team of 10 developers</li>
                <li>Managed training</li>
                <li>Full stack node.js engineer</li>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
