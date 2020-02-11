import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { ItemService } from '../services/item.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Options } from 'ng5-slider';

@Component({
  selector: 'store-app',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  isLoader = true;
  isSearch = false;
  searchVal = '';
  storeItems: Item[] = [];
  newStoreItem: any;
  errorMessage: string;
  storeItemsFilter: Item[] = [];
  value = 100;
  highValue = 1000;
  options: Options = {
    floor: 100,
    ceil: 1000,
    minRange: 100,
    step: 100
  };
  isApply = false;
  constructor(private itemService: ItemService,private orderPipe: OrderPipe) { }
  getStoreItems(): void {
    this.itemService.getItems().subscribe(
      data => this.storeItems = data,
      error =>  this.errorMessage = <any>error);
  }
  ngOnInit(): void {
    this.getStoreItems();
    this.applyRange()
  }
  addItemInCart(id:number): void {
    this.itemService.addItem(id);
  }
  calculateDiscountPercentage(cost, discount) {
    return (100 * discount) / cost;
  }
  toggleSearch(){
    this.isSearch = this.isSearch == true ? false : true;
  }
  sortBy(condition) {
    if(condition && condition === "LH") {
      this.storeItems  = this.orderPipe.transform(this.storeItems, 'price');
    } else if (condition && condition === "HL") {
      var desOrder= this.orderPipe.transform(this.storeItems, 'price');
      this.storeItems  = desOrder.reverse();
    } else if (condition && condition == "D") {
      this.storeItems = this.orderPipe.transform(this.storeItems, 'discount');
    }
  }


  applyRange() {
    this.storeItemsFilter = this.itemService.getItemsMock();
    var minVal : any = this.value;
    var maxVal : any= this.highValue;
    console.log(minVal ,"called", maxVal );
    var result = [];
     this.storeItemsFilter.forEach(function (input) {
      if (input.price >= minVal && input.price <= maxVal)
      {result.push(input);}
    });
    this.storeItems  = result;
  }
}



