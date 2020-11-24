import { useEffect, useState, useRef } from 'react';

export const jlog = p => JSON.stringify(p);

export const DemoOne = ({width = window.innerWidth, height = window.innerHeight}) => {
  const [points, setPoints] = useState([]);
  const [draw, setDraw] = useState([]);

  const viewBox = `0 0 ${width} ${height}`;
  const interactions = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : ({clientX, clientY}) => {
      if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
      setDraw([])
    },
    onMouseMove : ({clientX, clientY}) => draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY]),
  }

  const handleClear = event => {
    event.preventDefault();
    setPoints([]);
    setDraw([]);
  };

  const handleUndo = event => {
    event.preventDefault();
    setPoints(pts => pts.slice(0, pts.length - 1));
    setDraw([]);
  };

  return (
    <main>
    <pre className="debug-panel absolute">
      {`
        draw: ${draw |> jlog}
      points: ${points.slice(-3) |> jlog}
      `}
    </pre>
    <svg viewBox={viewBox} {...interactions} >
      <g stroke="#FFF" fill="none">
        {points.map( (line, key) => <polygon points={line} key={key} />)}
        {draw.length >= 4 && <polygon points={draw} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
    <pre className="absolute" style={{top: 60}}>
      <span className="button" onClick={handleClear}>clear</span>
      <span className="button" onClick={handleUndo}>undo</span>
    </pre>
    </main>
  )
}
