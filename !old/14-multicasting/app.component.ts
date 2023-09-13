import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, EMPTY, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-6">
          <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
            <div class="mb-3">
              <label for="name1" class="form-label">User name 1</label>
              <input id="name1" type="text" formControlName="name" class="form-control"
                     [ngClass]="{error: formInvalid}">
            </div>
            <div class="mb-3">
              <button class="btn btn-info">Submit</button>
            </div>
            <h4 *ngIf="valueSequence$ | async as value">Valid value #1: {{value}}</h4>
          </form>
        </div>
        <div class="col-6" *ngIf="isVisible">
          <form [formGroup]="form2" (ngSubmit)="onSubmit(form2)">
            <div class="mb-3">
              <label for="name2" class="form-label">User name 2</label>
              <input id="name2" type="text" formControlName="name" class="form-control"
                     [ngClass]="{error: formInvalid2}">
            </div>
            <div class="mb-3">
              <button class="btn btn-info">Submit</button>
            </div>
            <h4 *ngIf="valueSequence2$ | async as value">Valid value #2: {{value}}</h4>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error {
      border-bottom: 3px solid red;
    }
  `],
  providers: [UserService]
})
export class AppComponent implements OnInit, AfterViewInit {

  form = this.fb.group({name: []});
  form2 = this.fb.group({name: []});

  formInvalid = false;
  formInvalid2 = false;

  isVisible = false;

  valueSequence$!: Observable<any>;
  valueSequence2$!: Observable<any>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.isVisible = true;
    }, 5000);

    this.valueSequence$ = combineLatest([
      this.form.valueChanges,
      this.userService.getNames()
    ]).pipe(
      debounceTime(500),
      tap(console.log),
      switchMap(([{name: value}, names]) => {
        this.formInvalid = !names.find((name: string) => name.toLowerCase() === (value as any).toLowerCase());
        if (this.formInvalid) return EMPTY;
        return of(value);
      })
    );

    this.valueSequence$.subscribe(value => {
      console.log(value);
    });


    this.valueSequence2$ = combineLatest([
      this.form2.valueChanges,
      this.userService.getNames()
    ]).pipe(
      debounceTime(500),
      tap(console.log),
      switchMap(([{name: value}, names]) => {
        this.formInvalid2 = !names.find((name: string) => name.toLowerCase() === (value as any).toLowerCase());
        if (this.formInvalid2) return EMPTY;
        return of(value);
      })
    );

    this.valueSequence2$.subscribe(value => {
      console.log(value);
    });
  }

  ngAfterViewInit() { }

  onSubmit(form: any) {
    console.log(form.value);
  }

}
