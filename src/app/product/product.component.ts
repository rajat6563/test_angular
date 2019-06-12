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
  selectedProductFromDropdown: any = {};
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
  onSelectProduct(productObj) {
    // console.log('pindex....', pIndex);
    this.searchProductInput = productObj.productName + ' (₹ ' + productObj.productPrice + ')' ;
    this.selectedProductFromDropdown = productObj;
    this.proDetailArrayForFilterSelect = [];
  }
  addToCart() {
    console.log('inside addToCart Fucntion.....', this.cartArray);
    console.log('this.selectedProductFromDropdown ===' , this.selectedProductFromDropdown);
    console.log('this.selectedProductFromDropdown ===' , this.selectedProductFromDropdown === {});
    console.log('this.selectedProductFromDropdown.productName ===' , this.selectedProductFromDropdown.productName);
    if (!this.selectedProductFromDropdown.hasOwnProperty('productName')) {
      return;
    }
    const selectedProductFromDropdownObj: any = {
      productName: this.selectedProductFromDropdown.productName,
      productPrice: this.selectedProductFromDropdown.productPrice,
      quantity: 1
    };
    // selectedProductFromDropdownObj.quantity = 1;
    let productUpdated = false;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.cartArray.length; j++) {
      console.log('inside for loopppp', this.selectedProductFromDropdown);
      console.log('inside for loopppp', this.cartArray[j]);
      console.log('inside for loopppp', this.cartArray[j].productName);
      // console.log('printing ', );
      if (this.cartArray[j].productName === selectedProductFromDropdownObj.productName) {
        // tslint:disable-next-line:radix
        this.cartArray[j].quantity =  parseInt(this.cartArray[j].quantity) + 1;
        this.cartArray[j].productPrice = parseInt(selectedProductFromDropdownObj.productPrice, 10) * this.cartArray[j].quantity;
        productUpdated = true;
      }
    }
    if (productUpdated === false) {
      this.cartArray.push(selectedProductFromDropdownObj);
    }
    console.log('inside cart array', this.cartArray);
    this.searchProductInput = '';
    this.selectedProductFromDropdown = {};
    this.getTotal();
  }

  getTotal() {
    let totalAmt = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartArray.length; i++) {
        // console.log('inside for loop', this.cartArray[i].productPrice);
        const cartDataObject = this.cartArray[i];
        const productPrice = cartDataObject.productPrice;
        console.log('inside  product price', productPrice);
        totalAmt = totalAmt + parseInt(productPrice , 10);
    }
    this.totalCartAmout = totalAmt + '';
  }
  decQuan(ind) {
    console.log('inside decrease quantity', this.cartArray[ind].quantity);
    if (this.cartArray[ind].quantity > 1) {
    let singlePrice = this.cartArray[ind].productPrice / this.cartArray[ind].quantity;
    console.log('single price', singlePrice);
    this.cartArray[ind].quantity = this.cartArray[ind].quantity - 1;
    this.cartArray[ind].productPrice = parseInt(this.cartArray[ind].productPrice) - singlePrice;
    console.log('price should decrease', this.cartArray[ind].productPrice);
    } else {
      this.cartArray.splice(ind, 1);

    }
    this.getTotal();
    }
  incQuan(ind) {
    console.log('inside increase quantity', this.cartArray[ind].quantity);
    let singlePrice = this.cartArray[ind].productPrice / this.cartArray[ind].quantity;
    console.log('single price increase If function', singlePrice);
    this.cartArray[ind].quantity = this.cartArray[ind].quantity + 1;
    this.cartArray[ind].productPrice = parseInt(this.cartArray[ind].productPrice) + singlePrice;
    console.log('inside increase quantity if condition', this.cartArray[ind].quantity);
    this.getTotal();
  }
}
