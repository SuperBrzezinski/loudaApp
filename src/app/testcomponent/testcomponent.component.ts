import { Component, OnInit } from '@angular/core';
import { TestapiService } from '../testapi.service';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss'],
})
export class TestcomponentComponent implements OnInit {
  things: any = [];
  constructor(private testapiService: TestapiService) {}

  ngOnInit(): void {
    this.testapiService
      .getShizzle()
      .snapshotChanges()
      .subscribe((value) => {
        value.forEach((item) => {
          let a = item.payload.toJSON();
          // a['$key'] = item.key;
          this.things.push(a);
        });
      });
    // .subscribe((things) => (this.things = things));
    console.log(this.testapiService.getShizzle().snapshotChanges());
    console.log(this.things);
  }
}
