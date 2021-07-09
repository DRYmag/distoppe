import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { FormParamsComponent } from './business/component/form-params/form-params.component';
import { Timer } from './business/state/timer.actions';
import { DayTimer } from './business/state/timer.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public remaining$ = combineLatest([
    this.store.select<number>(s => s.params.timeLimit),
    this.store.select<DayTimer[]>(s => s.timer.timers)
  ]).pipe(
    map(([limit, timers]) => limit * 60 * 60 * 1000 - timers.reduce((a, t) => a + t.time, 0)),
    map(r => r < 0 ? 0 : r),
    shareReplay(1)
  );

  public constructor(private dialog: MatDialog, private store: Store) { }

  public getToolbarColor(remaining: number): string {
    return remaining > 0 ? '' : 'warn';
  }

  public showParameters(): void {
    this.dialog.open(FormParamsComponent, {
      width: '220px'
    });
  }

  public reset(): void {
    this.store.dispatch(new Timer.Reset());
  }
}
