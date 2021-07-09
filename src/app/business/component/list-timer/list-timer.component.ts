import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { without } from 'lodash';
import { interval, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ParamsStateModel } from '../../state/params.state';
import { Timer } from '../../state/timer.actions';
import { DayTimer } from '../../state/timer.state';

interface Timer extends DayTimer {
  extra: number;
  isDone: boolean;
  remaining: number;
  progress: number;
}

@Component({
  selector: 'app-list-timer',
  templateUrl: './list-timer.component.html',
  styleUrls: ['./list-timer.component.css']
})
export class ListTimerComponent implements OnDestroy, OnInit {
  public timers$ = this.store.select<DayTimer[]>(s => s.timer.timers)
    .pipe(map(l => this.mapToTimers(l)));

  private readonly destroy$ = new Subject<void>();

  private readonly minutes$ = interval(60000);

  private starteds: number[] = [];

  public constructor(private store: Store) { }

  public isStarted(timer: DayTimer): boolean {
    return this.starteds.includes(timer.idDay);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.minutes$
      .pipe(
        filter(() => this.starteds.length > 0),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.store.dispatch(new Timer.AddOneMinute(this.starteds)));
  }

  public toggleTimer(timer: Timer): void {
    this.starteds = this.starteds.includes(timer.idDay)
      ? without(this.starteds, timer.idDay)
      : [...this.starteds, timer.idDay];
  }

  public trackByDay(index: number, timer: Timer): number {
    return timer.idDay;
  }

  private mapToTimers(dayTimers: DayTimer[]): Timer[] {
    const params = this.store.selectSnapshot<ParamsStateModel>(s => s.params);
    const timeByDay = (params.timeLimit / params.days) * 60 * 60 * 1000;

    return dayTimers.map(dt => {
      const isDone = dt.time >= timeByDay;

      return {
        ...dt,
        extra: isDone ? dt.time - timeByDay : 0,
        isDone,
        remaining: isDone ? 0 : timeByDay - dt.time,
        progress: isDone ? 100 : (dt.time / timeByDay) * 100
      };
    });
  }
}
