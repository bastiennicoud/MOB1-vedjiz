import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Product } from '../../models/product'
import { DataProvider } from '../../providers/data/data'

/**
 * Generated class for the SynchroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-synchro',
  templateUrl: 'synchro.html',
})
export class SynchroPage {

  private products: Array<Product> = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.loadProducts()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynchroPage')
  }

  private loadProducts () {
    this.dataProvider.getProducts().then(data => {
      this.products = data
    })
  }

  private refreshVedjizz (e) {
    this.dataProvider.refreshDatas().then(val => {
      this.loadProducts()
      e.complete()
    })
  }

}
