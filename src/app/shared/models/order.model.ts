import { IceCreamItem } from './icecreamitem.model';

export interface Order {
  customerName: string;
  items: IceCreamItem[];
}
