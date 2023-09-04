import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello</h1>`,
  styles: [``]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // бесконечный холодный поток
    //
    // const sequence$ = new Observable(subscriber => {
    //   let count = 1;
    //   const intervalID = setInterval(() => {
    //     if (count % 5 === 0) {
    //       clearInterval(intervalID);
    //       subscriber.complete();
    //       return;
    //     }
    //     subscriber.next(count++);
    //   }, 1000);
    //
    //   return () => {
    //     console.log('unsubscribe');
    //     clearInterval(intervalID);
    //     subscriber.complete();
    //   };
    // });

    // const sequence$ = interval(1000);
    //
    // const subscription = sequence$.subscribe(res => {
    //   console.log('Subscription #1', res);
    // });
    //
    // setTimeout(() => {
    //   subscription.unsubscribe();
    //   sequence$.subscribe(res => {
    //     console.log('Subscription #2', res);
    //   });
    // }, 3000);

    // ------------------
    
    // бесконечный горячий поток

    const sequence$ = fromEvent<MouseEvent>(document, 'click');

    const subscription = sequence$.subscribe(value => {
        console.log('Subscription #1', value.clientX);
      }
    );

    setTimeout(() => {
      sequence$.subscribe(value => {
          console.log('Subscription #2', value.clientX);
        }
      );
    }, 5000);

    // youtube => холодный
    // tv      => горячий

  }

}
