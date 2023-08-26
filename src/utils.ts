import { random, reject } from "lodash";

interface Dimensions {
  width: number;
  height: number;
}

enum Direction {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}

export interface Point {
  x: number;
  y: number;
  direction?: Direction;
}

const directions: Direction[] = [
  Direction.top,
  Direction.bottom,
  Direction.left,
  Direction.right
];

const getRandomDirection = (excludeDirection?: Direction): Direction => {
  const availableDirections = excludeDirection
    ? reject(directions, excludeDirection)
    : directions;

  return availableDirections[random(0, directions.length - 1, false)];
};

const getPoint = (
  particleSize: number,
  dimensions: Dimensions,
  direction?: Direction
): Point => {
  const offset = particleSize + 10;

  switch (direction) {
    case Direction.top:
      return {
        x: random(0, dimensions.width),
        y: -offset,
        direction
      };

    case Direction.bottom:
      return {
        x: random(0, dimensions.width),
        y: dimensions.height + offset,
        direction
      };

    case Direction.left:
      return {
        x: -offset,
        y: random(0, dimensions.height),
        direction
      };

    case Direction.right:
      return {
        x: dimensions.width + offset,
        y: random(0, dimensions.height),
        direction
      };

    default:
      return {
        x: random(0, dimensions.width),
        y: random(0, dimensions.height)
      };
  }
};

export const getRandomStartPoint = (
  particleSize: number,
  dimensions: Dimensions,
  offScreen: boolean = false
): Point => {
  const direction: Direction | undefined = offScreen
    ? getRandomDirection()
    : undefined;

  return getPoint(particleSize, dimensions, direction);
};

export const getRandomEndPoint = (
  particleSize: number,
  dimensions: Dimensions,
  startPoint: Point,
  offScreen: boolean = true
): Point => {
  const direction: Direction | undefined = offScreen
    ? getRandomDirection(startPoint.direction)
    : undefined;

  return getPoint(particleSize, dimensions, direction);
};
