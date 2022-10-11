import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isAdmin: any;
  title="Pokemon";
	
  constructor(private userService: UserService) { 
 }
 ngOnInit() {
  this.isAdmin = this.userService.isAdmin;
  
 }
}