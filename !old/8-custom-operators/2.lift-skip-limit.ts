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

    // ---0---1---2---3---4---5---6---7---8---9---10---
    // skipLimit(2, 3)
    // -----------2---3---4-----------7---8---9--------

    interval(1000)
      .pipe(
        skipLimit(2, 3)
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

class SkipLimitSubscriber extends Subscriber<any> {
  private interval: number = 1;
  private count: number = 1;

  constructor(subscribe: Subscriber<any>, private skip: number, private limit: number) {
    super(subscribe);
  }

  override next(value: number) {
    const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
    const borderRight = borderLeft + this.limit;

    if (borderLeft < this.count && this.count <= borderRight) {
      super.next(value);
      this.count++;

      if (borderRight < this.count) {
        this.interval++;
      }
      return;
    }

    this.count++;
  }
}

function skipLimit(skip: number, limit: number) {
  return (source$: Observable<any>): Observable<any> => {
    return source$.lift({
      call(subscriber: Subscriber<unknown>, source: any) {
        source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit));
      }
    });
  };
}
