import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void { }

  ngAfterViewInit() { }

}
