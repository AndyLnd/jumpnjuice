import { pipe, set, get, setIn, getIn, filter, map, reduce } from './index'

test('set', () => {
  expect(
    pipe(
      { x: 1, y: 2 },
      set('x', 100),
    ),
  ).toEqual({ x: 100, y: 2 })
  expect(
    pipe(
      { x: 1, y: 2 },
      set('y', 100),
    ),
  ).toEqual({ x: 1, y: 100 })
  // typescript 3.0 issue?
  // expect(
  //   pipe(
  //     { x: 1, y: 2 },
  //     set('z', 100),
  //   ),
  // ).toEqual({ x: 1, y: 2, z: 100 })

  expect(set(0, 10)([1])).toEqual([10])
  expect(set(0, 10)([1, 2])).toEqual([10, 2])
  expect(set(1, 10)([1, 2])).toEqual([1, 10])
  expect(set(0, 10)([1, 2, 3])).toEqual([10, 2, 3])
  expect(set(1, 10)([1, 2, 3])).toEqual([1, 10, 3])
  expect(set(2, 10)([1, 2, 3])).toEqual([1, 2, 10])
})

test('get', () => {
  expect(
    pipe(
      { x: 1, y: 2 },
      get('x'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { x: 1, y: 2 },
      get('y'),
    ),
  ).toEqual(2)

  expect(
    pipe(
      [1],
      get(0),
    ),
  ).toEqual(1)
  expect(
    pipe(
      [1, 2],
      get(0),
    ),
  ).toEqual(1)
  expect(
    pipe(
      [1, 2],
      get(1),
    ),
  ).toEqual(2)
  expect(
    pipe(
      [1, 2, 3],
      get(0),
    ),
  ).toEqual(1)
  expect(
    pipe(
      [1, 2, 3],
      get(1),
    ),
  ).toEqual(2)
  expect(
    pipe(
      [1, 2, 3],
      get(2),
    ),
  ).toEqual(3)
})

test('getIn', () => {
  expect(
    pipe(
      { a: 1 },
      getIn('a'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { a: { b: 1 } },
      getIn('a', 'b'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { a: { b: { c: 1 } } },
      getIn('a', 'b', 'c'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { a: { b: { c: { d: 1 } } } },
      getIn('a', 'b', 'c', 'd'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { a: { b: { c: { d: { e: 1 } } } } },
      getIn('a', 'b', 'c', 'd', 'e'),
    ),
  ).toEqual(1)
  expect(
    pipe(
      { a: { b: { c: 1 } } },
      getIn('a', 'b'),
    ),
  ).toEqual({ c: 1 })
})

test('setIn', () => {
  expect(
    pipe(
      { a: 1 },
      setIn(10, 'a'),
    ),
  ).toEqual({ a: 10 })
  expect(
    pipe(
      { a: { b: 1 } },
      setIn(10, 'a', 'b'),
    ),
  ).toEqual({ a: { b: 10 } })
  expect(
    pipe(
      { a: { b: { c: 1 } } },
      setIn(10, 'a', 'b', 'c'),
    ),
  ).toEqual({
    a: { b: { c: 10 } },
  })
  expect(
    pipe(
      { a: { b: { c: { d: 1 } } } },
      setIn(10, 'a', 'b', 'c', 'd'),
    ),
  ).toEqual({ a: { b: { c: { d: 10 } } } })
  expect(
    pipe(
      { a: { b: { c: { d: { e: 1, f: 20 } } } } },
      setIn(10, 'a', 'b', 'c', 'd', 'e'),
    ),
  ).toEqual({ a: { b: { c: { d: { e: 10, f: 20 } } } } })
  // typescript 3.0 issue?
  // expect(
  //   pipe(
  //     { a: { b: { c: 1, d: 20 } } },
  //     setIn(10, 'a', 'b'),
  //   ),
  // ).toEqual
  //   a: { b: 10 },
  // })
})

test('pipe', () => {
  expect(
    pipe(
      [1, 2, 3, 4, 5, 6],
      filter(x => x % 2 === 0),
      map(x => x * x),
      reduce((x, y) => x + y, 0),
    ),
  ).toEqual(56)
})
