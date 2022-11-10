import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isAdmin: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
  }
  isLinkActive(url: any): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl =
      queryParamsIndex === -1
        ? this.router.url
        : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
  }
}
