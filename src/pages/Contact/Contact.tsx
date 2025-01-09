import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Contact(): ReactElement {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ fontSize: 'xx-large' }}>Contact me at</h1>
      <p>
        <a
          href="mailto:jasonhcarrington@gmail.com"
          style={{ color: '#008080' }}
        >
          jasonhcarrington@gmail.com
        </a>
        <br />
        <a href="tel:+12242341588" style={{ color: '#008080' }}>
          224-234-1588
        </a>
      </p>
      <br />
      <br />
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
  );
}
