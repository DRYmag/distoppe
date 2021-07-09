import { CommonModule } from "@angular/common";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { FormParamsComponent } from './component/form-params/form-params.component';
import { ParamsHandler } from "./state/params.handler";
import { ParamsState } from "./state/params.state";
import { TimerState } from "./state/timer.state";
import { ListTimerComponent } from './component/list-timer/list-timer.component';
import { TimePipe } from "./pipe/time/time.pipe";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from "@angular/flex-layout";

export function noop() {
  return function () { };
}

@NgModule({
  declarations: [
    FormParamsComponent,
    ListTimerComponent,
    TimePipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatRippleModule,
    NgxsModule.forRoot([ParamsState, TimerState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: [ParamsState, TimerState]
    }),
    ReactiveFormsModule,
  ],
  exports: [
    FormParamsComponent,
    ListTimerComponent,
    NgxsModule,
    NgxsStoragePluginModule,
    TimePipe,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [ParamsHandler],
      multi: true
    }
  ]
})
export class BusinessModule { }
