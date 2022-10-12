import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  list: any = [];
  query: '';
  imageUrl: '';
  isValid: boolean;
  constructor(
    public router: Router,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem('form'));
    this.imageExists();
  }
  imageExists() {
    var xhr = new XMLHttpRequest();
    for (let i = 0; i < this.list.length; i++) {
      xhr.open('HEAD', this.list[i].image, false);
      xhr.send();

      if (xhr.status === 404) {
        this.list[i].isImageValid = false;
      } else {
        this.list[i].isImageValid = true;
      }
    }
  }
}
