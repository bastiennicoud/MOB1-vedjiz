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

  constructor(public http: HttpClient, private storage: Storage, public platform: Platform)
  {
    this.getFreshDatas()
  }

  /**
   * ! For dev purpose
   * reset the last update value
   */
  public resetLastUpdate ()
  {
    this.storage.set('last_repo_update', 234567)
  }

  /**
   * ! For dev purpose
   * Reload datas from repo
   */
  public reloadFreshDatas ()
  {
    this.storage.set('last_repo_update', 234567).then(val => {
      this.getFreshDatas()
    })
  }

  public refreshDatas ()
  {
    return new Promise((resolve, reject) => {
      this.getFreshDatas().then(() => {
        resolve()
      })
    })
  }

  /**
   * Check if the local version on the datas is up to date
   * If not, call the backend repo and update local storage
   */
  private getFreshDatas ()
  {
    return new Promise((resolve, reject) => {
      // Call the distant repo
      this.http.get('http://vedjserver.mycpnv.ch/api/v1/lastupdate').subscribe(data => {
        // Get last local update
        this.storage.get('last_repo_update').then(val => {
          // Create dates for comparaison
          let localUpdate = new Date(val)
          let repoUpdate = new Date(data.updated_at)
          console.log(`%cINFO : ${localUpdate.getTime()} ${repoUpdate.getTime()}`, 'color: #FFC312')
          // Refresh local update if nesesary
          if (localUpdate.getTime() < repoUpdate.getTime()) {
            console.info('%cINFO : Local storage not up to date', 'color: #FFC312')
            this.getFreshDatasFromApi().then(() => {
              this.storage.set('last_repo_update', repoUpdate.getTime()).then(() => {
                resolve()
              })
            })
          } else {
            console.info('%cINFO : No update needed', 'color: #FFC312')
            resolve()
          }
        })
      })
    })
  }

  /**
   * Get new products from backend
   */
  public getFreshDatasFromApi ()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://vedjserver.mycpnv.ch/api/v1/vegetables').subscribe((data) => {
        this.storage.set('products', data).then(() => {
          console.info('%cINFO : Local storage updated', 'color: #009432')
          resolve()
        })
      })
    })
  }

  /**
   * Retrive the products stored in the local storage
   */
  public getProducts ()
  {
    return new Promise<Array<Product>>((resolve, reject) => {
      this.storage.get('products').then(val => {
        let products = val.map(p => {
          return new Product(
            p.id,
            p.productName,
            p.price,
            p.unit,
            p.stock,
            p.image64
          )
        })
        console.info(products)
        resolve(products)
      }).catch(err => {
        reject(err)
      })
    })
  }

  public saveProductDatas (product: Product)
  {
    return new Promise<Array<Product>>((resolve, reject) => {
      // Get products from storage
      this.storage.get('products').then(val => {
        // Map the products to edit the right
        let products = val.map(p => {
          // Check where product to edit
          if (p.id === product.getId()) {
            console.log(`%cINFO : Product edited : ${p.productName}`, 'color: #FFC312')
            p.productName = product.getName()
            p.price = product.getPrice()
            p.unit = product.getUnit()
            p.stock = product.getStock()
            return p
          } else {
            return p
          }
        })
        // Sets the new product in local storage
        this.storage.set('products', products).then(() => {
          this.updateProductsRepo(products)
          resolve()
        })
      })
    })
  }

  public updateProductsRepo (products) {
    this.http.patch('http://vedjserver.mycpnv.ch/api/v1/newstock', { changes: products }).subscribe(data => {
      console.log(`%cINFO : Backend repo edited`, 'color: #FFC312')
    })
  }

}
