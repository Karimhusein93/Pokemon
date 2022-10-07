import { XhrFactory } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  list:any =[];
  productList:any =[];
  isValid:false;
  query: string;
  constructor(private productListService :ProductListService) { }

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem("form"))
    this.productList.push(this.list);
  }

}
