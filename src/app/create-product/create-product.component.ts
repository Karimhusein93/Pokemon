import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { PhoneType } from '../phone-type';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  categories: Category[] = [
    { id: 1, value:'Electronics' },
    { id: 2, value: 'Clothes' },
    { id: 3, value: 'Blankets' },
  ];
  phoneTypes: PhoneType[] = [
    { id: 1, value: 'Mobile' },
    { id: 2, value: 'Landline' },
  ];
  productsList: FormArray<any>;
  
  constructor(public builder: FormBuilder) {}

  productForm =this.builder.group({
    products: this.builder.array([
      this.builder.group({
        name: ["",[
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z0-9]*$')]
         
        ],
        description: ["", [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z0-9]*$'),
        ]],
        price: ["", [
          Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
        ]],
        category: ['', [Validators.required]],
        image: ['', [
        Validators.required, Validators.pattern(this.reg)
         ]],
         phone: ['', [Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
         typeOfPhone:['']
        })
    ])
});

  ngOnInit(): void {
}
clearForm(){
  this.productForm.reset();
}
get products(){
  return this.productForm.controls["products"] as FormArray;
}
addNewProduct(){
  const form = this.builder.group({
    name: ["",[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[A-Za-z0-9]*$')]
     
    ],
    description: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[A-Za-z0-9]*$'),
    ]],
    price: ["", [
      Validators.required,
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
    ]],
    category: ['', [Validators.required]],
    image: ['', [
    Validators.required, Validators.pattern(this.reg)
     ]],
     phone: ['', [Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
     typeOfPhone:['']
  });
  this.products.push(form);
}
saveProducts(){
  this.productsList = this.products;
  this.productsList.removeAt(this.productsList.length-1)
  this.products.reset();

}
}
