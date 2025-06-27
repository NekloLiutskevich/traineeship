import React from 'react'
import Car from './cars'

export const App: React.FC = () => {
  type TypeUser = {
    name: string
    age: number
    address: string
  }

  type TypeUser2 = {
    name2: string
    age2: number
    address2: string
  }

  const user: TypeUser = {
    name: 'John',
    age: 32,
    address: '',
  }

  const user2: TypeUser2 = {
    name2: 'John',
    age2: 32,
    address2: '',
  }

  const unity = {
    ...user,
    ...user2,
  }

  const array: ReadonlyArray<string> = ['1', '2', '3']
  // array[2] = String(0);
  const arrayFilter = array.filter((item) => Number(item) > 2)

  console.log(unity, array)

  type TypeFunction = {
    name: string
  }

  type getFunc = (name: string) => TypeFunction

  function getFunc(name: string): TypeFunction {
    return { name }
  }

  const getArrowFunc: getFunc = (name) => {
    return { name }
  }

  function getSm(name: string): string
  function getSm(name: string, price?: number, brand?: string): string
  function getSm(name: string, price?: number, brand?: string): string {
    return price && brand ? `Name:${name} / Price: ${price} / Brand: ${brand}` : `Name:${name}`
  }

  const suzuki = new Car('Suzuki', 4, 20000, 5).getDetails

  enum EnumColors {
    black,
    white,
    red,
    green,
    blue,
  }

  const input = document.querySelector('input')
  const value1 = input?.value
  // const value2 = (input as HTMLInputElement).value

  return (
    <div>
      {arrayFilter.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
      <div className='test'>{getSm('car1')}</div>
      <div>{getSm('car2', 10, 'dddd')}</div>
      <div>{getSm('car2', 10)}</div>
      <br />
      {suzuki.split('\n').map((line, idx) => (
        <div key={idx}>
          {line} + {EnumColors[idx]}
        </div>
      ))}

      <input type='text' />
    </div>
  )
}
