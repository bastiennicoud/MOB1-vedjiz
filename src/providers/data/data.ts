import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';
import { User } from '../../models/user';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  /**
   * All products
   */
  private products: Array<Product> = []

  /**
   * All suppliers
   */
  private suppliers: Array<Supplier> = []

  /**
   * All users
   */
  private users: Array<User> = []

  constructor(public http: HttpClient) {
    this.users.push(
      new User('John', 'Doe', '30488484', 'Une adresse'),
      new User('Toto', 'Tutu', '034949494', 'Mn adresse')
    )
    this.suppliers.push(
      new Supplier('Jean', 'Descarottes', '43892758', 'My adress', 'Legumes & Cie'),
      new Supplier('John', 'Dujardin', '42353255', 'My adress', 'Legumes & Cie'),
      new Supplier('Pomme', 'De-Terre', '235803855', 'My adress', 'Legumes & Cie')
    )
    this.products.push(
      new Product('Aubergine', 4, 'Kg', 22, 'products/aubergine.jpg', [this.suppliers[0], this.suppliers[2]]),
      new Product('Patates', 2, 'Kg', 45, 'products/potatoes.jpg', [this.suppliers[2], this.suppliers[1]]),
      new Product('Carrotes', 4, 'Kg', 22, 'products/carots.jpg', [this.suppliers[0], this.suppliers[2]])
    )
  }

  public getProducts () {
    return this.products
  }

  public getSuppliers () {
    return this.suppliers
  }

  public getUsers () {
    return this.users
  }

}
