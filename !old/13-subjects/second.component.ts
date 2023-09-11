import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Second Component</h1>`,
  styles: [``]
})
export class SecondComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData().subscribe(value => {
      console.log(value);
    });
  }

}
