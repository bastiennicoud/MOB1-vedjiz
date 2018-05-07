/**
 * User
 */
export class User {

  /**
   * User firstname
   */
  private firstName: string

  /**
   * User lastname
   */
  private lastName: string

  /**
   * User phone
   */
  private phone: string

  /**
   * User adress
   */
  private address: string

  /**
   * Constructor
   *
   * @param firstName
   * @param lastName
   * @param phone
   * @param address
   */
  constructor (firstName: string, lastName: string, phone: string, address: string) {
    this.firstName = firstName
    this.lastName  = lastName
    this.phone     = phone
    this.address   = address
  }

}