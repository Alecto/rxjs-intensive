import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, iif, map, merge, Observable, of, switchMap, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  init(): void {
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
      switchMap((event: MouseEvent | TouchEvent) => {
        return iif(
          () => event instanceof TouchEvent,
          of((event as TouchEvent)).pipe(map(e => e.changedTouches[0].clientX)),
          of((event as MouseEvent)).pipe(map((e => e.clientX)))
        );
      })
      // map((event: MouseEvent | TouchEvent) => {
      //   if (event instanceof TouchEvent) {
      //     return event.changedTouches[0].clientX;
      //   }
      //   return event.clientX;
      // })
    );
  }

  private swipe(source$: Observable<[number, number]>) {
    return source$.pipe(
      map(([x, y]) => y - x)
    );
  }

}
