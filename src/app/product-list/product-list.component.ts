import { XhrFactory } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  list: any = [];
  isValid: false;
  query: string;
  constructor() {}

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
