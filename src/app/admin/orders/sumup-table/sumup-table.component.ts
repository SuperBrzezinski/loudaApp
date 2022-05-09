import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

interface SummedUpTaste {
  name: string;
  amount: string;
}

@Component({
  selector: 'app-sumup-table',
  templateUrl: './sumup-table.component.html',
  styleUrls: ['./sumup-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SumupTableComponent implements OnInit {
  @Input() tomorrowDate!: string;
  summedUpOrders$!: Observable<SummedUpTaste[]>;
  summedUpTastes!: SummedUpTaste[];
  displayedColumns: string[] = ['index', 'taste', 'amount'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.summedUpOrders$ = this.apiService.getOrders(this.tomorrowDate).pipe(
      map((orders) => {
        return orders
          .map((order) => {
            return order.items.map((item) => {
              return {
                name: item.taste,
                amount: String(Number(item.unit) * Number(item.quantity)),
              };
            });
          })
          .flat();
      }),
      map((SUOrders) => {
        let outputArr: SummedUpTaste[] = [];
        SUOrders.forEach((order) => {
          if (
            outputArr.find((element) => {
              return element.name === order.name;
            }) !== undefined
          ) {
            outputArr[
              outputArr.findIndex((element) => element.name === order.name)
            ].amount = String(
              Number(
                outputArr[
                  outputArr.findIndex((element) => element.name === order.name)
                ].amount
              ) + Number(order.amount)
            );
          } else {
            outputArr.push(order);
          }
        });
        return outputArr;
      })
    );
  }
}
