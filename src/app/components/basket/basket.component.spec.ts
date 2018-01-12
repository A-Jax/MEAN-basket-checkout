import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { HttpModule } from '@angular/http'

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [
        HttpModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change to valid currency', () => {

    component.total = 1.0;

    component.currency = { //json file usually inside currency.
      base: 'GBP',
      rates: {
        GBP: 1,
        USD: 1.15
      }
    }

    var event = {
      target: {
        value: 'USD'
      }
    }

    component.changeHandler(event)
    expect(component.selectedCurrency).toBe('USD')
    expect(component.total).toBe(1)
    expect(component.displayTotal).toBe(1.15)


  });

  it('change to invalid currency', () => {

    component.total = 1.0;

    component.currency = { //json file usually inside currency.
      base: 'GBP',
      rates: {
        GBP: 1
      }
    }

    var event = {
      target: {
        value: 'USD'
      }
    }

    component.changeHandler(event)
    expect(component.selectedCurrency).toBe('USD')
    expect(component.total).toBe(1)
    expect(component.displayTotal).toBe(1)


  });


  it('remove from cart array from GBP', () => {

    component.basket = [{
      title: 'xyz',
      price: 2.5
    }]

    component.total = 2.5

    component.currency = {
      base: 'GBP',
      rates: {
        GBP: 1
      }
    }

    component.removeItem('xyz', 2.5)
    expect(component.basket.length).toBe(0)
    expect(component.total).toBe(0)
    expect(component.displayTotal).toBe(0)


  });

  it('remove from cart array foreign currency', () => {

    component.basket = [{
      title: 'xyz',
      price: 2.5
    },
    {
      title: 'YGH',
      price: 5
    }]

    component.total = 7.5

    component.currency = {
      base: 'GBP',
      rates: {
        GBP: 1,
        SEK: 10
      }
    }

    component.selectedCurrency = 'SEK'

    component.removeItem('xyz', 2.5)
    expect(component.basket.length).toBe(1)
    expect(component.total).toBe(5)
    expect(component.displayTotal).toBe(50)


  });


});
