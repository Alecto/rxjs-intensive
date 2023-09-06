import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, debounceTime, fromEvent, map, Observable, startWith, withLatestFrom } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container py-5">
      <div class="slider">
        <div class="mb-4">
          <label for="quality">Quality</label>
          <input #quality type="range" class="form-range" min="0" max="100" id="quality"
                 [ngClass]="setClass(quality.value)">
          <label for="rating">Rating</label>
          <input #rating type="range" class="form-range" min="0" max="100" id="rating"
                 [ngClass]="setClass(rating.value)">
          <label for="actual">Actual</label>
          <input #actual type="range" class="form-range" min="0" max="100" id="actual"
                 [ngClass]="setClass(actual.value)">
        </div>

        <button #button class="btn btn-info" type="button">Send result</button>
      </div>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: [`
    .slider {
      max-width: 400px;
      padding: 30px;
      border: 2px solid lightsteelblue;
    }

    .slider input.bad::-webkit-slider-thumb {
      background: red;
    }

    .slider input.warn::-webkit-slider-thumb {
      background: orange;
    }

    .slider input.good::-webkit-slider-thumb {
      background: green;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('quality') quality!: ElementRef;
  @ViewChild('rating') rating!: ElementRef;
  @ViewChild('actual') actual!: ElementRef;
  @ViewChild('button') button!: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    const quality = this.quality.nativeElement;
    const rating = this.rating.nativeElement;
    const actual = this.actual.nativeElement;
    const button = this.button.nativeElement;

    const quality$ = this.getValue(fromEvent<InputEvent>(quality, 'input'));
    const rating$ = this.getValue(fromEvent<InputEvent>(rating, 'input'));
    const actual$ = this.getValue(fromEvent<InputEvent>(actual, 'input'));
    const button$ = fromEvent<PointerEvent>(button as HTMLButtonElement, 'click');

    const sliderSequence$ = combineLatest([quality$, rating$, actual$])
      .pipe(
        debounceTime(500),
        map(([q, r, a]) => Math.round((q + r + a) / 3))
      );

    sliderSequence$.subscribe(value => {
      console.log(value);
    });

    button$
      .pipe(
        withLatestFrom(sliderSequence$)
      )
      .subscribe(([_e, value]) => {
        console.log(value);
      });

  }

  getValue(source$: Observable<Event>): Observable<number> {
    return source$.pipe(
      map(({target}: Event) => +(target as HTMLInputElement).value),
      startWith(50)
    );
  }

  setClass(value: string): string {
    return +value < 40 ? 'bad' : +value < 70 ? 'warn' : 'good';
  }

}
