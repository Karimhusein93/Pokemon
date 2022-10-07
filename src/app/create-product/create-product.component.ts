import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category';
import { PhoneType } from '../phone-type';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
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

  constructor(
    public builder: FormBuilder,
    private productListService: ProductListService
  ) {}

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
        image: ['', [Validators.required, Validators.pattern(this.reg)]],
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
    this.products.clear()
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
      image: ['', [Validators.required, Validators.pattern(this.reg)]],
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
  }
  saveProducts() {
    const valueToKeep = this.products.at(this.products.length - 1);
    this.productsList = this.products;
    this.productsList.removeAt(this.productsList.length - 1);
    // this.productListService.sharedValue.next(this.productsList.value)
    localStorage.setItem('form', JSON.stringify(this.productsList.value));
    this.products.clear();
    this.products.push(valueToKeep);
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
