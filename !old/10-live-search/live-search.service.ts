import { Injectable } from '@angular/core';
import {
  bufferCount,
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  reduce,
  switchMap
} from 'rxjs';
import { GithubItemInterface } from './github-item.interface';
import { GithubResponseInterface } from './github-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LiveSearchService {

  constructor() { }

  liveSearch(source$: Observable<InputEvent>, request: (text: string) => Observable<string>) {
    return source$.pipe(
      debounceTime(500),
      map((e: Event) => (e.target as HTMLInputElement).value.trim()),
      filter(value => value.length > 3),
      distinctUntilChanged(),
      switchMap(request)
    );
  }

}

export function createCard({name, description, owner: {avatar_url}}: GithubItemInterface) {
  return `
        <div class="col-4">
          <div class="card">
            <img class="card-img-top" src="${avatar_url}" alt="${name}">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description}</p>
            </div>
          </div>
        </div>
    `;
}

export function createRow(htmlString: string[]): string {
  return `
      <div class="row">
        ${htmlString.join('')}
      </div>
    `;
}

export function request(source$: Observable<GithubResponseInterface>) {
  return source$.pipe(
    concatMap(res => res.items),
    map(createCard),
    bufferCount(3),
    reduce((resultString: string, htmlStrings: string[]) => {
      return resultString += createRow(htmlStrings);
    }, ''),
    map(htmlString => htmlString.trim()),
    catchError(error => {
      console.log('CATCH error:', error);
      return EMPTY;
    })
  );
}
