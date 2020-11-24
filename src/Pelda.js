import { useEffect, useState } from "react";

export default () => {
  const [points, setPoints] = useState([]);
  const [draw, setDraw] = useState([]);
  const [folt, setFolt] = useState([]);

  const randomPoint = ptr => [...ptr, Math.random() * 500 | 0, Math.random() * 500 | 0]

  const interaction = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp : ({clientX, clientY}) => {
      setPoints(p => [...p, draw])
      setDraw([]);
    },
    onMouseMove : ({clientX, clientY}) => setDraw(([x, y]) => [x, y, clientX, clientY]),
  };

  const handleFolt = () => {
    setFolt(points.flat())
    setPoints([])
  }

  return (
    <main>
      <pre style={{position:'absolute', top:0, left:0, userSelect:'none'}}>
        {`
          draw: ${draw |> JSON.stringify}
          points: ${points |> JSON.stringify}
          folt: ${folt |> JSON.stringify}
        `}
      </pre>
      <svg viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} {...interaction}>
        <g stroke="#FFEEDD" fill="none">
          <polygon points={folt} fill="#888" stroke="none" />
          {points.map(line => <polygon points={line} />)}
          <polygon points={draw} strokeDasharray={[2, 8]}/>
        </g>
      </svg>
      <pre style={{position:'absolute', top:100, left:0, userSelect:'none'}}>
        <span className="button" onClick={ _ => {setPoints([]); setFolt([])}}>clear</span>
        <span className="button" onClick={handleFolt}>folt</span>
      </pre>
    </main>
  )
}