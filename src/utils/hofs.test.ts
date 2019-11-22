import {
  drop,
  dropWhile,
  filter,
  flatMap,
  map,
  range,
  reduce,
  take,
  takeWhile,
  zip,
  pipe,
} from './index'

test('take', () => {
  expect(take(5)([])).toEqual([])
  expect(take(0)([])).toEqual([])
  expect(take(0)([])).toEqual([])
  expect(take(1)([3])).toEqual([3])
  expect(take(1)([3, 4])).toEqual([3])
  expect(take(2)([3, 4])).toEqual([3, 4])
  expect(take(5)([3, 4, 5, 6, 7])).toEqual([3, 4, 5, 6, 7])
})

test('drop', () => {
  expect(drop(2)([])).toEqual([])
  expect(drop(2)([1, 2, 3, 4])).toEqual([3, 4])
  expect(drop(2)([1, 2])).toEqual([])
  expect(drop(2)([1])).toEqual([])
})

const isEven = (x: number): boolean => x % 2 === 0

test('takeWhile', () => {
  expect(takeWhile(isEven)([])).toEqual([])
  expect(takeWhile(isEven)([3])).toEqual([])
  expect(takeWhile(isEven)([5, 6])).toEqual([])
  expect(takeWhile(isEven)([4])).toEqual([4])
  expect(takeWhile(isEven)([4, 5])).toEqual([4])
  expect(takeWhile(isEven)([4, 6, 8, 10])).toEqual([4, 6, 8, 10])
})

test('dropWhile', () => {
  expect(dropWhile(isEven)([])).toEqual([])
  expect(dropWhile(isEven)([1])).toEqual([1])
  expect(dropWhile(isEven)([2])).toEqual([])
  expect(dropWhile(isEven)([2, 3])).toEqual([3])
  expect(dropWhile(isEven)([2, 4])).toEqual([])
  expect(dropWhile(isEven)([1, 3])).toEqual([1, 3])
  expect(dropWhile(isEven)([1, 2, 4, 5])).toEqual([1, 2, 4, 5])
  expect(dropWhile(isEven)([2, 4, 6, 7, 8, 9])).toEqual([7, 8, 9])
})

test('zip', () => {
  expect(zip([], [])).toEqual([])
  expect(zip([1], [2])).toEqual([[1, 2]])
  expect(zip([1, 2], [3, 4])).toEqual([[1, 3], [2, 4]])
  expect(zip([1, 2, 3], [4, 5, 6])).toEqual([[1, 4], [2, 5], [3, 6]])
})

test('range', () => {
  expect(range(0)).toEqual([])
  expect(range(10, 10)).toEqual([])
  expect(range(100, 10)).toEqual([])

  expect(range(0, 1)).toEqual([0])
  expect(range(1, 5)).toEqual([1, 2, 3, 4])

  expect(range(5)).toEqual([0, 1, 2, 3, 4])
})

const incRepeatTwice = (x: number): [number, number] => [x + 1, x + 1]

test('flatMap', () => {
  expect(
    pipe(
      [],
      flatMap(incRepeatTwice),
    ),
  ).toEqual([])
  expect(
    pipe(
      [1],
      flatMap(incRepeatTwice),
    ),
  ).toEqual([2, 2])
  expect(
    pipe(
      [1, 2],
      flatMap(incRepeatTwice),
    ),
  ).toEqual([2, 2, 3, 3])
  expect(
    pipe(
      [1, 2, 3],
      flatMap(incRepeatTwice),
    ),
  ).toEqual([2, 2, 3, 3, 4, 4])
})
