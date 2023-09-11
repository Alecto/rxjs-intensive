import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { SecondComponent } from './second.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SecondComponent],
  template: `
    <app-second></app-second>
  `,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private data: DataService
  ) {}

  ngOnInit(): void {

    this.data.setData({
      name: 'John',
      age: 25
    });

    this.data.setData({
      name: 'Bob',
      age: 31
    });

    this.data.setData({
      name: 'Mary',
      age: 21
    });
    this.data.setData({
      name: 'Wiki',
      age: 18
    });

  }

  ngAfterViewInit() { }

}
