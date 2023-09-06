import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<input type="text" #input>`,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('input')
  input!: ElementRef;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const el = this.input.nativeElement as HTMLInputElement;

    fromEvent<InputEvent>(el, 'input')
      .pipe(
        debounceTime(1000),
        map(e => (e.target as HTMLInputElement).value)
      )
      .subscribe(value => {
        console.log(value);
      });
  }

}
