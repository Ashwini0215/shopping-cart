import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item } from './item';
import { ITEMS } from './mock-items';

@Injectable()
export class ItemService {
  observableItems: any;
  allItems: Item[] = [];
  selectedItems: Item[] = [];
  errorMessage: string;
  url = "https://api.myjson.com/bins/qzuzi";
  constructor(private http: HttpClient) {
    this.observableItems =  this.http.get(this.url).pipe(map((res => res)));

    this.observableItems.subscribe(
      data => this.allItems = data,
      error =>  this.errorMessage = <any>error);
  }
  getItems(): Observable<Item[]> {
    return this.observableItems;
  }
  getItemsMock(): Item[] {
    return ITEMS;
  }
  getSelectedItems(): Item[] {
    return this.selectedItems;
  }
  addItem(id:number): void {
    let item = this.allItems.find(ob => ob.id === id);
    if (this.selectedItems.indexOf(item) < 0) {
      this.selectedItems.push(item);
    }
  }
  removeItem(id:number): void {
    let item = this.selectedItems.find(ob => ob.id === id);
    let itemIndex = this.selectedItems.indexOf(item);
    this.selectedItems.splice(itemIndex, 1);
  }
}





