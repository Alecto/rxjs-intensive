import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, map, merge, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    this.swipe(zip(
      this.getX(
        fromEvent<TouchEvent>(document, 'touchstart'),
        fromEvent<MouseEvent>(document, 'mousedown')
      ),
      this.getX(
        fromEvent<TouchEvent>(document, 'touchend'),
        fromEvent<MouseEvent>(document, 'mouseup')
      )
    )).subscribe(direction => {
      if (direction < 100) {
        console.log('swipe left');
        return;
      }
      console.log('swipe right');
    });

  }

  private getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>): Observable<number> {
    return merge(source1$, source2$).pipe(
      map((event: MouseEvent | TouchEvent) => {
        if (event instanceof TouchEvent) {
          return event.changedTouches[0].clientX;
        }
        return event.clientX;
      })
    );
  }

  private swipe(source$: Observable<[number, number]>) {
    return source$.pipe(
      map(([x, y]) => y - x)
    );
  }

}
