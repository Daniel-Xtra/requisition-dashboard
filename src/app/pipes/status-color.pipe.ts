import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let color = '';
    switch (value) {
      case 'issued':
        color = 'bg-green-400 text-white tracking-widest';
        break;
      case 'ict_pending':
        color = 'bg-orange-400 text-white tracking-widest';
        break;

      case 'cancelled':
        color = 'bg-red-400 text-white';
        break;
      case 'store_pending':
        color = 'bg-yellow-100 text-ash-500 tracking-widest';
        break;

      default:
        break;
    }
    return color;
  }
}
