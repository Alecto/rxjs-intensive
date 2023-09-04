import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // iterator pattern

    // class CustomIterator {
    //   cursor: number = 0;
    //   value!: number;
    //
    //   constructor(private arr: number[], private divisor: number = 3) {}
    //
    //   next() {
    //     while (this.cursor < this.arr.length) {
    //       this.value = this.arr[this.cursor++];
    //
    //       if (this.value % this.divisor === 0) {
    //         return {
    //           done: false,
    //           value: this.value
    //         };
    //       }
    //     }
    //
    //     return {
    //       done: true,
    //       value: this.value
    //     };
    //   }
    //
    //   [Symbol.iterator]() {
    //     return {
    //       next: this.next.bind(this)
    //     };
    //   }
    // }
    //
    // const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    // console.log(consumer.next());
    // console.log(consumer.next());
    // console.log(consumer.next());
    // console.log(consumer.next());
    // console.log(consumer.next());

    // Array.from(consumer).forEach((v) => console.log(v));

    // Marble-диаграмма
    // ---1---2---3---4---5---6---7---8---9---10---11---12---
    // -----------3-----------6-----------9-------------12---

    // observer pattern

    interface ListenerInterface {
      next(message: string): void;
    }

    class Producer {
      private listeners: ListenerInterface[] = [];

      subscribe(listener: ListenerInterface) {
        const index = this.listeners.push(listener);
        return {
          unsubscribe: () => {
            this.listeners.splice(index - 1, 1);
          }
        };
      }

      notify(message: string) {
        this.listeners.forEach(listener => {
          listener.next(message);
        });
      }
    }

    const listener1 = {
      next(message: string) {
        console.log('Listener 1', message);
      }
    };
    const listener2 = {
      next(message: string) {
        console.log('Listener 2', message);
      }
    };

    const notifier = new Producer();

    const subscription1 = notifier.subscribe(listener1);
    const subscription2 = notifier.subscribe(listener2);

    notifier.notify('Notify message');

    subscription1.unsubscribe();

    setTimeout(() => {
      notifier.notify('Notify after unsubscribe');
    }, 3000);

    // ReactiveX = iterator + observer + fn

  }

}
