import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { isNull, random, times } from "lodash";
import Konva from "konva";

import "./styles.css";
import { getRandomEndPoint, getRandomStartPoint, Point } from "./utils";

const width = window.innerWidth;
const height = window.innerHeight;

interface ParticlePoints {
  id: string;
  startPoint: Point;
  endPoint: Point;
}

const createParticlePoints = (): ParticlePoints => {
  const startPoint = getRandomStartPoint(
    10,
    {
      width,
      height
    },
    true
  );

  const endPoint = getRandomEndPoint(
    10,
    {
      width,
      height
    },
    startPoint,
    true
  );

  return {
    id: String(random()),
    startPoint,
    endPoint
  };
};

const minAnimationTimeout = 8;
const maxAnimationTimeout = 16;

const Particle: React.FC<{
  color?: string;
}> = ({ color = "#FFFFFF" }) => {
  const ref = useRef(null);
  const [particlePoints, setParticlePoints] = useState<ParticlePoints>(
    createParticlePoints()
  );

  useEffect(() => {
    const animationTimeoutSecs = random(
      minAnimationTimeout,
      maxAnimationTimeout,
      true
    );

    if (!isNull(ref.current)) {
      ref.current.x(particlePoints.startPoint.x);
      ref.current.y(particlePoints.startPoint.y);

      ref.current.to({
        x: particlePoints.endPoint.x,
        y: particlePoints.endPoint.y,
        duration: animationTimeoutSecs
      });
    }

    setTimeout(() => {
      setParticlePoints(createParticlePoints());
    }, animationTimeoutSecs * 1000);
  }, [particlePoints]);

  const size = random(2, 8);

  return (
    <Circle
      ref={ref}
      x={particlePoints.startPoint.x}
      y={particlePoints.startPoint.y}
      radius={size}
      fill={color}
      shadowBlur={random(8, 14)}
      shadowColor={color}
    />
  );
};

const maxParticles = 20;

const particleColors = [
  "#2A79FF",
  "#FF686B",
  "#02B790",
  "#DBDEE3",
  "#929BAB",
  "#85B1FF",
  "#FFA8A9",
  "#71D7C1",
  "#015B47",
  "#003694"
];

export default function App() {
  // const ref = React.useRef(null);
  // const mouse = useMouse(ref);

  return (
    <div className="App" style={{ filter: "blur(2px)" }}>
      <Stage width={width} height={height}>
        <Layer filters={[Konva.Filters.Blur]} blurRadius={5}>
          {times(maxParticles, (i) => {
            return (
              <Particle
                key={i}
                color={particleColors[random(0, particleColors.length - 1)]}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
