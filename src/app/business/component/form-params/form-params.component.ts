import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ParamsStateModel, ParamsState } from 'src/app/business/state/params.state';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { Params } from '../../state/params.actions';

@Component({
  selector: 'app-form-params',
  templateUrl: './form-params.component.html',
  styleUrls: ['./form-params.component.css']
})
export class FormParamsComponent implements OnInit, OnDestroy {
  public readonly form = new FormGroup({
    days: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(7)]),
    timeLimit: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(168)])
  });

  @Select(ParamsState)
  public readonly params$!: Observable<ParamsStateModel>;

  private readonly destroy$ = new Subject<void>();

  public constructor(private store: Store) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.params$
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.form.patchValue(params));

    this.form.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged((a, b) => isEqual(a, b)),
      takeUntil(this.destroy$)
    )
      .subscribe((value) => {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }

        this.store.dispatch(new Params.Update(value));
      });
  }
}
