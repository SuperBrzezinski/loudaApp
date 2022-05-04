import { IceCreamItem } from './icecreamitem.model';

export interface Order {
  ordered: IceCreamItem[] | null;
}
