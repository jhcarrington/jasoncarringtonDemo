import { ReactElement } from 'react';
import { getMediaUrl, MediaUrls } from '../../utils';

import './About.css';

export default function About(): ReactElement {
  return (
    <div>
      <div
        style={{ justifyContent: 'center', display: 'flex', marginTop: '1rem' }}
      >
        <img
          src={getMediaUrl(MediaUrls.JasonHighlight)}
          alt="Jason Highlight"
          style={{ objectFit: 'contain', width: '20vw', borderRadius: 5 }}
        ></img>
      </div>
      <h1 style={{ textAlign: 'center', fontSize: 20 }}>About Jason</h1>
      <hr></hr>
      <div
        style={{ fontSize: 'medium', marginLeft: '5rem', marginRight: '5rem' }}
      >
        <p>
          Jason is a full-stack NodeJS Developer. This website you are looking
          at was built by Jason using React hosted on his plesk server, using
          AWS to host large media in S3. Jason has expertise in Typescript,
          MongoDB, AWS, Express, React, React Native and SQL. He has additional
          modest experience with Python, Java, C, C#, as well as tools like
          Flutter, GCP and MySQL.
          <br />
        </p>
        <br />
        <p>
          Jason has a Golden Retriever named Cooper. He raised him since he was
          a puppy at 8 weeks. He regularly takes him to the dog park and on
          adventures.
        </p>
        <p>
          Jason also likes to workout, he competed in the Big10 10k in July 2024
          and the Madison Half Marathon in November of 2024. He also enjoys
          biking and is training for an olympic distance triathlon.
        </p>
        <br />
        <p>
          Jason was born with dyslexia. Although developing effective techniques
          to manage it, he always preferred using a keyboard. The autocomplete
          features in integrated development environments (IDEs) have ensured
          that his dyslexia has never hindered his performance.
        </p>
        <br />
        <p>
          In college, Jason was involved with a few groups. He joined the Theta
          Delta Chi fraternity in the Spring of 2018, his second semester. In
          the fraternity, he was recruited to join Birdwell Solutions, a
          contracting firm started by a fraternity brother. He worked as the
          head of engineering with the roles of recruiting other members of the
          fraternity and elsewhere to build a team that together built
          technology for clients.
        </p>
        <p>
          In addition to Birdwell, he got involved with Humorology through the
          fraternity during his first and second years in college. Humorology is
          a theatrical act in which greek life forms casts whose purpose is to
          raise money. The fall semester of school is where each cast learns the
          first 10 minutes of their shows, which includes: dancing, singing,
          dancing and singing, and acting. Based on how much each cast raises
          and the overall impression of the shows on the judges, the judges pick
          casts to continue to second semester. Humorology. The casts he was
          involved with advanced both years which means both casts worked on
          perfecting their show for a final performance.
        </p>
        <p>
          Humorology raised about $234,000 in his first year, 2017-2018, and
          over $400,000 in his second year, 2018-2019
        </p>
        <p>
          Jason was also involved with the UW Nordic Ski club. He had never
          skied before college and he wanted to try something new. So he was
          taught by the club and has stuck with it to this day.
        </p>

        <br />
        <br />
        <h2>Fun Fact</h2>
        <p style={{ marginLeft: 20 }}>
          Jason was born with tethered cord syndrome. This essentially meant he
          had difficulty breathing, tasting, and performing other functions
          involving the brain stem. Luckily, he had surgery when he was 10 years
          old to cut the problematic tissue at the bottom of his spinal cord; He
          then proceeded to break his back a year later. Fortunately, his back
          healed well with no complications!
        </p>
      </div>
    </div>
  );
}
