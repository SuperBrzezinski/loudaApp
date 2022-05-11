import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  private customerUid!: string;
  favouriteItems$: Observable<IceCreamItem[]> =
    this.customerService.getFavourites();
  displayedColumns: string[] = ['index', 'taste', 'unit', 'quantity', 'action'];

  constructor(private customerService: CustomerService) {}

  removeFavourite(item: IceCreamItem) {
    this.customerService.deleteFavourite(item);
  }
}
