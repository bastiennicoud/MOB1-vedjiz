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

}