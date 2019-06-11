import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  productName: string;
  productPrice: number;
  productObj: any = { productName: '', productPrice: ''};
  productArray = [];
  productArrayCopy = [];
  editProductstatus = false;
  error: boolean;
  selectedIndex: number = null;
  cartArray = [];
  searchProductInput: string = null;
  selectedProductFromDropdown = {};
  proDetailArrayForFilterSelect = [];
  totalCartAmout = '';
  quantity = 1;

  constructor() { }

  ngOnInit() {
  }
  addProduct() {
    console.log('inside addProduct function', this.productObj);
    if (this.productObj.productName === '' || this.productObj.productPrice === '') {
      this.error = true;
      return false;
    }
    this.productArray.push(JSON.parse(JSON.stringify(this.productObj)));
    // this.productObj.productName = '';
    // this.productObj.productPrice = '';
    this.productObj = {
      productName: '',
      productPrice: ''
    };
  }
  editProduct(index) {
    console.log('inside edit product function', index);
    this.productObj = {
      productName: this.productArray[index].productName,
      productPrice: this.productArray[index].productPrice
    };
    this.editProductstatus = true;
    this.selectedIndex = index;
  }
  editProductdetails() {
    this.productArray[this.selectedIndex].productName = this.productObj.productName;
    this.productArray[this.selectedIndex].productPrice = this.productObj.productPrice;
    this.productObj = {
      productName: '',
      productPrice: ''
    };
    this.editProductstatus = false;
  }
  deleteProduct(index) {
    this.productArray.splice(index, 1);
  }
  cancelEdit() {
    this.productObj = {
      productName: '',
      productPrice: ''
    };
    this.editProductstatus = false;
  }
  searchSelection() {
    // console.log('inside searchSelection function', this.searchProductInput);
    this.proDetailArrayForFilterSelect = this.productArray.filter((element, i) => {
      // console.log('inside filter function ', element);
      // console.log('inside filter function index', i);
      if (element.productName.indexOf(this.searchProductInput) !== -1) {
         return true;
      }
    });
  }
  onSelectProduct(pIndex) {
    // console.log('pindex....', pIndex);
    this.searchProductInput = pIndex.productName + ' (₹ ' + pIndex.productPrice + ')' ;
    this.selectedProductFromDropdown = pIndex;
    this.proDetailArrayForFilterSelect = [];
  }
  addToCart() {
    // console.log('inside addToCart Fucntion.....', this.selectedProductFromDropdown);
    this.cartArray.push(JSON.parse(JSON.stringify(this.selectedProductFromDropdown)));
    this.cartArray.push({quantity: 1});
    console.log('inside cart array', this.cartArray);
    this.searchProductInput = '';
    let totalAmt = 0;
    for (let i = 0; i < this.cartArray.length; i++) {
        // console.log('inside for loop', this.cartArray[i].productPrice);
        let cartDataObject = this.cartArray[i];
        let productPrice = cartDataObject.productPrice;
        console.log('inside  product price', productPrice);
        totalAmt = totalAmt + parseInt(productPrice , 10);
    }
    this.totalCartAmout = totalAmt + '';
  }
}
