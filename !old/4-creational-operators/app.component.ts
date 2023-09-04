import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // of('abc').subscribe(console.log);
    // of(1, 2, 3, 4, 5).subscribe(console.log);
    // это холодный конечный поток

    // from([1, 2, 3, 4, 5]).subscribe(console.log);
    // from(fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())).subscribe(console.log);
    // это холодный конечный поток

    // iif(
    //   () => Math.random() > 0.5, // ф-я возвращает boolean
    //   of('value > 0.5'), // Observable, если true
    //   of('value < 0.5') // Observable, если false
    // ).subscribe(console.log);

    // defer(() => {
    //   return Math.random() > 0.5
    //     ? Math.random() > 0.8
    //       ? of('value > 0.8')
    //       : of('0.5 > value < 0.8')
    //     : of('value <= 0.5');
    // }).subscribe(console.log);

    // ajax('https://jsonplaceholder.typicode.com/posts')
    //   .subscribe(res => console.log(res.response));

    // fromEvent(document, 'click').subscribe(console.log);

  }

}
