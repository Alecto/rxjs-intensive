import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Observable, Subscriber } from 'rxjs';

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
        double
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

function double(source$: Observable<any>) {
  return source$.lift({
    call(subscriber: Subscriber<unknown>, source: any) {
      source.subscribe(new DoubleSubscriber(subscriber));
    }
  });
  // создали новый поток на базе текущего поток, но с новым оператором.

  // const observable$ = new Observable();
  // observable$.source = source$;
  // observable$.operator = {
  //   call(subscriber: Subscriber<unknown>, source: any) {
  //     source.subscribe(new DoubleSubscriber(subscriber));
  //   }
  // };
  // return observable$;
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
