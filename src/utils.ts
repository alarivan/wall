import { TGrid, TColor } from './types';

export function gridMap(
  grid: TGrid,
  callback: (item: TColor, index: number) => any,
): Element[] {
  let result = [];
  let index = 0;
  for (const item of grid) {
    result.push(callback(item, index++));
  }
  return result;
}
