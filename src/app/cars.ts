type TypeCar = {
  name: string
  tires: number
  price: number
  doors: number
}

export default class Car {
  name: string
  tires: number
  price: number
  doors: number

  constructor(name: string, tires: number, price: number, doors: number) {
    this.name = name
    this.tires = tires
    this.price = price
    this.doors = doors
  }

  get getDetails(): string {
    return `
      name: ${this.name} 
      tires: ${this.tires}
      price: ${this.price}
      doors: ${this.doors}
    `
  }
}
