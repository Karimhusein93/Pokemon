import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path:'',component:PokemonListComponent},
  { path:'detail/:name',component:PokemonDetailComponent},
  { path:'create-product',component:CreateProductComponent},
  { path:'product-list',component:ProductListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
