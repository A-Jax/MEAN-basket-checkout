import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket = JSON.parse(localStorage.getItem('cart'));
  total = JSON.parse(localStorage.getItem('total'))

  displayTotal = this.total; // total to display to user
  currency; // object to hold API information in JSON format.
  selectedCurrency = 'GBP'; // currency selector variable. Defaulted to GBP.
  keys = []; // array to hold currency keys to display to user.

  app;


  constructor(private http: Http) { }

  ngOnInit() {

    return this.http.get('https://api.fixer.io/latest?base=GBP') // get information from API
      .subscribe((res) => {
        this.currency = res.json() // apply json response to local variable for us.
        this.keys = Object.keys(this.currency.rates)  // allocate currency rate keys to local array.
        this.keys.unshift('GBP'); // GBP not included in API, manually added to array.

        if (JSON.parse(localStorage.getItem('total')) != 0.00) {
          this.total = JSON.parse(localStorage.getItem('total'))
        } else {
          this.total = 0.00;
        }

        if (!localStorage.getItem('cart')) {
          console.log('empty cart')
        }
      }
      )

  }

  /**
  * Function to log users selection from drop down option list.
  * @param event 
  */
  changeHandler(event: any) {

    this.selectedCurrency = event.target.value; // assign selected currency to local var
    if (this.currency.rates[this.selectedCurrency]) {
      this.displayTotal = this.total * this.currency.rates[this.selectedCurrency]
    } else {
      this.displayTotal = this.total * 1.0; // *1.0 used to display standard currency GBP.
    }
  }

  /**
 * Remove from cart function, remove product from cart array
 * Update internal total var
 * Update display total var
 * @param title product title 
 * @param price  product price 
 */
  removeItem(title, price) {

    for (var i = 0; i < this.basket.length; i++) { // loop through array 
      if (this.basket[i].title === title) { //match value passed in, to array key
        this.basket.splice(i, 1) // splice out this key value, once.
        i = this.basket.length; // break out of loop
      }
    }

    this.total -= price; // remove the items price from the total

    if (this.currency.rates[this.selectedCurrency]) {
      this.displayTotal = this.total * this.currency.rates[this.selectedCurrency]
    } else {
      this.displayTotal = this.total * 1.0 // *1.0 used to display standard currency GBP.
    }

    localStorage.setItem('cart', JSON.stringify(this.basket))
    localStorage.setItem('total', this.total.toFixed(2))
  }

}
