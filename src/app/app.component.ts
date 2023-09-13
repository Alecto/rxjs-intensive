import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    // console.log('start');
    // setTimeout(() => console.log('timer 1'));
    // setTimeout(() => console.log('timer 2'));
    // Promise.resolve().then(() => console.log('promise 1'));
    // Promise.resolve().then(() => console.log('promise 2'));
    // console.log('end');

    // мАкрозадача 1 (весь скрипт)
    //              -> мАкрозадача 2 (setTimeout #1)
    //              -> мАкрозадача 3 (setTimeout #2)
    //              -> мИкрозадача 1 (Promise #1)
    //              -> мИкрозадача 2 (Promise #2)
    // это все выполняется в мАкрозадача 1

    // мАкрозадача 1:     start
    //                    end
    //     мИкрозадача 1: promise 1
    //     мИкрозадача 2: promise 2
    // мАкрозадача 2:     timer 1
    // мАкрозадача 3:     timer 2

    // -----------------------------

    // console.log('start');
    // of(1, 2, 3, 4).subscribe(console.log);
    // console.log('end');

    // 1. синхронный код (callstack)    -> queueScheduler
    // 2. очередь микрозадач (Promise)  -> asapScheduler
    // 3. очередь макрозадач (setTimeout, setInterval, XHR...) -> asyncScheduler
    // 4. requestAnimationFrame         -> animationFrameScheduler
    //    еще может быть... VirtualTimeScheduler, TestScheduler

    console.log('start');
    of(1, 2, 3, 4).subscribe(console.log);
    console.log('end');

    // start
    // 1
    // 2
    // 3
    // 4
    // end

  }

  ngAfterViewInit() { }

}
