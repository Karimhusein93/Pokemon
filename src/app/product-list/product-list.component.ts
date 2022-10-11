import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  list: any = [];
  query: '';
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem('form'));
  }
  imageExists(image_url: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', image_url, false);
    xhr.send();

    if (xhr.status === 404) {
      return false;
    } else {
      return true;
    }
  }
  }
