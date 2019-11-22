import {
  merge,
  //  mergeDefaults,
  omit,
  pick,
  pluck,
  shallowEqual,
  update,
  pipe,
} from './index'

test('pick', () => {
  expect(
    pipe(
      { x: 1, y: 2, z: 3 },
      pick('x', 'y'),
    ),
  ).toEqual({ x: 1, y: 2 })
  expect(
    pipe(
      { x: 1, y: 2 },
      pick('x'),
    ),
  ).toEqual({ x: 1 })
  expect(
    pipe(
      { x: 1, y: 2 },
      pick('y'),
    ),
  ).toEqual({ y: 2 })
})

test('pluck', () => {
  expect(
    pipe(
      [
        { x: 1, y: 2, z: 3 },
        { x: 11, y: 12, z: 13 },
        { x: 21, y: 22, z: 13 },
        { x: 31, y: 32, z: 33 },
      ],
      pluck(['x', 'y']),
    ),
  ).toEqual([
    { x: 1, y: 2 },
    { x: 11, y: 12 },
    { x: 21, y: 22 },
    { x: 31, y: 32 },
  ])
})

test('merge', () => {
  expect(
    pipe(
      {},
      merge({}),
    ),
  ).toEqual({})
  expect(
    pipe(
      { x: 1 },
      merge({}),
    ),
  ).toEqual({ x: 1 })
  expect(
    pipe(
      { y: 2 },
      merge({}),
    ),
  ).toEqual({ y: 2 })
  expect(
    pipe(
      { x: 1 },
      merge({ y: 2 }),
    ),
  ).toEqual({ x: 1, y: 2 })
  expect(
    pipe(
      { x: 1, y: 2 },
      merge({ z: 3 }),
    ),
  ).toEqual({ x: 1, y: 2, z: 3 })
  expect(
    pipe(
      { z: 3 },
      merge({ x: 1, y: 2 }),
    ),
  ).toEqual({ x: 1, y: 2, z: 3 })
})

// test('mergeDefaults', () => {
//   expect(pipe({ x: 100 }, mergeDefaults({ x: 1, y: 2, z: 3 }))).toEqual({
//     x: 100,
//     y: 2,
//     z: 3,
//   })
//   expect(
//     pipe(
//       { y: 100 },
//       mergeDefaults({
//         x: 1,
//         y: 2,
//         z: 3,
//       }),
//     ),
//   ).toEqual({ x: 1, y: 100, z: 3 })
//   expect(
//     pipe(
//       { z: 100 },
//       mergeDefaults({
//         x: 1,
//         y: 2,
//         z: 3,
//       }),
//     ),
//   ).toEqual({ x: 1, y: 2, z: 100 })
// })

test('update', () => {
  const inc = (x: number): number => x + 1
  expect(
    pipe(
      { x: 1, y: 2 },
      update('x', inc),
    ),
  ).toEqual({ x: 2, y: 2 })
  expect(
    pipe(
      { x: 1, y: 2 },
      update('y', inc),
    ),
  ).toEqual({ x: 1, y: 3 })
})

test('omit', () => {
  expect(
    pipe(
      { x: 1, y: 2, z: 3 },
      omit('x'),
    ),
  ).toEqual({ y: 2, z: 3 })
  expect(
    pipe(
      { x: 1, y: 2, z: 3 },
      omit('x', 'y'),
    ),
  ).toEqual({ z: 3 })
  expect(
    pipe(
      { x: 1, y: 2 },
      omit('x'),
    ),
  ).toEqual({ y: 2 })
  expect(
    pipe(
      { x: 1, y: 2 },
      omit('y'),
    ),
  ).toEqual({ x: 1 })
  expect(
    pipe(
      { x: 1, y: 2, z: 3 },
      omit('z'),
    ),
  ).toEqual({ x: 1, y: 2 })
})

test('shallowEqual', () => {
  expect(
    shallowEqual({
      x: 1,
      y: 2,
    })({
      x: 1,
      y: 2,
    }),
  ).toBeTruthy()
  expect(
    shallowEqual({
      x: 0,
      y: 2,
    })({
      x: 1,
      y: 2,
    }),
  ).toBeFalsy()
  expect(
    shallowEqual({
      x: 1,
      y: 2,
    })({
      x: 0,
      y: 2,
    }),
  ).toBeFalsy()
  // tslint:disable no-any
  expect(
    shallowEqual<any>({ y: 2 })({
      x: 1,
      y: 2,
    }),
  ).toBeFalsy()
  expect(
    shallowEqual<any>({ y: 2 })({
      x: 1,
    }),
  ).toBeFalsy()
  expect(
    shallowEqual<any>({ x: 1, y: 2 })({
      x: 1,
      y: 2,
    }),
  ).toBeTruthy()

  const pt = { x: 1, y: 2 }
  expect(
    shallowEqual({
      pt,
    })({
      pt,
    }),
  ).toBeTruthy()
  expect(
    shallowEqual({
      pt,
    })({
      pt: { x: 1, y: 2 },
    }),
  ).toBeFalsy()
})
