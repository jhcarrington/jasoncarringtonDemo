import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import './CardItem.css';

export default function CardItem(props: {
  title: string;
  body: ReactElement;
  screen: string;
}) {
  return (
    <Link style={{ textDecorationLine: 'none' }} to={props.screen}>
      <div className="card">
        <div className="card-header">{props.title}</div>
        <div className="card-body" style={{ color: '#000000' }}>
          {props.body}
        </div>
      </div>
    </Link>
  );
}
