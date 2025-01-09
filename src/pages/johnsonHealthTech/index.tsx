import { ReactElement } from 'react';
import { getMediaUrl, MediaUrls } from '../../utils';

export default function JohnsonHealthTech(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <a
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
        target={'_blank'}
        href={'https://www.johnsonfitness.com/'}
        rel="noreferrer"
      >
        <div style={{ flex: 1, alignContent: 'left' }}>
          <img
            src={getMediaUrl(MediaUrls.JohnsonHealthTechLogo)}
            style={{ objectFit: 'contain', width: '5rem' }}
            alt="Johnson Health Tech Logo"
          ></img>
        </div>
      </a>
      <div style={{ textAlign: 'center', fontSize: 20 }}>
        Johnson Health Tech
      </div>
      <hr></hr>
      <p>
        <i>
          A fitness and wellness equipment company that designs, manufactures,
          and sells products globally.
        </i>
        <br />* Web Developer III, August 2023 - Present
      </p>
      <div>
        <b>{'Programming languages: '}</b>
        <div style={{ paddingLeft: '0.5rem' }}>
          Primary: Typescript and JavaScript
        </div>
        <b>{'Programming environment: '}</b>
        <div style={{ paddingLeft: '0.5rem' }}>
          Primary: AWS and React, MongoDB
          <br />
          Secondary: NextJS
        </div>
        <p>
          At Johnson Health Tech, Jason has led impactful projects to streamline
          the company’s operations and reduce costs.
          <br />
          One of Jason’s key contributions was identifying and leading the
          migration of a critical service from Elastic Beanstalk to AWS Lambda.
          This refactor not only simplified the architecture but also resulted
          in substantial cost savings. The migration was carefully planned and
          executed without disrupting existing traffic.
          <br />
          Collaborating with his team, Jason identified unused resources and
          successfully reduced company expenses by $20,000 per month.
          <br />
          Additionally, Jason managed integrations with third-party vendors to
          synchronize the company’s console login and workout systems with
          external platforms. He upgraded the codebase to TypeScript, improving
          maintainability, and overhauled the testing framework for reliability
          and consistency.
          <br />
          On the frontend, Jason contributed to a vendor-facing React
          application, building out styles, loading logic, and vendor-specific
          integrations.
          <br />
          Beyond technical contributions, Jason delivered leadership
          presentations showcasing his team’s accomplishments and technical
          solutions.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              border: '1px solid grey',
              padding: 10,
            }}
          >
            <b>Skills gained</b>
            <p>
              <li>AWS</li>
              <li>Cost optimization</li>
              <li>TypeScript</li>
              <li>Vendor integrations</li>
              <li>Leadership presentations</li>
              <li>React</li>
              <li>Mocha Testing frameworks</li>
              <li>Docker</li>
              <li>DynamoDB</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
