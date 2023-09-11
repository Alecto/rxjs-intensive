import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    const sequence$ = new AsyncSubject();

    sequence$.subscribe(value => {
      console.log('subscribe #1', value);
    });

    setTimeout(() => {
      sequence$.complete();
      sequence$.subscribe(value => {
        console.log('subscribe #2', value);
      });
    }, 5000);

    sequence$.next(1);
    sequence$.next(2);
    sequence$.next(3);
    sequence$.next(4);

  }

  ngAfterViewInit() { }

}
