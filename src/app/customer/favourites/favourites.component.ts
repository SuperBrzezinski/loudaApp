import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { ApiService } from 'src/app/shared/services/api.service';
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

  constructor(
    private apiService: ApiService,
    private customerService: CustomerService
  ) {}

  removeFavourite(item: IceCreamItem) {
    console.log(`przed przekazaniem: ${JSON.stringify(item)}`);

    // this.apiService.deleteFavourite(this.customerUid, item);
    this.customerService.deleteFavourite(item);
  }
}
