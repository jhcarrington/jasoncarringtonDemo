import { ReactElement } from 'react';
import DemoVideo from '../../components/DemoVideo';
import { getMediaUrl, MosaicMediaUrls } from './mosaic.service';

export default function Mosaic(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ textAlign: 'left' }}>
        <a target={'_blank'}>
          <img
            src={getMediaUrl(MosaicMediaUrls.MosaicIcon)}
            style={{ objectFit: 'contain', width: '3rem' }}
          ></img>
          <a
            target={'_blank'}
            style={{ paddingLeft: 20 }}
            href={
              'https://apps.apple.com/us/app/mosaic-marketplace/id1489117637?ls=1'
            } rel="noreferrer"
          >
            <img
              style={{ height: '1.5rem', width: '4.5rem' }}
              src={require('../../assets/app-store-badge.png')}
            ></img>
          </a>
          <a
            target={'_blank'}
            style={{ paddingLeft: 20 }}
            href={'https://play.google.com/store/apps/details?id=com.mirch'} rel="noreferrer"
          >
            <img
              style={{ height: '1.5rem', width: '4.95rem' }}
              src={require('../../assets/google-play-badge.png')}
            ></img>
          </a>
        </a>

        <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>Mosaic</div>
      </div>
      <hr></hr>
      <div>
        <i>Developed by Jason Carrington and Robinson Cook.</i>
        <p>An art ecommerce platform built over a social media platform.</p>
        <p>
          <b>{'Programming language: '}</b>
          Javascript + TypeScript
          <div></div>
          <b>{'Programming environment: '}</b>
          React Native
        </p>
        <b>DEMOS</b>
        <div style={{ textAlign: 'center' }}>
          <DemoVideo
            demos={[
              {
                title: 'Modify Theme',
                src: getMediaUrl(MosaicMediaUrls.ChangeTheme),
              },
              {
                title: 'View Collections',
                src: getMediaUrl(MosaicMediaUrls.Collections),
              },
              {
                title: 'Login',
                src: getMediaUrl(MosaicMediaUrls.Login),
              },
              {
                title: 'Post interaction',
                src: getMediaUrl(MosaicMediaUrls.PostActions),
              },
              {
                title: 'Search',
                src: getMediaUrl(MosaicMediaUrls.Search),
              }
            ]}
          />
        </div>
        <div
          style={{
            display: 'flex',
            marginBottom: 10
          }}
        >
          <div
            style={{
              flex: 1,
              border: '1px solid grey',
              borderRightWidth: 0.5,
              padding: 10
            }}
          >
            <b>Skills gained</b>
            <p>
              <li>Animated User Interface</li>
              <li>Infinite scrolling</li>
              <li>Live feed of data</li>
              <li>User accounts</li>
              <li>Push Notifications</li>
              <li>
                Color Picker{' '}
                <dd>
                  <li>Component developed by Jason.</li>
                  <li>
                    Uses a cubic spline interpolation method to produce colors
                    given a position
                  </li>
                  <li>Uses redux for string to decimal translations</li>
                </dd>
              </li>
              <li>Gesture handlers</li>
            </p>
          </div>
          <div
            style={{
              flex: 1,
              border: '1px solid grey',
              borderLeftWidth: 0.5,
              padding: 10
            }}
          >
            <b>Libraries</b>
            <p>
              <li>@react-native-community/async-storage</li>
              <li>@react-native-community/cli-platform-android</li>
              <li>@react-native-community/masked-view</li>
              <li>@react-native-community/push-notification-ios</li>
              <li>
                @react-navigation/native - <i>V5</i>
              </li>
              <li>
                @react-navigation/stack - <i>V5</i>
              </li>
              <li>acorn-jsx</li>
              <li>native-base</li>
              <li>react-native-elements</li>
              <li>react-native-gesture-handler</li>
              <li>react-native-haptic-feedback</li>
              <li>react-native-image-crop-picker</li>
              <li>react-native-image-zoom-viewer</li>
              <li>react-native-linear-gradient</li>
              <li>react-native-permissions</li>
              <li>react-native-popup-dialog</li>
              <li>react-native-push-notification</li>
              <li>react-native-reanimated</li>
              <li>react-native-safe-area-context</li>
              <li>react-native-screens</li>
              <li>react-native-sliding-panes</li>
              <li>react-native-swipe-gestures</li>
              <li>react-native-webview</li>
              <li>react-navigation-animated-switch</li>
              <li>reactjs-popup</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
