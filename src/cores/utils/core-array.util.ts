import { v4 } from 'uuid';

export function cloneArrayWithKey<T extends object>(arr: T[] = [], times = 3): (T & { key: string })[] {
  return Array(times)
    .fill(null)
    .flatMap(() =>
      arr?.length > 0
        ? arr.map(item => ({
            ...item,
            key: v4(),
          }))
        : [],
    );
}
