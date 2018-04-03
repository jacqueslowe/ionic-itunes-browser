import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TabService {
    currentTab = null;
    
    private tabSubject: Subject<string>;
    private streamTab$: Observable<string>;
   
    constructor() {
        this.tabSubject = new Subject();
        this.streamTab$ = this.tabSubject.map(x=>x);
    }
   
    getTabStream()
    {
        return this.streamTab$;
    }
    setCurrentTab(tab:any) {
        this.currentTab = tab;
       
        this.tabSubject.next(this.currentTab);
    }
}