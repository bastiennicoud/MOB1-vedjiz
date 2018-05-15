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

  private productCopy: Product

  private modified: boolean

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product')
    this.productCopy = new Product(
      this.product.getName(),
      this.product.getPrice(),
      this.product.getUnit(),
      this.product.getStock(),
      this.product.getPicturePath(),
      this.product.getSuppliers()
    )
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
    this.product.setName(this.productCopy.getName())
    this.product.setPrice(this.productCopy.getPrice())
    this.product.setUnit(this.productCopy.getUnit())
    this.product.setStock(this.productCopy.getStock())
    this.product.setPicturePath(this.productCopy.getPicturePath())
    this.modified = false
  }

  abort() {
    this.productCopy.setName(this.product.getName())
    this.productCopy.setPrice(this.product.getPrice())
    this.productCopy.setUnit(this.product.getUnit())
    this.productCopy.setStock(this.product.getStock())
    this.productCopy.setPicturePath(this.product.getPicturePath())
    this.modified = false
  }

}
