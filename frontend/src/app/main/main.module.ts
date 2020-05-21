import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './views/people/people.component';
import { ProductsComponent } from './views/products/products.component';


@NgModule({
  declarations: [PeopleComponent, ProductsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
