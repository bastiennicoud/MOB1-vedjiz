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
    this.getFreshDatas()
  }

  /**
   * Check if the local version on the datas is up to date
   * If not, call the backend repo and update local storage
   */
  private getFreshDatas () {
    this.http.get('http://vedjserver.mycpnv.ch/api/v1/lastupdate').subscribe(data => {
      this.storage.get('last_repo_update').then(val => {
        let localUpdate = new Date(val)
        let repoUpdate = new Date(data.updated_at)
        if (localUpdate.getTime() < repoUpdate.getTime()) {
          this.getFreshDatasFromApi()
          this.storage.set('last_repo_update', repoUpdate.getTime())
        }
      })
    })
  }

  /**
   * Get new products from backend
   */
  public getFreshDatasFromApi () {
    this.http.get('http://vedjserver.mycpnv.ch/api/v1/vegetables').subscribe((data) => {
      this.storage.set('products', data)
    })
  }

  /**
   * Retrive the products stored in the local storage
   */
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
