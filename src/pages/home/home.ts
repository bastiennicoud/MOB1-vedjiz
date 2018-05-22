import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Product } from '../../models/product'
import { DataProvider } from '../../providers/data/data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private products: Array<Product> = []

  dataProviderVersion: string

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.dataProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadProducts()
      }
    })
  }

  private loadProducts () {
    this.dataProvider.getProducts().then(data => {
      this.products = data
    })
  }
}
