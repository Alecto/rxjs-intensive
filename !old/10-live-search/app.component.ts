import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveSearchService, request } from './live-search.service';
import { fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GithubResponseInterface } from './github-response.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container py-5">
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="search" class="form-label">Поиск</label>
            <input #input id="search" type="search" class="form-control" placeholder="Начните вводить текст...">
          </div>
        </div>
      </div>
    </div>
    <div class="container" #container></div>
  `,
  styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private lss: LiveSearchService, private http: HttpClient) {}

  ngOnInit(): void { }

  ngAfterViewInit() {

    const sequence$ = this.lss.liveSearch(
      fromEvent<InputEvent>(this.input.nativeElement, 'input'),
      (value: string) => request(this.http.get<GithubResponseInterface>(`https://api.github.com/search/repositories?q=${value}`))
    );

    sequence$.subscribe(htmlString => {
      this.container.nativeElement.innerHTML = htmlString;
    });

  }

}
