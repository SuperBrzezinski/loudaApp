import { JsonPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { selectUserUid } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnInit {
  private customerUid!: string;
  favouriteItems$!: Observable<IceCreamItem[]>;
  displayedColumns: string[] = ['index', 'taste', 'unit', 'quantity', 'action'];

  constructor(private apiService: ApiService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectUserUid)
      .pipe(take(1))
      .subscribe((uid) => {
        console.log((this.customerUid = uid as string));

        this.customerUid = uid as string;
      });
    this.favouriteItems$ = this.apiService.getFavourites(this.customerUid);
  }

  removeFavourite(item: IceCreamItem) {
    console.log(`przed przekazaniem: ${JSON.stringify(item)}`);

    this.apiService.deleteFavourite(this.customerUid, item);
  }
}
