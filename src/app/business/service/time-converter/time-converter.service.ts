import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeConverterService {
  public timeToMs(time: string): number {
    if (!time.includes('h')) {
      time = time.padStart(4, '0');
      time = `${time.substr(0, 2)}h${time.substr(2, 2)}`;
    }

    const [hours, minutes] = time.split('h');

    return (parseInt(hours, 0) * 60 + parseInt(minutes || '0', 0)) * 60000;
  }

  public msTotime(ms: number): string {
    const minutes = Math.floor(ms / 60000);

    return [
      Math.floor(minutes / 60),
      minutes % 60
    ]
      .map(v => v.toString().padStart(2, '0'))
      .join('h');
  }
}
