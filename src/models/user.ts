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
  private address: Array<{ zip: number, city: string, road: string }>

}