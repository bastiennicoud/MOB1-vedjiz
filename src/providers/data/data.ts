import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Product } from '../../models/product'
import { Supplier } from '../../models/supplier'
import { User } from '../../models/user'
import { Platform } from 'ionic-angular'
import { BehaviorSubject } from 'rxjs/Rx'
import { Storage } from '@ionic/storage'
import 'rxjs'
import { Http } from '@angular/http'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient, private storage: Storage, public platform: Platform) {
    this.getFreshDatasFromApi()
  }

  public getFreshDatasFromApi () {
    this.http.get('http://vedjserver.mycpnv.ch/api/v1/vegetables').subscribe((data) => {
      this.storage.set('products', data)
    })
  }

  public addProduct (product: Product) {
    return new Promise<Array<Product>>((resolve, reject) => {
      this.storage.get('products').then(val => {
        val.push({
          productName: product.getName(),
          price:       product.getPrice(),
          unitName:    product.getUnit(),
          stock:       product.getStock(),
          picture:     product.getPicturePath()
        })
        this.storage.set('products', val).then(() => {
          resolve(val)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public getProducts () {
    return new Promise<Array<Product>>((resolve, reject) => {
      this.storage.get('products').then(val => {
        let products = val.map(p => {
          return new Product(
            p.productName,
            p.price,
            p.unitName,
            p.stock,
            p.picture
          )
        })
        resolve(products)
      }).catch(err => {
        reject(err)
      })
    })
  }

}
