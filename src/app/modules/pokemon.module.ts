import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SearchPokemonPipe } from '../pipes/search-pokemon.pipe';
import { SearchProductPipe } from '../pipes/search-product.pipe';
import { ProductGuard } from '../product-list/product.guard';
import { JoinPipe } from '../pipes/join.pipe';
import { AppComponent } from '../app.component';
import { MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    CreateProductComponent,
    ProductListComponent,
    SearchPokemonPipe,
    SearchProductPipe,
    JoinPipe,
    NavigationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [UserService, ProductGuard],
  bootstrap: [AppComponent],
})
export class PokemonModule { }
