import { TGrid } from '../../types';
import { Map } from 'immutable';

export type TGalleryState = Map<string, TGrid>;

export const SAVE = 'SAVE';
export type SAVE_ACTION = {
  type: typeof SAVE;
  payload: {
    grid: TGrid;
  };
};

export const DELETE = 'DELETE';
export type DELETE_ACTION = {
  type: typeof DELETE;
  payload: {
    id: string;
  };
};

export type TGalleryAction = SAVE_ACTION | DELETE_ACTION | { type: 'EMPTY' };
