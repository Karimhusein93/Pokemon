import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../models/category';
import { PhoneType } from '../models/phone-type';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories: Category[] = [
    { id: 1, value: 'Electronics' },
    { id: 2, value: 'Clothes' },
    { id: 3, value: 'Blankets' },
  ];
  phoneTypes: PhoneType[] = [
    { id: 1, value: 'Mobile' },
    { id: 2, value: 'Landline' },
  ];
  productsList: FormArray<any>;
  lastIndex: number;

  constructor(public builder: FormBuilder) {}

  productForm = this.builder.group({
    products: this.builder.array([
      this.builder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[A-Za-z0-9]*$'),
          ],
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[A-Za-z0-9]*$'),
          ],
        ],
        price: [
          '',
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
        ],
        category: ['', [Validators.required]],
        image: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        typeOfPhone: [''],
      }),
    ]),
  });

  ngOnInit(): void {}

  clearForm() {
    const valueToKeep = this.products.at(this.products.length - 1);
    this.products.at(this.products.length - 1).reset();
    this.products.clear();
    this.products.push(valueToKeep);
  }
  get products() {
    return this.productForm.controls['products'] as FormArray;
  }
  addNewProduct() {
    const form = this.builder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z0-9]*$'),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z0-9]*$'),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      typeOfPhone: [''],
    });
    this.products.push(form);
    // this.products.push(this.productForm.controls.products)
  }
  saveProducts() {
    const valueToKeep = this.products.at(this.products.length - 1);
    this.productsList = this.products;
    localStorage.setItem('form', JSON.stringify(this.productsList.value));
    this.products.clear();
    this.products.push(valueToKeep);
    this.products.reset();
  }
  removeItem(index: any) {
    this.products.removeAt(index);
  }
  isLastIndex(index: number) {
    this.lastIndex = this.products.length - 1;
    if (index === this.lastIndex) {
      return false;
    }
    return true;
  }
}
