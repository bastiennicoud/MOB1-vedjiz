import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private products: Array<Product> = []

  constructor(public navCtrl: NavController) {
    let sup1 = new Supplier('John', 'Doe', '079 234 43 43', 'My adress', 'ViveLesLegumes')
    this.products.push(new Product('Aubergines', 4, 'Kg', 20, 'products/aubergine.jpg', [sup1]))
  }

}
