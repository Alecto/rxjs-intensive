import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, interval, map, Observable, pipe, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  `,
  imports: [CommonModule],
  styles: [`
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit(): void {

    interval(1000)
      .pipe(
        thirdWithDouble
        // double
        // doNothing,
        // helloRxjs
      )
      .subscribe({
        next: v => {
          console.log(v);
        },
        complete: () => console.log('completed')
      });

  }

  ngAfterViewInit() {
  }

}

class DoubleSubscriber extends Subscriber<number> {
  override next(value: number) {
    super.next(value * 2);
  }
}

const thirdWithDouble = pipe(
  filter((x: number) => x % 3 === 0),
  double
);

function double(source$: Observable<number>) {
  return source$.pipe(
    map(value => value * 2)
  );
}

function helloRxjs(source$: Observable<any>) {
  return new Observable(subscriber => {
    subscriber.next('Hi from helloRxjs function');
    subscriber.complete();
  });
}

function doNothing(source$: Observable<any>): Observable<any> {
  return source$;
}
