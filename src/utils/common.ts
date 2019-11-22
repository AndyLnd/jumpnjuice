import { PlainObject } from './objects'
import * as t from 'tcomb'

// tslint:disable:typedef only-arrow-functions no-any readonly-array

const isObject = (obj: any) => t.Object.is(obj)

export function set<T extends PlainObject, K extends keyof T>(
  key: K,
  value: T[K],
): (obj: T) => T

export function set<T>(
  index: number,
  value: T,
): (arr: ReadonlyArray<T>) => ReadonlyArray<T>

export function set<T, K extends keyof T>(
  key: number | K,
  value: T[K],
): (obj: T) => T {
  return (obj: T) => {
    if (Array.isArray(obj)) {
      return [...obj.slice(0, +key), value, ...obj.slice(+key + 1)]
    } else {
      const result: any = {}
      Object.assign(result, obj)
      // tslint:disable-next-line:no-object-mutation
      result[key] = value
      return result
    }
  }
}

export function get<T>(index: number): (arr: ReadonlyArray<T>) => T
export function get<
  T extends PlainObject | ReadonlyArray<any>,
  K extends keyof T
>(k: K): (obj: T) => T[K]

export function get<
  T extends PlainObject | ReadonlyArray<any>,
  K extends keyof T
>(key: number | K): (obj: T) => T {
  return (obj: T) => {
    if (Array.isArray(obj)) {
      return obj[+key]
    }
    if (isObject(obj)) {
      // needed only if T is any
      return obj[key as K]
    }
  }
}

export function getIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): (obj: T) => T[K1][K2][K3][K4][K5]

export function getIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(k1: K1, k2: K2, k3: K3, k4: K4): (obj: T) => T[K1][K2][K3][K4]

export function getIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(k1: K1, k2: K2, k3: K3): (obj: T) => T[K1][K2][K3]

export function getIn<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2,
): (obj: T) => T[K1][K2]

export function getIn<T, K extends keyof T>(
  index: number,
  key: K,
): (obj: ReadonlyArray<T>) => T[K]

// THIS IS WRONG!!!
// export function getIn<T, K extends keyof T>(
//   key: K,
//   index: number,
// ): (obj: T) => T[K]

export function getIn<T, K1 extends keyof T>(k1: K1): (obj: T) => T[K1]
export function getIn(first: any, ...rest: any[]): (obj: any) => any {
  return (obj: any): any => {
    // tslint:disable-next-line:no-let
    let result = obj[first]
    for (const key of rest) {
      result = result[key]
    }
    return result
  }
}

export function setIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  value: T[K1][K2][K3][K4][K5],
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
): (obj: T) => T

export function setIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(value: T[K1][K2][K3][K4], k1: K1, k2: K2, k3: K3, k4: K4): (obj: T) => T

export function setIn<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(value: T[K1][K2][K3], k1: K1, k2: K2, k3: K3): (obj: T) => T

export function setIn<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  value: T[K1][K2],
  k1: K1,
  k2: K2,
): (obj: T) => T

export function setIn<T, K1 extends keyof T>(
  value: T[K1],
  k1?: K1,
): (obj: T) => T

export function setIn(value: any, ...keys: any[]): (obj: any) => any {
  return (obj: any): any => {
    if (keys.length === 0) {
      return obj
    }
    const [first, ...rest] = keys
    if (rest.length === 0) {
      return set<any, any>(first, value)(obj)
    }
    return set<any, any>(
      first,
      setIn<any, any>(value, ...rest)(get<any, any>(first)(obj)),
    )(obj)
  }
}

// tslint:disable:only-arrow-functions
export function pipe<T, T2>(obj: T, f: (s: T) => T2): T2

export function pipe<T, T2, T3>(obj: T, f: (s: T) => T2, f2: (s: T2) => T3): T3

export function pipe<T, T2, T3, T4>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
): T4

export function pipe<T, T2, T3, T4, T5>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
): T5

export function pipe<T, T2, T3, T4, T5, T6>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
): T6

export function pipe<T, T2, T3, T4, T5, T6, T7>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
  f6: (s: T6) => T7,
): T7

export function pipe<T, T2, T3, T4, T5, T6, T7, T8>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
  f6: (s: T6) => T7,
  f7: (s: T7) => T8,
): T8

export function pipe<T, T2, T3, T4, T5, T6, T7, T8, T9>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
  f6: (s: T6) => T7,
  f7: (s: T7) => T8,
  f8: (s: T8) => T9,
): T9

export function pipe<T, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
  f6: (s: T6) => T7,
  f7: (s: T7) => T8,
  f8: (s: T8) => T9,
  f9: (s: T9) => T10,
): T10

export function pipe<T, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  obj: T,
  f: (s: T) => T2,
  f2: (s: T2) => T3,
  f3: (s: T3) => T4,
  f4: (s: T4) => T5,
  f5: (s: T5) => T6,
  f6: (s: T6) => T7,
  f7: (s: T7) => T8,
  f8: (s: T8) => T9,
  f9: (s: T9) => T10,
  f10: (s: T10) => T11,
): T11

// tslint:disable:no-any readonly-array no-let
export function pipe(
  obj: any,
  first: (obj: any) => any,
  ...rest: Array<(s: any) => any>
): any {
  let result = first(obj)
  for (const fn of rest) {
    result = fn(result)
  }
  return result
}

// tslint:disable:typedef only-arrow-functions no-any readonly-array
