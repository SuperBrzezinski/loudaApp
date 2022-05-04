import { Order } from './order.model';
import { Role } from './role.model';

export interface User {
  name: string;
  email: string;
  role: Role;
  lastOrder?: Order;
  favourites?: string[];
}
