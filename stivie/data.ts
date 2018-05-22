import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Product } from '../../models/Product'
import { Supplier } from '../../models/Supplier'
import { User } from '../../models/User'
import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/add/operator/map'

@Injectable()
export class DataProvider {

  products: Product[]
  suppliers: Supplier[]
  users: User[]
  db: SQLiteObject
  options: any = {
    name: 'test.db',
    location: 'default',
  }
  isOpen: boolean = false

  constructor(public http: Http, public sqlitePorter: SQLitePorter, private sqlite: SQLite, public platform: Platform) {

  }

  public connectToDB() {
    return new Promise((resolve, reject) => {
      if (this.isOpen == true) {
        resolve(this.isOpen)
      } else {
        this.sqlite.create(this.options)
        .then((db: SQLiteObject) => {
          this.db = db
          this.http.get('assets/database.sql').map(res => res.text()).subscribe(sql => {
            this.sqlitePorter.importSqlToDb(this.db, sql).then(data => {
              this.isOpen = true
              resolve(this.isOpen)
            }).catch(e => console.log(JSON.stringify(e)))
          })
        }).catch(e => console.log(JSON.stringify(e)))
      }
    })
  }

  getProducts() {
    let sql = 'SELECT * FROM products'

    return new Promise((resolve, reject) => {
      this.db.executeSql(sql, []).then((data) => {
        let products = []
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let new_product = new Product(data.rows.item(i).name, data.rows.item(i).price, data.rows.item(i).unit, [], data.rows.item(i).path)
            products.push(new_product)
          }
        }
        resolve(products)
      }, (error) => {
        reject(JSON.stringify(error))
      })
      })
    }

  addProduct() {
    let sql = 'INSERT INTO `products` (name, price, unit, stock, path) VALUES ("onions", 23.5, "kg", 10.0, "toto")'

    return new Promise((resolve, reject) => {
      this.db.executeSql(sql, [])
        .then((data) => {
          return resolve(JSON.stringify(data))
        }, (error) => {
          return reject(JSON.stringify(error))
        })
    })

  }
}