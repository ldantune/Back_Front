import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './views/people/people.component';
import { ProductsComponent } from './views/products/products.component';
import { DepartmentComponent } from './views/department/department.component';
import { DepartmentFormComponent } from './views/department/department-form/department-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [PeopleComponent, ProductsComponent, DepartmentComponent, DepartmentFormComponent],
  entryComponents: [DepartmentFormComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
