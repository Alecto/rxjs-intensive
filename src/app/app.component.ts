import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container py-5">
      <div class="slider">
        <input #quality type="range" class="form-range" min="0" max="100" id="quality">
        <input #rating type="range" class="form-range" min="0" max="100" id="rating">
        <input #actual type="range" class="form-range" min="0" max="100" id="actual">
      </div>
    </div>
  `,
  styles: [`
    .slider {
      max-width: 400px;
      padding: 30px;
      border: 2px solid lightsteelblue;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {


  }

}
