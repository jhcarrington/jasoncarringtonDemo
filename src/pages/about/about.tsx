import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GPASlider, { SliderAnimations } from '../../components/Slider';
import * as Types from '../../models/models';
import LanguageGraph from '../../components/LanguageGraph';
import { getGPAstats } from '../../routes';
import Banner from '../../components/Banner';
import './styles.css';
import { AboutMediaUrls, getMediaUrl } from './about.service';
import { getMediaUrl as sharedGetMediaUrl, JasonLogger, MediaUrls } from '../../utils';

const logger = new JasonLogger('pages.about');

export default function About(): ReactElement {
  const [gpaStats, changeGpaStats] = useState<Types.GpaStat[]>();

  useEffect(() => {
    if (!gpaStats) {
      getGPAstats()
        .then(changeGpaStats)
        .catch((error) => {
          logger.error('get gpa stats failed', error);
        });
    }
  }, [gpaStats]);

  function createGpaStatsView(): JSX.Element | undefined {
    if (gpaStats && gpaStats.length > 0) {
      return <div>
        <GPASlider
          gpaStat={gpaStats[0]}
          animatedStyle={SliderAnimations.CUMULATIVE}
          text={`${gpaStats[0].title}: ${gpaStats[0].score}`}
          height={30}
        ></GPASlider>
        <div style={{ height: 10 }}></div>
        <GPASlider
          gpaStat={gpaStats[1]}
          animatedStyle={SliderAnimations.MAJOR}
          text={`${gpaStats[1].title}: ${gpaStats[1].score}`}
          height={30}
        ></GPASlider>
      </div>;
    }
  }

  const gpaView = createGpaStatsView();

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={sharedGetMediaUrl(MediaUrls.JasonPicture)}
          style={{ objectFit: 'contain', width: '20vw', borderRadius: 5 }}
        ></img>
      </div>
      <h1 style={{ textAlign: 'center', fontSize: 20 }}>About Jason</h1>
      <hr></hr>
      <div
        className={'info-columns cols-2'}
        style={{ textAlign: 'center', alignSelf: 'center' }}
      >
        <Banner
          className={'info'}
          asset={getMediaUrl(AboutMediaUrls.WisconsinLogo)}
        />
        <Banner
          className={'info'}
          asset={require('../../assets/nodejsLogo.svg')}
        />
      </div>
      <div>
        {gpaView}
        <p>
          Jason is a Full-Stack Developer focused on front-end development. He
          is fluent with Javascript programming, utilizing NodeJS. This website
          you are looking at was built by Jason using React. This website has a
          proof of concept back-end which is sending the website gpa and
          programming language statistics dynamically; This helps me so I can
          update the language and gpa data using endpoint calls. This data is
          being stored in the very popular data management system MongoDB. The
          Mongo atlas is connected to a node.js express backend. The backend is
          hosted on Google Cloud platform using an app engine.
          <br />
          <i>
            Easter egg, try dragging Jason&apos;s picture in the top right corner
            (touchscreen available)
          </i>
        </p>
        <p>
          Jason was born with dyslexia and writing dysgraphia. Although he
          developed techniques that worked for him, he always preferred using a
          keyboard. Because integrated development environment(IDE)s typically
          have auto complete, his disabilities have never affected his abilities
          to perform.
        </p>
        <p>
          He got involved with Humorology during his first and second years in
          college. Humorology is a theatrical act in which greek life forms
          casts whose purpose is to raise money. The fall semester of school is
          where each cast learns the first 10 minutes of their shows, which
          includes: dancing, singing, dancing and singing, and acting. Based on
          how much each cast raises and the overall impression of the shows on
          the judges, the judges pick casts to continue to second semester.
          Humorology. The casts he was involved with advanced both years
          which means both casts worked on perfecting their show for a
          final performance.
        </p>
        <p>
          Humorology raised about $234,000 in his first year, 2017-2018, and
          over $400,000 in his second year, 2018-2019
        </p>
        <LanguageGraph />
        <p style={{ textAlign: 'center' }}>
          <text style={{ fontSize: '0.8rem' }}>
            <i>*Graph built by Jason using a canvas*</i>
            <br />
            <text style={{ fontSize: '0.5rem' }}>
              Data is fed by Google Cloud Platform from MongoDB with no labels
              or data stored within the code
            </text>
          </text>
        </p>

        <h2>Fun Fact</h2>
        <p style={{ marginLeft: 20 }}>
          Jason was born with a syndrome called tethered cord syndrome. This
          essentially meant he had difficulty breathing, tasting, and performing
          other functions involving the brain stem. Luckily, he had surgery when
          he was 10 years old to cut the problematic tissue at the bottom of his
          spinal cord; He then proceeded to break his back a year later.
          Fortunately, his back healed well with no complications!
        </p>

        <h1>Contact me at</h1>
        <p>
          jasonhcarrington@gmail.com
          <br />
          224-234-1588
          <br />
        </p>
        <p>
          <Link
            style={{ color: '#008080' }}
            to="/Resume.pdf"
            target="_blank"
            download
          >
            Download My Resume
          </Link>
        </p>
      </div>
    </div>
  );
}
