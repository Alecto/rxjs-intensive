import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { DragAndDropService } from './drag-and-drop.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div #draggable class="draggable"></div>
  `,
  styles: [`
    .draggable {
      position: absolute;
      width: 200px;
      height: 200px;
      background-color: tomato;
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('draggable') box!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private dds: DragAndDropService) {}

  ngOnInit(): void { }

  ngAfterViewInit() {

    const box = this.box.nativeElement as HTMLDivElement;

    const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
    const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');
    const mousemove$ = fromEvent<MouseEvent>(box, 'mousemove');

    this.dds.dragDrop(mousedown$, mouseup$, mousemove$)
      .subscribe(pos => {
        box.style.left = `${pos.left}px`;
        box.style.top = `${pos.top}px`;
      });

  }

}
