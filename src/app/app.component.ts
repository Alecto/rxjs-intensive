import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    class CustomIterator {
      cursor: number = 0;
      value!: number;

      constructor(private arr: number[], private divisor: number = 3) {}

      next() {
        while (this.cursor < this.arr.length) {
          this.value = this.arr[this.cursor++];

          if (this.value % this.divisor === 0) {
            return {
              done: false,
              value: this.value
            };
          }
        }

        return {
          done: true,
          value: this.value
        };
      }

      [Symbol.iterator]() {
        return {
          next: this.next.bind(this)
        };
      }
    }

    const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    console.log(consumer.next());
    console.log(consumer.next());
    console.log(consumer.next());
    console.log(consumer.next());
    console.log(consumer.next());

  }

}
