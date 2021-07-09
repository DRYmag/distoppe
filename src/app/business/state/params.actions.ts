import { ParamsStateModel } from "./params.state";

export namespace Params {
  export class Update {
    public static readonly type = '[Dialog params] UpdateParams';

    public constructor(public payload: ParamsStateModel) { }
  }
}
