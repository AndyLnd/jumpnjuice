import { concat, slice } from './arrays'
import { pipe } from './common'

// tslint:disable:typedef

export const map = <T1, T2>(f: (value: T1, index: number) => T2) => (
  arr: ReadonlyArray<T1>,
): ReadonlyArray<T2> => arr.map(f)

export const filter = <T>(predicate: (value: T, index: number) => boolean) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => arr.filter(predicate)

export const every = <T>(predicate: (value: T, index: number) => boolean) => (
  arr: ReadonlyArray<T>,
): boolean => arr.every(predicate)

export const some = <T>(predicate: (value: T, index: number) => boolean) => (
  arr: ReadonlyArray<T>,
): boolean => arr.some(predicate)

export const reduce = <T, R>(
  f: (previousValue: R, currentValue: T, index: number) => R,
  seed: R,
) => (arr: ReadonlyArray<T>): R => arr.reduce(f, seed)

export const reduceRight = <T, R>(
  f: (previousValue: R, currentValue: T, index: number) => R,
  seed: R,
) => (arr: ReadonlyArray<T>): R => arr.reduceRight(f, seed)

export const find = <T>(predicate: (value: T, index: number) => boolean) => (
  arr: ReadonlyArray<T>,
): T | undefined => arr.find(predicate)

export const findIndex = <T>(
  predicate: (value: T, index: number) => boolean,
) => (arr: ReadonlyArray<T>): number | undefined => arr.findIndex(predicate)

export const forEach = <T>(f: (value: T, index: number) => void) => (
  arr: ReadonlyArray<T>,
): void => arr.forEach(f)

export const indexOf = <T>(searchElement: T, index?: number) => (
  arr: ReadonlyArray<T>,
): number => arr.indexOf(searchElement, index)

export const lastIndexOf = <T>(searchElement: T, index?: number) => (
  arr: ReadonlyArray<T>,
): number => arr.lastIndexOf(searchElement, index)

export const zip = <T1, T2>(
  arr: ReadonlyArray<T1>,
  arr2: ReadonlyArray<T2>,
): ReadonlyArray<[T1, T2]> =>
  pipe(
    arr,
    map((e, i) => [e, arr2[i]] as [T1, T2]),
  )

export const takeWhile = <T>(
  predicate: (value: T, index: number) => boolean,
) => (arr: ReadonlyArray<T>): ReadonlyArray<T> => {
  // tslint:disable-next-line:readonly-array
  const result = [] as T[]
  for (let i = 0; i < arr.length; ++i) {
    if (predicate(arr[i], i)) {
      result.push(arr[i])
    } else {
      break
    }
  }
  return result
}

export const dropWhile = <T>(
  predicate: (value: T, index: number) => boolean,
) => (arr: ReadonlyArray<T>): ReadonlyArray<T> => {
  for (let i = 0; i < arr.length; ++i) {
    if (!predicate(arr[i], i)) {
      return pipe(
        arr,
        slice(i),
      )
    }
  }
  return []
}

export const take = <T>(n: number) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> =>
  pipe(
    arr,
    slice(0, n),
  )

export const drop = <T>(n: number) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> =>
  pipe(
    arr,
    slice(n),
  )

export const range = (start: number, stop?: number): ReadonlyArray<number> => {
  const begin = stop !== undefined ? start : 0
  const end = stop !== undefined ? stop : start

  // tslint:disable-next-line:readonly-array
  const result: number[] = []
  // tslint:disable-next-line:no-let
  for (let i = begin; i < end; i += 1) {
    result.push(i)
  }
  return result
}

export const flatMap = <T1, T2>(
  f: (value: T1, index: number) => ReadonlyArray<T2>,
) => (arr: ReadonlyArray<T1>): ReadonlyArray<T2> => concat(...arr.map(f))

// tslint:enable no-any only-arrow-functions
