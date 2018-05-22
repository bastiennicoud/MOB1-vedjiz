import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Product } from '../../models/product'
import { Supplier } from '../../models/supplier'
import { User } from '../../models/user'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { SQLitePorter } from '@ionic-native/sqlite-porter'
import { Platform } from 'ionic-angular'
import { BehaviorSubject } from 'rxjs/Rx'
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map'
import { Http } from '@angular/http'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  /**
   * All products
   */
  private products: Array<Product> = []

  /**
   * All suppliers
   */
  private suppliers: Array<Supplier> = []

  /**
   * All users
   */
  private users: Array<User> = []

  /**
   * Store the database object
   */
  private database: SQLiteObject

  /**
   * Retrive the actual state of the connexion
   */
  private databaseReady: BehaviorSubject<boolean>

  constructor(public http: HttpClient, public sqlitePorter: SQLitePorter, private sqlite: SQLite, private storage: Storage, public platform: Platform) {
    this.databaseReady = new BehaviorSubject(false)
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'vedjiz.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db
        this.storage.get('database_filled').then(val => {
          if (val) {
            this.databaseReady.next(true)
          } else {
            this.fillDatabase()
          }
        })
      })
    })

    this.users.push(
      new User('John', 'Doe', '30488484', 'Une adresse'),
      new User('Toto', 'Tutu', '034949494', 'Mn adresse')
    )
    this.suppliers.push(
      new Supplier('Jean', 'Descarottes', '43892758', 'My adress', 'Legumes & Cie'),
      new Supplier('John', 'Dujardin', '42353255', 'My adress', 'Legumes & Cie'),
      new Supplier('Pomme', 'De-Terre', '235803855', 'My adress', 'Legumes & Cie')
    )
    this.products.push(
      new Product('Aubergine', 4, 'Kg', 22, 'products/aubergine.jpg', [this.suppliers[0], this.suppliers[2]]),
      new Product('Patates', 2, 'Kg', 45, 'products/potatoes.jpg', [this.suppliers[2], this.suppliers[1]]),
      new Product('Carrotes', 4, 'Kg', 22, 'products/carots.jpg', [this.suppliers[0], this.suppliers[2]]),
      new Product('Poivrons', 6, 'Kg', 8, 'products/peppers.jpeg', [this.suppliers[0], this.suppliers[1]]),
      new Product('Tomates', 6, 'Kg', 16, 'products/tomatoes.jpg', [this.suppliers[2], this.suppliers[0]])
    )
  }

  private fillDatabase () {
    this.http.get('assets/sqlDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true)
            this.storage.set('database_filled', true)
          })
          .catch(e => console.error(e))
      })
  }

  public addProduct (product: Product) {
    let data = [product.getName(), product.getPrice(), product.getUnit(), product.getStock(), product.getPicturePath()]
    return this.database.executeSql(
      'INSERT INTO `products` (name, price, unit, stock, path) VALUES ("onions", 23.5, "kg", 10.0, "toto")',
      data
    ).then(data => {
      return data
    }, err => {
      console.error('Error : ', err)
      return err
    })
  }

  public getProducts () {
    return this.database.executeSql('SELECT * FROM products', []).then(data => {
      let products = []
      if (data.row.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          products.push(new Product(
            data.rows.item(i).name,
            data.rows.item(i).price,
            data.rows.item(i).unit,
            data.rows.item(i).stock,
            data.rows.item(i).path
          ))
        }
      }
      return products
    }, err => {
      console.error('Error : ', err)
      return []
    })
  }

  public getProduct () {

  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

}
