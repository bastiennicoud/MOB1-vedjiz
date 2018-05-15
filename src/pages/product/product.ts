import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  private productForm: FormGroup

  private modified: boolean

  constructor(public formBuilder: FormBuilder, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product')
    this.initForm()
  }

  initForm () {
    this.productForm = this.formBuilder.group({
      name: [this.product.getName()],
      price: [this.product.getPrice()],
      stock: [this.product.getStock()],
      unit: [this.product.getUnit()]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  valuesChanged() {
    this.modified = true
  }

  ionViewCanLeave() {
    if(this.productForm.dirty) {
      let toast = this.toastCtrl.create({
        message: "Il faut sauver ou abandonner les modifications."
      })
      toast.present()
      return false
    } else {
      return true
    }
  }

  save() {
    this.product.setName(this.productForm.controls.name.value)
    this.product.setPrice(this.productForm.controls.price.value)
    this.product.setUnit(this.productForm.controls.unit.value)
    this.product.setStock(this.productForm.controls.stock.value)
    this.initForm()
  }

  abort() {
    this.initForm()
  }

}
