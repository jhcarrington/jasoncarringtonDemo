import { ReactElement } from 'react';
import { getMediaUrl, MediaUrls } from '../../utils';
import Banner from '../../components/Banner';
import nodeSVG from '../../assets/nodejsLogo.svg';
import Card from '../../components/Card';

import './AppLanding.css';

export default function AppLanding(): ReactElement {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          backgroundColor: '#f0f0f0',
          padding: '1rem',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: 'xx-large' }}>
          Hi 👋🏼 <br />
          I'm <strong>Jason</strong>
          <br /> a full-stack NodeJS Developer
          <br />
        </div>
        <div style={{ fontSize: 'medium' }}>
          Solving complex problems is my passion. I love to code and I love to
          learn. Have a problem? I can help you solve it.
        </div>
      </div>

      <hr></hr>
      <div
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: 'xx-large',
        }}
      >
        Highlighted Attributes
      </div>
      <div
        className={'info-columns cols-2'}
        style={{ textAlign: 'center', alignSelf: 'center' }}
      >
        <Banner
          className={'info'}
          asset={getMediaUrl(MediaUrls.WisconsinLogo)}
        />
        <Banner className={'info'} asset={nodeSVG} />
      </div>
      <div
        style={{ textAlign: 'center', fontSize: 'xx-large', margin: '1rem' }}
      >
        Recent Achievements and Projects
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <Card
          title="Redesigning AWS architecture"
          description="Identified and modernized a AWS beanstalk into a lambda and gracefully migrated traffic."
        />
        <Card
          title="AWS Cost Reduction"
          description="Identified cost savings using calculations of current traffic, expected traffic and currently used resources."
        />
        <Card
          title="Web Developer at Johnson Health Tech"
          description="Worked with a team to support third party integrations and build new features."
        />
      </div>
    </div>
  );
}
