import { ReactElement } from 'react';
import DemoVideo from '../../components/DemoVideo/DemoVideo';
import './styles.css';
import { getMediaUrl, MediaUrls } from '../../utils';

export default function Smilemail(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ textAlign: 'left' }}>
        <img
          src={getMediaUrl(MediaUrls.SmilemailLogo)}
          alt="Smilemail Logo"
          style={{ objectFit: 'contain', width: '3rem' }}
        ></img>

        <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
          Smilemail
        </div>
      </div>
      <hr></hr>
      <div>
        <p>
          Smilemail is a React-Native cross plateform application. It&apos;s
          purpose is to provide a way for people to send voice messages inside
          of gift cards.
        </p>
        <ol>
          <li>Select an Occassion</li>
          <li>
            Select a design. This design includes front, middle, and back
            pictures
          </li>
          <li>
            Record a voice message to send inside of the card. Playback the
            recording to make sure it is what the user wants.
          </li>
          <li>
            Input a personal image for the inner card along with the text you
            want to send.
          </li>
          <li>Preview the finished card before checking out.</li>
          <li>
            Fill out sender and receiver information. Click submit and Smilemail
            will create the physical card and mail it to the receiver.
          </li>
        </ol>
        <p>
          The project was an innovative experience for Jason. He enjoyed
          applying his previous native IOS and android development experience
          into a React native application. He was not in charge of the back-end
          of this project. Through collaboration Jason and the team released a
          working ecommerce application.
          <br />
          <i>*Jason is no longer working on this project*</i>
        </p>
        <b>{'Programming language: '}</b>
        Javascript
        <div></div>
        <b>{'Programming environment: '}</b>
        React-Native
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            border: '1px solid grey',
            borderRightWidth: 0.5,
            padding: 10,
          }}
        >
          <b>Skills gained</b>
          <p>
            <li>React Native development</li>
            <li>Using libraries</li>
            <li>Component based development</li>
            <li>Designing a geometrical component that resembles a card</li>
            <li>Sending base64 images to back-end</li>
            <li>Recording voice messages</li>
            <li>Handling Stripe payments</li>
          </p>
        </div>
        <div
          style={{
            flex: 1,
            border: '1px solid grey',
            borderLeftWidth: 0.5,
            padding: 10,
          }}
        >
          <b>Libraries</b>
          <p>
            <li>react-navigation</li>
            <li>react-native-fs</li>
            <li>react-native-gesture-handler</li>
            <li>react-native-image-crop-picker</li>
            <li>react-native-image-picker</li>
            <li>react-native-permissions</li>
            <li>react-native-sound</li>
            <li>react-native-sound-player</li>
            <li>react-native-sound-recorder</li>
            <li>stripe-client</li>
          </p>
        </div>
      </div>
      <b>DEMO</b>
      <div>
        <DemoVideo demos={[{ src: getMediaUrl(MediaUrls.SmilemailDemo) }]} />
      </div>
    </div>
  );
}
