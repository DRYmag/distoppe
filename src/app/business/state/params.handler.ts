import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful, Store } from "@ngxs/store";
import { Params } from "./params.actions";
import { Timer } from "./timer.actions";

@Injectable({ providedIn: 'root' })
export class ParamsHandler {
  public constructor(private actions$: Actions, private store: Store) {
    this.actions$
      .pipe(ofActionSuccessful(Params.Update))
      .subscribe((action: Params.Update) =>
        this.store.dispatch(new Timer.SetNumber(action.payload.days))
      );
  }
}
