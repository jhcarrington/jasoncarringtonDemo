import React, { useEffect, useState } from 'react';

const PageFooterSquiggle: React.FC = () => {
  const [path, setPath] = useState('');

  const generatePath = (width: number) => {
    const numberOfArcs = Math.floor(width / 40);
    const intervals = width / numberOfArcs;
    let d = '';

    const height = 5;

    for (let i = 0; i < numberOfArcs; i++) {
      d += `M${i * 2 * intervals},${height / 2}`;
      d += `a${intervals / 4},${height} 0 0,${0} ${intervals / 2},${-height} `;
      d += `a${intervals / 4},${height} 0 0,${0} ${intervals / 2},${height} `;
      d += `a${intervals / 4},${-height} 0 0,${1} ${intervals / 2},${height} `;
      d += `a${intervals / 4},${-height} 0 0,${1} ${intervals / 2},${-height} `;
    }

    return d;
  };

  useEffect(() => {
    const updatePath = () => {
      const width = window.innerWidth;
      setPath(generatePath(width));
    };

    updatePath();
    window.addEventListener('resize', updatePath);

    return () => {
      window.removeEventListener('resize', updatePath);
    };
  }, []);

  return (
    <svg
      className="w-full h-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${window.innerWidth} 20`}
    >
      <path d={path} fill="none" stroke="#aaaaaa" strokeWidth="1" />
    </svg>
  );
};

export default PageFooterSquiggle;
