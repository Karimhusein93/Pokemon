import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  list: any = [];
  query: '';
  imageUrl: '';
  constructor(public router: Router, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem('form'));
    this.imageExists();
  }
  imageExists() {
    for (let i = 0; i < this.list.length; i++) {
      this.httpClient.get(this.list[i].image).subscribe(
        () => {},
        (err) => {
          if (err.status === 404) {
            this.list[i].isImageValid = false;
          } else {
            this.list[i].isImageValid = true;
          }
        }
      );
    }
  }
}
