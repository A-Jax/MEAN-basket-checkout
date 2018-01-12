import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Http, Headers, RequestOptions } from '@angular/http'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  productList = [{ // static product array
    id: 'br01',
    title: 'Bread',
    img: '<img src="../../../assets/img/bread.png">',
    price: 0.95
  },
  {
    title: 'Eggs',
    img: '<img src="../../../assets/img/eggs.png">',
    price: 2.10
  },
  {
    title: 'Milk',
    img: '<img src="../../../assets/img/milk.png">',
    price: 1.30
  },
  {
    title: 'Beans',
    img: '<img src="../../../assets/img/beans.png">',
    price: 0.73
  }]

  constructor(private http: Http) { } // construct HTTP module into object to be used

  shoppingCart = [];// users shopping cart array
  total = 0.0; // internal total in GBP.
  displayTotal = 0.0; // total to display to user
  currency; // object to hold API information in JSON format.
  selectedCurrency = 'GBP'; // currency selector variable. Defaulted to GBP.
  keys = []; // array to hold currency keys to display to user.

  /**
   * Ran when page is first loaded.
   * Get data from API in JSON format. Assign to local variable.
   * Create keys array to store the currency type.
   */
  ngOnInit() {

    return this.http.get('https://api.fixer.io/latest?base=GBP') // get information from API
      .subscribe((res) => {
        this.currency = res.json() // apply json response to local variable for us.
        this.keys = Object.keys(this.currency.rates); // allocate currency rate keys to local array.
        this.keys.unshift('GBP'); // GBP not included in API, manually added to array.
        if (localStorage.getItem('cart') == null) {
          this.shoppingCart = []; // set cart to empty array if nothing inside local storage to bypass error.
        } else {
          this.shoppingCart = JSON.parse(localStorage.getItem('cart'));
        }
        if (JSON.parse(localStorage.getItem('total')) != 0.00) {
          this.total = JSON.parse(localStorage.getItem('total'))
        } else {
          this.total = 0.00;
        }
      })
  }

  /**
   * Add to cart function, add items from stock array to cart array.
   * Update internal total var
   * Update display total var
   * @param title product title 
   * @param price  product price 
   */
  addToCart(title, price) {

    const product = { // object to hold title and price variables
      title: title,
      price: price
    }
    this.total += price // add price to total variable
    if (this.currency.rates[this.selectedCurrency]) {
      this.displayTotal = this.total * this.currency.rates[this.selectedCurrency]
    } else {
      this.displayTotal = this.total * 1.0 // *1.0 used to display standard currency GBP.
    }
    this.shoppingCart.push(product) // push object into cart array
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart)) // push to local storage to access on another url
    localStorage.setItem('total', this.total.toFixed(2)) // push to local storage to accesss on another url
  }

}
