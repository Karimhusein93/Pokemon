import { Component } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  value :string = '';
  isAdmin: any;
  // links = ['#home', '#detail', '#create-product', '#product-list'];
  // titles = ['Home', 'Detail', 'Create Product', 'Product List'];
  // activeLink = this.links[0];
  // title="Pokemon";

	
  constructor(private userService: UserService) {
    
 } 
 ngOnInit() {
  this.isAdmin = this.userService.isAdmin;

}
}