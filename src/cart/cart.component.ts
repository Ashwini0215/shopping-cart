import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'cart-app',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];
  searchVal = '';
  countVal: any = 1;
  price: any = 0;
  discount: any = 0;
  totalPayableVal = 0;

  constructor(private itemService: ItemService) { }
  getItemsForCart(): void {
    this.cartItems = this.itemService.getSelectedItems();
  }
  ngOnInit(): void {
    this.getItemsForCart();
    this.calculatePrice();
    this.calculateDiscount();
    this.totalPayable();
  }
  removeItemFromCart(id:number): void {
    this.itemService.removeItem(id);
  }
  calculateDiscountPercentage(cost, discount) {
    return (100 * discount) / cost;
  }
  calculatePrice2(cost) {
    return this.countVal * cost;
  }
  calculatePrice() {
    var result = [];
    this.cartItems.forEach(function (input) {
      result.push(input.price);
    });
    for(var i=0;i<result.length;i++)
    {
      this.price += Number(result[i]) * this.countVal;
    }
    return this.price;
    console.log("results",this.price);
  }
  calculateDiscount() {
    var result = [];
    this.cartItems.forEach(function (input) {
      result.push(input.discount);
    });
    for(var i=0;i<result.length;i++)
    {
      this.discount += Number(result[i]) * this.countVal;
    }
    return this.discount;
  }

  totalPayable() {
    this.totalPayableVal = this.price - this.discount;
    return  this.totalPayableVal;
  }
}



