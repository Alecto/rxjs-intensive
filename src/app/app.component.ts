import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // const sequence = new Promise(resolve => {
    //   let count = 1;
    //   setInterval(() => {
    //     resolve(count++);
    //   }, 1000);
    // });
    // sequence.then(console.log);
    // sequence.then(console.log);

    // const sequence = function* iteratorFn() {
    //   let count = 1;
    //   while (true) {
    //     yield count++;
    //   }
    // }();
    // console.log(sequence.next().value);
    // console.log(sequence.next().value);
    // console.log(sequence.next().value);
    // console.log(sequence.next().value);
    // console.log(sequence.next().value);

    interval(1000).subscribe(console.log);

  }

}
