import { reduce } from './hofs'
import { pipe } from './common'

// tslint:disable:typedef readonly-array

export const push = <T>(...args: T[]) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => [...arr, ...args]

export const unshift = <T>(...args: T[]) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => [...args, ...arr]

export const pop = <T>(arr: ReadonlyArray<T>): ReadonlyArray<T> =>
  arr.slice(0, arr.length - 1)

export const shift = <T>(arr: ReadonlyArray<T>): ReadonlyArray<T> => {
  const [, ...rest] = arr
  return rest
}

export const slice = <T>(start: number, stop?: number) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> =>
  stop !== undefined ? arr.slice(start, stop) : arr.slice(start)

export const insert = <T>(index: number, value: T) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => [...arr.slice(0, index), value, ...arr.slice(index)]

export const remove = <T>(index: number) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => [...arr.slice(0, index), ...arr.slice(index + 1)]

export const join = <T>(seperator: string) => (arr: ReadonlyArray<T>): string =>
  arr.join(seperator)

export const reverse = <T>(arr: ReadonlyArray<T>): ReadonlyArray<T> => {
  const result = slice(0)(arr) as T[]
  result.reverse()
  return result
}

export const sortBy = <T>(cmp: (a: T, b: T) => number) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<T> => {
  const result = slice(0)(arr) as T[]
  result.sort(cmp)
  return result
}

export const concat2 = <T>(arr: ReadonlyArray<T>) => (
  arr2: ReadonlyArray<T>,
): ReadonlyArray<T> => arr.concat(arr2)

export const concat = <T>(...arr: Array<ReadonlyArray<T>>): ReadonlyArray<T> =>
  pipe(
    arr,
    reduce(
      (a1, a2: ReadonlyArray<T>) =>
        pipe(
          a2,
          concat2(a1),
        ),
      [] as ReadonlyArray<T>,
    ),
  )
