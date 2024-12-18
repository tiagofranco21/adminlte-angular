import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, allWords = false): string {
    if (!value) return '';

    if (allWords) {
      return value
        .split(' ')
        .map((word) => this.capitalize(word))
        .join(' ');
    } else {
      return this.capitalize(value);
    }
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
