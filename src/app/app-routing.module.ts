import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGuard } from './product-list/product.guard';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'detail', component: PokemonDetailComponent },
  { path: 'detail/:name', component: PokemonDetailComponent },
  { path: 'create-product', component: CreateProductComponent },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [ProductGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
