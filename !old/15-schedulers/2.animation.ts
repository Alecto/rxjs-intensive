import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { animationFrameScheduler, defer, interval, map, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: `
    <div #container></div>
  `,
  styles: [`
    div {
      background-color: red;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {

    const div = this.container.nativeElement as HTMLDivElement;

    // const sequence$ = interval(0, animationFrameScheduler).pipe(take(800));
    //
    // sequence$.subscribe(value => {
    //   div.style.transform = `translate3d(0, ${value}px, 0)`;
    // });

    this.animationWave(div).subscribe({
      complete: () => console.log('completed')
    });

  }

  animationWave(element: HTMLDivElement) {
    return this.duration(20000)
      .pipe(
        map(this.animationFn),
        map(this.distance(200)),
        tap(frame => element.style.transform = `translate3d(0, ${frame}px, 0)`)
      );
  }

  private msElapsed(schedule = animationFrameScheduler) {
    return defer(() => {
      const start = schedule.now();

      return interval(0, animationFrameScheduler)
        .pipe(
          map(() => schedule.now() - start)
        );
    });
  }

  private duration(ms: number, schedule = animationFrameScheduler) {
    return this.msElapsed(schedule)
      .pipe(
        map(time => time / ms),
        takeWhile(percentage => percentage <= 1)
      );
  }

  private distance(px: number) {
    return (percentage: number) => percentage * px;
  }

  private animationFn = (percentage: number) => {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
  };

}
