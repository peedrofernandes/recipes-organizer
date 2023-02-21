import { exists, insertSorted } from "./binarySearch"

type CustomObject = {
  prop1: number;
  prop2: string;
  id: string;
}

describe("Test of the defined custom binary search algorythms", () => {
  const arrOdd: CustomObject[] = [
    { prop1: 1, prop2: "Hello", id: "wow" },
    { prop1: 2, prop2: "World", id: "akc" },
    { prop1: 3, prop2: "Nah", id: "123" }
  ]

  it("Function exists() should return true when object exists on odd lists", () => {
    expect(exists<CustomObject>(
      arrOdd,
      { prop1: 2, prop2: "World", id: "akc" },
      object => object.id
    )).toBeTruthy()
    expect(exists<CustomObject>(
      arrOdd,
      { prop1: 3, prop2: "Nah", id: "123" },
      object => object.id
    )).toBeTruthy()
    expect(exists<CustomObject>(
      arrOdd,
      { prop1: 23, prop2: "Ngfdah", id: "123" },
      object => object.id
    )).toBeTruthy()
  })

  it("Function exists() should return false when object doesn't exist on odd lists", () => {
    expect(exists<CustomObject>(
      arrOdd,
      { prop1: 2, prop2: "World", id: "aksc" },
      object => object.id
    )).toBeFalsy()
    expect(exists<CustomObject>(
      arrOdd,
      { prop1: 24, prop2: "World", id: "123123" },
      object => object.id
    )).toBeFalsy()
  })

  const arrEven: CustomObject[] = [
    {prop1: 1, prop2: "Rock", id: "123" },
    {prop1: 2, prop2: "Paper", id: "234" },
    {prop1: 3, prop2: "Scissors", id: "345" },
    {prop1: 4, prop2: "Lol", id: "456" }
  ]

  it("Function exists() should return true when object exists on even lists", () => {
    expect(exists<CustomObject>(
      arrEven,
      { prop1: 1, prop2: "Rock", id: "123" },
      object => object.id
    )).toBeTruthy()
    expect(exists<CustomObject>(
      arrEven,
      {prop1: 3, prop2: "Scissors", id: "345" },
      object => object.id
    )).toBeTruthy()
    expect(exists<CustomObject>(
      arrEven,
      { prop1: 1, prop2: "Doesn't matter, just need the id", id: "456" },
      object => object.id
    )).toBeTruthy()
  })

  it("Function exists() should return false when object doesn't exist on even lists", () => {
    expect(exists<CustomObject>(
      arrEven,
      { prop1: 1, prop2: "Rock", id: "1323" },
      object => object.id
    )).toBeFalsy()
    expect(exists<CustomObject>(
      arrEven,
      {prop1: 3, prop2: "Scissors", id: "3415" },
      object => object.id
    )).toBeFalsy()
    expect(exists<CustomObject>(
      arrEven,
      { prop1: 1, prop2: "Doesn't matter, just need the id", id: "453156" },
      object => object.id
    )).toBeFalsy()
  })

  it("Function exists() should return false when list is empty", () => {
    const emptyArr: CustomObject[] = []
    expect(exists<CustomObject>(
      emptyArr,
      { prop1: 1, prop2: "mvkadvm", id: "13513" },
      object => object.id
    )).toBeFalsy()
    expect(exists<CustomObject>(
      emptyArr,
      { prop1: 3, prop2: "Nah", id: "123" },
      object => object.id
    )).toBeFalsy()
  })

  const newArray: number[] = []

  it("Function insertSorted() must insert elements correctly and modify in-line", () => {
    insertSorted(newArray, 1, (a, b) => a - b)
    expect(newArray).toEqual([1])
    insertSorted(newArray, 5, (a, b) => a - b)
    expect(newArray).toEqual([1, 5])
    insertSorted(newArray, 2, (a, b) => a - b)
    expect(newArray).toEqual([1, 2, 5])
    insertSorted(newArray, 10, (a, b) => a - b)
    expect(newArray).toEqual([1, 2, 5, 10])
    insertSorted(newArray, -1, (a, b) => a - b)
    expect(newArray).toEqual([-1, 1, 2, 5, 10])
    insertSorted(newArray, 0, (a, b) => a - b)
    expect(newArray).toEqual([-1, 0, 1, 2, 5, 10])
  })
})