import { Component, OnInit } from '@angular/core';
import { interval, map, tap } from 'rxjs';

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

    /**
     * marble-диаграмма
     *
     * sequence1$
     * ---0---1---2---3---4---5---
     *
     *   tap(v => console.log(v))
     *   map(x => x ** 2)
     *
     * sequence1$
     * ---0---2---4---9---16---25---
     *
     */

    sequence1$
      .pipe(
        tap(value => {
          console.log('tap', value);
          this.sideEffectProps = value;
        }),
        map(x => x ** 2)
      )
      .subscribe(value => {
        console.log('sideEffectProps', this.sideEffectProps);
        console.log(value);
      });

  }

}
