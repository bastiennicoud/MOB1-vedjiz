export interface productJSON {
  id: number
  productName: string
  price: number
  unit: string
  stock: number
  image64: string
  updated_at: string
  suppliers: Array<{firstName: string, lastName: string, companyName: string}>
}
