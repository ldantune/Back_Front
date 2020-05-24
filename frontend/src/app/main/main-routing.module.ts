import { ProductsComponent } from './views/products/products.component';
import { PeopleComponent } from './views/people/people.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './views/department/department.component';


const routes: Routes = [
  {path: '', redirectTo: 'people'},
  {path: 'people', component: PeopleComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'departments', component: DepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
