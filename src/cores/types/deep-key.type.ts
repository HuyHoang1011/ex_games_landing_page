export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type BrowserNativeObject = Date | FileList | File;
export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

type AnyIsEqual<T1, T2> = T1 extends T2 ? (IsEqual<T1, T2> extends true ? true : never) : never;

type PathImpl<K extends string | number, V, TraversedTypes> = V extends Primitive | BrowserNativeObject
  ? `${K}`
  : // Check so that we don't recurse into the same type
    // by ensuring that the types are mutually assignable
    // mutually required to avoid false positives of subtypes
    true extends AnyIsEqual<TraversedTypes, V>
    ? `${K}`
    : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;

type PathInternal<T, TraversedTypes = T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
        }[TupleKeys<T>]
      : PathImpl<number, V, TraversedTypes>
    : {
        [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[keyof T];

export type Path<T> = T extends any ? PathInternal<T> : never;

export type DeepKey<T> = Path<T>;
