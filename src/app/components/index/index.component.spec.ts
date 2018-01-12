import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';

import { HttpModule } from '@angular/http'

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [
        HttpModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('add to cart known selected currency, add to array', () => {

    component.currency = {
      base: 'GBP',
      rates: {
        GBP: 1
      }
    }

    component.addToCart('xyz', 2.5);
    expect(component.total).toBe(2.5);
    expect(component.shoppingCart[0].title).toBe('xyz');
    expect(component.shoppingCart[0].price).toBe(2.5);
    expect(component.displayTotal).toBe(2.5)

  });

  it('add to cart unknown selected currency', () => {

    component.currency = {
      base: 'GBP',
      rates: {
        GBP: 1
      }
    }

    component.selectedCurrency = 'AUS'

    component.addToCart('xyz', 2.5);
    expect(component.total).toBe(2.5);
    expect(component.shoppingCart[0].title).toBe('xyz');
    expect(component.shoppingCart[0].price).toBe(2.5);
    expect(component.displayTotal).toBe(2.5)

  });

  it('add to cart with foreign currency', () => {

    component.currency = {
      base: 'GBP',
      rates: {
        GBP: 1,
        AUD: 2
      }
    }

    component.selectedCurrency = 'AUD'

    component.addToCart('xyz', 2.5);
    expect(component.total).toBe(2.5);
    expect(component.shoppingCart[0].title).toBe('xyz');
    expect(component.shoppingCart[0].price).toBe(2.5);
    expect(component.displayTotal).toBe(5)

  });
});
