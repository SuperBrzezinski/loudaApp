import { IceCreamItemSummedUp } from './ice-cream-item-summed-up-model';

export interface OrderSummedUp {
  customerName: string;
  items: IceCreamItemSummedUp[];
}
