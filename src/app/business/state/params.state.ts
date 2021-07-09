import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Params } from "./params.actions";

export interface ParamsStateModel {
  days: number;
  timeLimit: number;
}

@State<ParamsStateModel>({
  name: 'params',
  defaults: {
    days: 5,
    timeLimit: 35
  }
})
@Injectable()
export class ParamsState {
  @Action(Params.Update)
  public updateParams(ctx: StateContext<ParamsStateModel>, action: Params.Update): void {
    ctx.setState({ ...action.payload });
  }
}
