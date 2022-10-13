import { Component } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isAdmin: any;
  title="Pokemon";
	activeState = 'Home';

  setStateAsActive(state:string) {
    this.activeState = state;
  }
  constructor(private userService: UserService) { 
 }
 
 ngOnInit() {
  this.isAdmin = this.userService.isAdmin;
  
 }
}