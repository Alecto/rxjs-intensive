import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private controlSequence$$ = new BehaviorSubject({});
  private controlSequence$$ = new ReplaySubject(4);

  constructor() { }

  getData() {
    return this.controlSequence$$.asObservable();
  }

  setData(data: any) {
    this.controlSequence$$.next(data);
  }

}
