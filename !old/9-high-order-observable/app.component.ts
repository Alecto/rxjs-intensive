import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { exhaustMap, fromEvent } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <input type="text" #input>
  `,
  imports: [CommonModule, HttpClientModule],
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    // Постановка проблемы - вложенные Observable:
    // interval(2000)
    //   .pipe(
    //     map(v => {
    //       return of(v * 2);
    //     })
    //   )
    //   .subscribe(res => {
    //     res.subscribe(value => {
    //       console.log(value);
    //     });
    //   });

  }

  ngAfterViewInit() {

    const sequence$ = fromEvent<InputEvent>(this.input.nativeElement, 'input');

    sequence$.pipe(
      // debounceTime(500),
      // map + mergeAll = mergeMap
      // map + switchAll = switchMap
      // map + concatAll = concatMap, равно mergeMap(..., 1), где concurrent = 1
      // map + exhaustAll = exhaustMap
      exhaustMap(e => {
        const value = (e.target as HTMLInputElement).value;
        return fetch(`/assets/data.json`).then(res => res.json());
        // return this.http.get(`https://api.github.com/search/repositories?q=${value}`);
      })
    ).subscribe(
      value => {
        console.log(value);
      }
    );

  }

}
