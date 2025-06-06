import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    const ELLIPSIS = '...';
    if (!value || value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength).trim() + ELLIPSIS;
  }
}
