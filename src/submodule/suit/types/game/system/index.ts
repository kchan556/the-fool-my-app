import type { ICard, IUnit } from '../card';

interface Option {
  id: string;
  description: string;
}

export type Choices = {
  title: string;
  isCancelable?: boolean;
} & (
  | {
      type: 'card';
      items: ICard[];
      count: number;
    }
  | {
      type: 'option';
      items: Option[];
    }
  | {
      type: 'intercept';
      items: ICard[];
    }
  | {
      type: 'unit';
      items: IUnit[];
    }
  | {
    type: 'block';
    items: IUnit[];
  }
);
