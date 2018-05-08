import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Supplier } from '../../models/supplier';

/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {

  private supplier: Supplier

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.supplier = this.navParams.get('supplier')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierPage');
  }

}
