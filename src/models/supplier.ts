import { User } from "./user";

/**
 * Supplier
 */
export class Supplier extends User {

  /**
   * The company name of this supplier
   */
  private companyName: string

  /**
   * Constructor
   *
   * @param firstName
   * @param lastName
   * @param phone
   * @param address
   * @param companyName
   */
  constructor (firstName: string, lastName: string, phone: string, address: string, companyName: string) {
    super(firstName, lastName, phone, address)
    this.companyName = companyName
  }

}