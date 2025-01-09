import React, { ReactElement } from 'react';
import './DemoVideo.css';

export default class DemoVideo extends React.PureComponent<
  {
    demos: Array<{
      src: string;
      title?: string;
    }>;
  },
  {}
> {
  render(): ReactElement {
    const component: ReactElement[] = [];
    this.props.demos.forEach((demo) => {
      component.push(
        <div className="demo-video-container">
          <div>{demo.title ?? ''}</div>
          <video className="demo-video" controls>
            <source src={demo.src} type="video/mp4" />
          </video>
        </div>,
      );
    });

    return (
      <div
        className="demo-video-columns"
        style={{
          display: 'inline-block',
          width: '100%',
        }}
      >
        {component}
      </div>
    );
  }
}
