import { useState } from 'react';
import './style.scss';

export const jlog = p => JSON.stringify(p);

export const DemoOne = props => {
  const [points, setPoints] = useState([]);
  const [draw, setDraw] = useState([]);

  const viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`;
  const interactions = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : ({clientX, clientY}) => {
      setPoints(p => [...p, [...draw]])
      setDraw([])
    },
    onMouseMove : ({clientX, clientY}) => draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY]),
  }

  return (
    <main>
    <pre className="debug-panel">
      {`
        draw: ${draw |> jlog}
      points: ${points.slice(-3) |> jlog}
      `}
    </pre>
    <svg viewBox={viewBox} {...interactions}>
      <g stroke="#FFF" fill="none">
        {points.map( line => <polygon points={line} />)}
        {draw.length >= 4 && <polygon points={draw} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
    </main>
  )
}
