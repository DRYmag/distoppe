export namespace Timer {
  export class AddOneMinute {
    public static readonly type = '[List timer] AddOneMinuteInTimers';

    public constructor(public payload: number[]) { }
  }

  export class Reset {
    public static readonly type = '[App] ResetAllTimers';

    public constructor() {}
  }

  export class SetNumber {
    public static readonly type = '[ParamsHandler] SetNumberOfTimer';

    public constructor(public payload: number) { }
  }
}
