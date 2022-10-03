import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { PhoneType } from '../phone-type';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categories: Category[] = [
    {value: 'electronics', viewValue: 'Electronics'},
    {value: 'clothes', viewValue: 'Clothes'},
    {value: 'blankets', viewValue: 'Blankets'},
  ];
  phoneTypes: PhoneType[] = [
    {value: 'mobile', viewValue: 'Mobile'},
    {value: 'landline', viewValue: 'Landline'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
