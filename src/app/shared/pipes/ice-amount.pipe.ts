import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iceAmount',
})
export class IceAmountPipe implements PipeTransform {
  transform(n: string): string {
    if (Number(n) < 1000) {
      return `${n}ml`;
    } else {
      return `${Math.floor(Number(n) / 1000)}litr ${Number(n) % 1000}ml`;
    }
  }
}
