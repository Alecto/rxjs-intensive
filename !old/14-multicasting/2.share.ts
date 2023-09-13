import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { interval, share } from 'rxjs';

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

    const sequence$ = interval(1000).pipe(share()); // share = connectable + connect

    const sub1 = sequence$.subscribe(v => {
      console.log('Subscription #1', v);
    });

    setTimeout(() => {
      sub1.unsubscribe();
    }, 3000);

    setTimeout(() => {
      sequence$.subscribe(v => {
        console.log('Subscription #2', v);
      });
    }, 5000);

    setTimeout(() => {
      sequence$.subscribe(v => {
        console.log('Subscription #3', v);
      });
    }, 8000);

  }

  ngAfterViewInit() { }

}
