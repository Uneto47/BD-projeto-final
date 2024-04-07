export function shallowEqual<T extends object>(object1: T, object2: T) {
  if (object1 === object2) return true;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key as keyof T] !== object2[key as keyof T]) {
      return false;
    }
  }

  return true;
}
