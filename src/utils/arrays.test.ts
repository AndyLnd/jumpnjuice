import {
  concat,
  insert,
  join,
  pop,
  push,
  remove,
  reverse,
  shift,
  sortBy,
  unshift,
  pipe,
} from './index'

test('push', () => {
  expect(push(10)([])).toEqual([10])
  expect(push(10)([1])).toEqual([1, 10])
  expect(push(10)([1, 2])).toEqual([1, 2, 10])
  expect(push(10)([1, 2, 3])).toEqual([1, 2, 3, 10])
})

test('pop', () => {
  expect(pop([1])).toEqual([])
  expect(pop([1, 2])).toEqual([1])
  expect(pop([1, 2, 3])).toEqual([1, 2])
})

test('unshift', () => {
  expect(unshift(10)([])).toEqual([10])
  expect(unshift(10)([1])).toEqual([10, 1])
  expect(unshift(10)([1, 2])).toEqual([10, 1, 2])
})

test('shift', () => {
  expect(shift([1])).toEqual([])
  expect(shift([1, 2])).toEqual([2])
  expect(shift([1, 2, 3])).toEqual([2, 3])
})

test('insert', () => {
  expect(insert(0, 10)([1])).toEqual([10, 1])
  expect(insert(0, 10)([1, 2])).toEqual([10, 1, 2])
  expect(insert(1, 10)([1, 2])).toEqual([1, 10, 2])
  expect(insert(0, 10)([1, 2, 3])).toEqual([10, 1, 2, 3])
  expect(insert(1, 10)([1, 2, 3])).toEqual([1, 10, 2, 3])
  expect(insert(2, 10)([1, 2, 3])).toEqual([1, 2, 10, 3])
})

test('remove', () => {
  expect(remove(0)([1])).toEqual([])
  expect(remove(0)([1, 2])).toEqual([2])
  expect(remove(1)([1, 2])).toEqual([1])
  expect(remove(0)([1, 2, 3])).toEqual([2, 3])
  expect(remove(1)([1, 2, 3])).toEqual([1, 3])
  expect(remove(2)([1, 2, 3])).toEqual([1, 2])
})

test('join', () => {
  expect(
    pipe(
      [],
      join(', '),
    ),
  ).toEqual('')
  expect(
    pipe(
      [1],
      join(', '),
    ),
  ).toEqual('1')
  expect(
    pipe(
      [1, 2, 3],
      join(', '),
    ),
  ).toEqual('1, 2, 3')
})

test('reverse', () => {
  expect(reverse([])).toEqual([])
  expect(reverse([1])).toEqual([1])
  expect(reverse([1, 2, 3])).toEqual([3, 2, 1])
  expect(reverse([1, 2, 3, 4])).toEqual([4, 3, 2, 1])
})

test('sortBy', () => {
  const numCmp = (x: number, y: number): number => x - y
  const strCmp = (x: string, y: string): number => +x - +y
  expect(
    pipe(
      [],
      sortBy(numCmp),
    ),
  ).toEqual([])
  expect(
    pipe(
      [1],
      sortBy(numCmp),
    ),
  ).toEqual([1])
  expect(
    pipe(
      [5, 3, 4, 1, 2],
      sortBy(numCmp),
    ),
  ).toEqual([1, 2, 3, 4, 5])
  expect(
    pipe(
      ['5', '3', '4', '1', '2'],
      sortBy(strCmp),
    ),
  ).toEqual(['1', '2', '3', '4', '5'])
})

test('concat', () => {
  expect(concat([], [], [])).toEqual([])
  expect(concat([], [1], [])).toEqual([1])
  expect(concat([1], [], [])).toEqual([1])
  expect(concat([], [], [1])).toEqual([1])
  expect(concat([1], [2], [3])).toEqual([1, 2, 3])
  expect(concat([1, 2], [3, 4, 5], [6, 7, 8, 9])).toEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ])
})
