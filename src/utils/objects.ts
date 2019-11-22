import { pipe } from './common'

// tslint:disable:no-object-mutation no-any readonly-array no-unbound-method prefer-for-of no-let typedef

export interface PlainObject {
  readonly [prop: string]: any
}

export type Diff<
  T extends string | number | symbol,
  U extends string | number | symbol
> = ({ [P in T]: P } & { [P in U]: never } & { readonly [x: string]: never })[T]

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

export const pluck = <T extends PlainObject, K extends keyof T>(keys: K[]) => (
  arr: ReadonlyArray<T>,
): ReadonlyArray<Pick<T, K>> => {
  const result: Array<Pick<T, K>> = []
  for (const e of arr) {
    result.push(
      pipe(
        e,
        pick(...keys),
      ),
    )
  }
  return result
}

// tslint:disable-next-line:typedef
export const pick = <T extends PlainObject, K extends keyof T>(
  ...keys: K[]
) => (obj: T): Pick<T, K> => {
  const result: any = {}
  for (const k of keys) {
    result[k] = obj[k]
  }
  return result
}

export const merge = <T1 extends PlainObject, T2 extends PlainObject>(
  obj1: T1,
) => (obj2: T2): T1 & T2 => {
  const result: any = {}
  Object.assign(result, obj1)
  Object.assign(result, obj2)
  return result
}

// export const mergeDefaults = <T extends PlainObject>(obj: T) => (
//   defaults: Partial<T>,
// ): T => pipe(defaults, merge(obj))

export const update = <T extends PlainObject, K extends keyof T, T2>(
  k: K,
  f: (x: T[K]) => T2,
) => (obj: T): T2 => {
  const result: any = {}
  Object.assign(result, obj)
  result[k] = f(obj[k])
  return result
}

export const omit = <T extends PlainObject, K extends keyof T>(
  ...keys: K[]
) => (obj: T): Omit<T, K> => {
  const result: any = {}
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && keys.indexOf(k as any) === -1) {
      result[k] = obj[k]
    }
  }
  return result
}

export const keys = <T extends PlainObject>(obj: T): ReadonlyArray<string> =>
  Object.keys(obj)

// copied from fbjs
const hasOwnProperty = Object.prototype.hasOwnProperty
export const shallowEqual = <T extends PlainObject>(obj1: T) => (
  obj2: T,
): boolean => {
  if (obj1 === obj2) {
    return true
  }

  // not needed in typescript
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  const keysA = Object.keys(obj1)
  const keysB = Object.keys(obj2)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i += 1) {
    if (
      !hasOwnProperty.call(obj2, keysA[i]) ||
      obj1[keysA[i]] !== obj2[keysA[i]]
    ) {
      return false
    }
  }
  return true
}
