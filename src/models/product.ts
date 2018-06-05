import { Supplier } from './supplier'

/**
 * Product
 */
export class Product {

	/**
	 * Id
	 */
  private id: number

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

  constructor (id: number, name: string, price: number, unit: string, stock: number, picturePath: string, suppliers: Array<Supplier> = []) {
		this.id          = id
    this.name        = name
    this.price       = price
    this.unit        = unit
    this.stock       = stock
    this.picturePath = picturePath
    this.suppliers   = suppliers
	}

	public getId() {
		return this.id
	}

	public setId(id) {
		this.id = id
	}

	public getSuppliers() {
		return this.suppliers;
	}

	public setSuppliers(suppliers) {
		this.suppliers = suppliers;
	}

	public getPicturePath() {
		return this.picturePath;
	}

	public setPicturePath(picturePath) {
		this.picturePath = picturePath;
	}

	public getStock() {
		return this.stock;
	}

	public setStock(stock) {
		this.stock = stock;
	}

	public getUnit() {
		return this.unit;
	}

	public setUnit(unit) {
		this.unit = unit;
	}

	public getPrice() {
		return this.price;
	}

	public setPrice(price) {
		this.price = price;
	}

	public getName() {
		return this.name;
	}

	public setName(name) {
		this.name = name;
	}

  addSupplier (supplier: Supplier) {
    this.suppliers.push(supplier)
  }
}