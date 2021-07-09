import { Pipe, PipeTransform } from '@angular/core';
import { TimeConverterService } from '../../service/time-converter/time-converter.service';

@Pipe({
  name: 'appTime'
})
export class TimePipe implements PipeTransform {
  public constructor(private timeConverter: TimeConverterService) {}

  public transform(value: number): string {
    return this.timeConverter.msTotime(value);
  }
}
