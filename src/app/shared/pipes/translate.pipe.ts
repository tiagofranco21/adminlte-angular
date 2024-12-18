import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../core/services/translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string): string {
    return this.translate.getTranslate(key);
  }
}
