import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe',
})
export class ColorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let color = '';
    switch (value) {
      case 'verified':
        color = 'bg-green-400 text-white';
        break;

      case 'completed':
        color = 'bg-green-400 text-white';
        break;
      case 'pending':
        color = 'bg-yellow-100 text-ash-500';
        break;
      case 'not verified':
        color = 'bg-red-400 text-white';
        break;
      case 'cancelled':
        color = 'bg-red-400 text-white';
        break;
      case 'inactive':
        color = 'bg-yellow-100 text-ash-500';
        break;
      case 'overdue':
        color = 'bg-red-50 text-red-500';
        break;
      case 'debited':
        color = 'bg-yellow-100 text-ash-500';
        break;

      case 'running':
        color = 'bg-yellow-100 text-ash-500';
        break;
      default:
        break;
    }
    return color;
  }
}
