import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwipeService } from './swipe.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private swipe: SwipeService) {}

  ngOnInit(): void {
    this.swipe.init();
  }

  ngAfterViewInit() {


  }

}
