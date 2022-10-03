import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isAdmin: any;
  // links = ['#home', '#detail', '#create-product', '#product-list'];
  // titles = ['Home', 'Detail', 'Create Product', 'Product List'];
  // activeLink = this.links[0];
  title="Pokemon";
  registrationForm: FormGroup;
	
  constructor(private userService: UserService,public router: Router) { 
    
    
 } 
 userForm = new FormGroup({
  pokemon: new FormControl('', [Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]),
});

get pokemon() {
  return this.userForm.get('pokemon');
}
 ngOnInit() {
  this.isAdmin = this.userService.isAdmin;
  
 }
}