import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Timer } from "./timer.actions";

export interface DayTimer {
  idDay: number;
  time: number;
}

export interface TimerStateModel {
  timers: DayTimer[];
}

@State<TimerStateModel>({
  name: 'timer',
  defaults: {
    timers: [
      { idDay: 1, time: 0 },
      { idDay: 2, time: 0 },
      { idDay: 3, time: 0 },
      { idDay: 4, time: 0 },
      { idDay: 5, time: 0 },
    ]
  }
})
@Injectable()
export class TimerState {
  @Action(Timer.AddOneMinute)
  public addOneMinute(ctx: StateContext<TimerStateModel>, action: Timer.AddOneMinute): void {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      timers: state.timers.map(t => ({
        ...t,
        time: action.payload.includes(t.idDay) ? t.time + 60000 : t.time
      }))
    });
  }

  @Action(Timer.Reset)
  public resetAllTimers(ctx: StateContext<TimerStateModel>, action: Timer.Reset): void {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      timers: state.timers.map(t => ({ ...t, time: 0 }))
    });
  }

  @Action(Timer.SetNumber)
  public setNumber(ctx: StateContext<TimerStateModel>, action: Timer.SetNumber): void {
    const state = ctx.getState();

    const timers = new Array(action.payload).fill(null).map((v, i) => ({
      idDay: i + 1,
      time: state.timers[i]?.time ?? 0
    }));

    ctx.setState({ ...state, timers });
  }
}
