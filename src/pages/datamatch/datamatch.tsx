import { ReactElement } from 'react';
import DemoVideo from '../../components/DemoVideo';
import { getMediaUrl, DatamatchMediaUrls } from './datamatch.service';
import './styles.css';

export default function Datamatch(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <a target={'_blank'} href={'https://datamatch.me'} rel="noreferrer">
        <img
          src={getMediaUrl(DatamatchMediaUrls.DatamatchLogo)}
          style={{ objectFit: 'contain', width: '3rem' }}
        ></img>
      </a>
      <div style={{ textAlign: 'center', fontSize: 20 }}>Datamatch</div>
      <hr></hr>
      <div>
        <p>
          <a href={'https://github.com/jhcarrington/DatamatchFinal'}>
            Go To Github
          </a>
        </p>
        <i>
          The Datamatch app is an IOS application developed by Jason Carrington
          and Frank Kulaszewicz.
        </i>
        <p>
          leading up to February 7th, the creative team worked hard to create
          humorous survey questions. Then on February 7th everything goes live,
          allowing students across 10 different schools to fill out a profile
          and answer the survey questions. On February 14th these students are
          paired with a person depending on if they are looking for a
          friendship, partnership, or both. Datamatch's algorithm, built at
          Harvard, runs and picks pairs of people who answered the survey
          questions similarly.
        </p>

        <p>
          Datamatch's website and API was developed by a team at Harvard who
          founded Datamatch. With the help of Ben Pekala, the president,
          Datamatch was brought to the University of Wisconsin Madison. He then
          found volunteer programmers to work on the app and gain experience,
          and the app was born.
        </p>
        <b>{'Programming language: '}</b>
        Swift
        <div></div>
        <b>{'Programming environment: '}</b>
        Xcode

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <div
            style={{
              border: '1px solid grey',
              padding: 10
            }}
          >
            <b>Skills gained</b>
            <p>
              <li>
                Managing an xcode project{' '}
                <dd>
                  <li>Using Storyboard for design</li>
                  <li>Connecting storyboard to swift code</li>
                  <li>Requesting necessary permissions</li>
                </dd>{' '}
              </li>

              <li>Connecting with a back-end</li>
              <li>Secure login with back-end</li>
              <li>Sending base64 images to back-end</li>
              <li>Retrieving information from back-end</li>
              <li>Releasing an IOS app to testflight</li>
            </p>
          </div>
        </div>
        <b>DEMO</b>
        <div>
          <DemoVideo
            demos={[
              {
                src: getMediaUrl(DatamatchMediaUrls.DatamatchDemo)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
