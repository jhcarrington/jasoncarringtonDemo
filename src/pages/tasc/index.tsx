import { ReactElement } from 'react';
import { getMediaUrl, TCBMediaUrls } from './tcb.service';

export default function Tasc(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <a
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
        target={'_blank'}
        href={'https://www.tasconline.com/'}
        rel="noreferrer">
        <div style={{ flex: 1, alignContent: 'left' }}>

          <img
            src={getMediaUrl(TCBMediaUrls.TascLogo)}
            style={{ objectFit: 'contain', width: '3rem' }}
          ></img>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>

          <img
            src={getMediaUrl(TCBMediaUrls.MPXLogo)}
            style={{ objectFit: 'contain', width: '5rem' }}
          ></img>
        </div>
      </a>
      <div style={{ textAlign: 'center', fontSize: 20 }}>TASC & MPX Dev (TCB enterprise)</div>
      <hr></hr>
      <p>
        <i>Total Administrative Services Corporation</i>
        <br />* Application Developer Intern, May 2020 - December 2020
        <br />* Application Developer 1, January 2021 - October 2022
        <br />* Application Developer 2, October 2022 - present
      </p>
      <div>
        <b>{'Programming languages: '}</b>
        <div style={{ paddingLeft: '0.5rem' }}>
          Primary: Typescript and SQL
          <br />Secondary: Dart
        </div>
        <b>{'Programming environment: '}</b>

        <div style={{ paddingLeft: '0.5rem' }}>
          Primary: Angular and AWS Serverless
          <br />Secondary: Flutter
        </div>
        <p>
          At TASC Jason worked on a wide variety of tasks.
          <br />
          Jason spent most of his internship working on their backend, which
          controls their Universal Benefits Account. During his internship
          he recieved introductions in MySQLWorkbench and AWS cloudwatch.
          <br />
          He was offered a full time position and accepted the role.
          <br /> This provided him more opportunities to grow. Just 2 months after starting,
          he was assigned a task with a hard set deadline from NetSuite (third party site) which required our
          system to update to new SSO standards within 1 month. We were using inbound SSO, and needed
          to use Open ID Connect (OIDC) SSO. After spending a couple weeks investigating
          and attempting to implement with AWS Cognito&apos;s built in auth triggers, he brought
          his findings to the architect. The architect realized we would need to build out
          a custom OAuth 2.0 authentication flow.
          <br />Jason saw this as a challenge and wanted to be the one to solve it. So, he
          worked some extra hours and built a custom authentication flow. In short, it
          redirects from the backend to the TASC application to gather
          login info. Backend receives and stored this in DynamoDB with a TTL, and
          redirects them to NetSuite. NetSuite asks the backend to generate a token.
          The backend sends a token back to NetSuite and the user is logged in.
        </p>

        <p>
          *This is just one noteable task, reach out to Jason for much more.
        </p>
        <p>
          Jason also came up with a goal for the 2022 year, which was to work together with
          another developer to create a Flutter Web/Mobile app.
          <br /> He came up with an idea of an app with 2 screens, pointing and retro screens and
          wrote a specification sheet.
          The app is what it sounds like, allows an agile workforce to point stories and carry out
          sprint retrospectives.
          <br />The application used firebase for seemless transfer of data without setting up sockets.
        </p>
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
                Atlassian
                <dd>
                  <li>Bitbucket</li>
                  <li>Jira</li>
                  <li>Confluence</li>
                </dd>{' '}
              </li>

              <li>Angular</li>
              <li>Reactive web design (using RxJS)</li>
              <li>Bootstrap</li>
              <li>Node scripting</li>
              <li>Javascript scripting</li>
              <li>Flutter</li>
              <li>Firebase</li>
              <li>Dart</li>
              <li>Writing mysql queries using MSQLWorkbench</li>
              <li>Amazon Web Services</li>
              <li>Debugging a large code base</li>
              <li>Working with a team</li>
              <li>Writing both unit and integration tests</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
