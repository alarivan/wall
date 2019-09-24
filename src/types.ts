export type TColor = string | undefined;

export type TGridData = {
  [index: string]: TColor;
};

export interface TGridMetaInit {
  id?: string;
  rows: number;
  columns: number;
  size: number;
  background: TColor;
}

export interface TGridMeta extends TGridMetaInit {
  id: string;
  length: number;
}

export interface TGrid extends Iterable<TColor> {
  meta: TGridMeta;
  data: TGridData;
  [Symbol.iterator]: () => Iterator<TColor>;
}
