import { Component, OnInit } from '@angular/core';
import { filter, first, interval, map, skip, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  sideEffectProps!: any;

  ngOnInit(): void {

    const sequence1$ = interval(1000);

    sequence1$
      .pipe(
        map(x => ({value: x} as any)),
        tap(console.log),
        // pluck('value'), // deprecated и будет удален в 8 версии
        map(o => o.value),
        tap(value => console.log('tap', value)),
        filter(x => x % 2 === 0),
        map(x => x ** 2),
        skip(2),
        // take(1)
        first()
      )
      .subscribe({
        next: value => {
          console.log(value);
        }
        // error: () => {},
        // complete: () => 'completed'
      });


    /**
     * marble-диаграмма
     *
     * sequence1$
     * ---0---1---2---3---4---5---
     *
     *   tap(v => console.log(v))
     * ---0---1---2---3---4---5---
     *
     *   filter(x => x % 2 === 0)
     * ---0-------2-------4-------
     *
     *   map(x => x ** 2)
     * ---0-------4-------16------
     *
     *   skip(2)
     * -------------------16------
     *
     *   take(1)
     * -------------------16------
     *
     *   first()
     * -------------------16|
     */


  }

}
