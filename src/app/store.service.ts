import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private topology: Subject<string | null> = new BehaviorSubject<string | null>(null);

  public constructor() {
    let hash = window.location.hash;
    if (hash) {
      if (hash.startsWith('#')) {
        hash = hash.substr(1);
      }
      try {
        let topology = atob(hash);
        this.topology.next(topology);
      } catch (e) {
        console.error('Unable to read topology from url', hash, e);
      }
    }
  }

  public clearTopology() {
    this.topology.next(null);
    window.location.hash = '';
  }

  public setTopology(topology: string) {
    this.topology.next(topology);
    // window.location.hash = btoa(topology);
  }

  public getTopology(): Observable<string | null> {
    return this.topology;
  }

}
