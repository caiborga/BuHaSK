import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuItemsService {

    private items = new BehaviorSubject<any>([]);
    additionalMenuItems = this.items.asObservable();

    constructor() { }

    changeData(newData: any) {
        this.items.next(newData);
    }
}
