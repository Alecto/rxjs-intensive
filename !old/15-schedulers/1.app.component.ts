import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { observeOn, queueScheduler, Subject, take } from 'rxjs';

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

    // console.log('start');
    // // deprecated of(1, 2, 3, 4, async).subscribe(console.log);
    // scheduled([1, 2, 3, 4], asyncScheduler).subscribe(console.log);
    // console.log('end');

    // start
    // end --- порядок изменился
    // 1
    // 2
    // 3
    // 4


    // Задача #1
    // const a$ = from([1, 2]);
    // const a$ = scheduled([1, 2], asapScheduler);
    // const b$ = of(10);
    // const c$ = combineLatest([a$, b$])
    //   .pipe(
    //     map(([a, b]) => a + b)
    //   );
    //
    // c$.subscribe(console.log); // 11, 12

    // Задача #2
    const signal = new Subject<number>();
    let count = 0;
    const calc = (count: number) => console.log('Calc:', count);

    console.log('start');

    signal.pipe(
      observeOn(queueScheduler), // порядок в цепочке операторов pipe важен!
      take(10000)
      // subscribeOn(queueScheduler) // порядок не важен, оператор применяется один раз на подписку
    ).subscribe(value => {
      calc(value);
      signal.next(value++);
    });

    signal.next(count++);
    console.log('end');

  }

  ngAfterViewInit() { }

}
