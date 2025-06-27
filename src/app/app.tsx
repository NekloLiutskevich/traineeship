import React from 'react'

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

  return (
    <div>
      {arrayFilter.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
      <div className='test'>test</div>
    </div>
  )
}
