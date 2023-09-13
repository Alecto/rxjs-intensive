import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, Observable, shareReplay, switchMap, timer, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uniqNameSequence$!: Observable<any>;

  constructor(private http: HttpClient) { }

  getNames() {
    if (!this.uniqNameSequence$) {
      this.uniqNameSequence$ = timer(0, 10000)
        .pipe(
          switchMap(() => {
            return this.http.get('https://jsonplaceholder.typicode.com/users')
              .pipe(
                concatMap((res: any) => res),
                map((res: any) => res.name),
                toArray(),
                shareReplay()
              );
          }),
          shareReplay()
        );
    }

    return this.uniqNameSequence$;
  }

}
