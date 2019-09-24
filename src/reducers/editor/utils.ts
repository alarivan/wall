import uuidv4 from 'uuidv4';
import {
  TGridMeta,
  TGridMetaInit,
  TGridData,
  TGrid,
  TColor,
} from '../../types';
import { TState } from './types';

export function initMeta(meta: TGridMeta | TGridMetaInit): TGridMeta {
  return {
    id: meta.id || uuidv4(),
    columns: meta.columns,
    rows: meta.rows,
    size: meta.size,
    length: meta.columns * meta.rows,
    background: meta.background,
  };
}

export function initGrid(
  meta: TGridMeta | TGridMetaInit,
  data: TGridData = {},
): TGrid {
  return {
    meta: initMeta(meta),
    data,
    [Symbol.iterator]() {
      const length = this.meta.length;
      const data = this.data;
      let index = 0;

      return {
        next(): IteratorResult<TColor> {
          if (index >= length) {
            return {
              value: undefined,
              done: true,
            };
          }

          return {
            value: data[index++],
            done: false,
          };
        },
      };
    },
  };
}

export function initState(grid: TGrid): TState {
  return {
    history: [grid],
    current: 0,
  };
}
