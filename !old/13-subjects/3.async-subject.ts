import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncSubject, map, Observable } from 'rxjs';
import { ajax } from 'rxjs/internal/ajax/ajax';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: ``,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  items$!: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.items$ = this.getItems('https://jsonplaceholder.typicode.com/users')
      .pipe(map((res: any) => res.response));

    this.items$.subscribe((value: any) => {
      console.log('subscribe #1', value);
    });

    setTimeout(() => {
      this.items$.subscribe((value: any) => {
        console.log('subscribe #2', value);
      });
    }, 5000);

  }

  ngAfterViewInit() { }

  private getItems(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable(subscriber => {
      if (!subject) {
        subject = new AsyncSubject();
        console.log(this.http.get(url)); // Observable {source: Observable, operator: ƒ}
        console.log(ajax(url)); // Observable {_subscribe: ƒ}
        ajax(url).subscribe(subject);
      }
      return subject.subscribe(subscriber);
    });
  }

}
