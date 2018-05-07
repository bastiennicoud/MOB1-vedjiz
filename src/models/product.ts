import { Supplier } from './supplier'

/**
 * Product
 */
export class Product {

  /**
   * Name of the product
   */
  private name: string

  /**
   * Price of the product (indicated by unit)
   */
  private price: number

  /**
   * Unit used to mesure the product quantity
   */
  private unit: string

  /**
   * The available stock for this product
   */
  private stock: number

  /**
   * A path for the preview picture
   */
  private picturePath: string

  /**
   * Array of suppliers
   */
  private suppliers: Array<Supplier>

  constructor (name: string, price: number, unit: string, stock: number, picturePath: string, suppliers: Array<Supplier> = []) {
    this.name        = name
    this.price       = price
    this.unit        = unit
    this.stock       = stock
    this.picturePath = picturePath
    this.suppliers   = suppliers
  }

  addSupplier (supplier: Supplier) {
    this.suppliers.push(supplier)
  }
}