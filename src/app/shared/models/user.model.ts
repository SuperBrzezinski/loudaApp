import { IceCreamItem } from './icecreamitem.model';
import { Order } from './order.model';
import { Role } from './role.model';

export interface User {
  name: string;
  email: string;
  role: Role;
  lastOrder?: { date: string; items: IceCreamItem[] };
  favourites?: string[];
}
