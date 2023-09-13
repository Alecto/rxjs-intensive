import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { connectable, interval } from 'rxjs';

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

    // const control = new Subject();
    //
    // const sequence$ = interval(1000).pipe(
    //   multicast(control)
    //   refCount()
    //   publish()  // multicast + control
    // ) as ConnectableObservable<any>;

    const sequence$ = connectable(interval(1000)); // multicast + control => (new Subject())

    sequence$.connect();

    sequence$.subscribe(v => {
      console.log('Subscription #1', v);
    });

    setTimeout(() => {
      sequence$.subscribe(v => {
        console.log('Subscription #2', v);
      });
    }, 5000);

  }

  ngAfterViewInit() { }

}
