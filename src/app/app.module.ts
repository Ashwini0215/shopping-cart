import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemService } from '../services/item.service';
import {StoreComponent} from '../store/store.component';
import {CartComponent} from '../cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { ListFilterPipe } from '../store/listfilter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import {MatSliderModule} from '@angular/material/slider';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    CartComponent,
    RoutingComponent,
    ListFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    MatSliderModule,
    Ng5SliderModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
