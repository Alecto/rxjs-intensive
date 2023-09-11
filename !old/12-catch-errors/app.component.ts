import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError, EMPTY, fromEvent, interval, map, of, switchMap, tap, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {


  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

    const sequence1$ = interval(1000);
    const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

    const sequence$ = zip(sequence1$, sequence2$);

    fromEvent(this.document, 'click')
      .pipe(
        tap(() => console.log('Я кликнул мышкой ~ работаю с паролем')),
        switchMap(() => {
          return sequence$.pipe(switchMap(([_, y]: [number, number | string]) => {
            return of(y).pipe(
              map(y => (y as any).toUpperCase()),
              catchError((err, source) => {
                console.log('catchError', err);
                return EMPTY;
              })
            );
          }));
        })
        // Некорректный вариант обработки ошибки - поток завершается.
        // catchError((err, source) => {
        //   console.log('catchError', err);
        //   return EMPTY;
        // })
      )
      .subscribe({
        next: v => {
          console.log(v);
        },
        error: (err) => console.log(err),
        complete: () => console.log('completed')
      });

  }

  ngAfterViewInit() { }

}
