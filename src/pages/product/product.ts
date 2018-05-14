import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  private product: Product

  private modified: boolean

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  valuesChanged() {
    this.modified = true
  }

  ionViewCanLeave() {
    if(this.modified) {
      let toast = this.toastCtrl.create({
        message: "Il faut sauver ou abandonner les modifications."
      })
      toast.present()
    } else {
      return true
    }
  }

  save() {

  }

  abort() {

  }

}
