export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomItems<T>(arr: T[], n: number): T[] {
  const result = new Array(n)
  let len = arr.length
  const taken = new Array(len)
  if (n > len) throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

export function getRandomItemNumber(arrLength: number): number {
  let number = 1
  while (number < arrLength) {
    if (Math.random() < 0.25) {
      number += 1
    } else {
      break
    }
  }
  return number
}

export function normalizeWeightedArray<T>(arr: [T, number][]): T[] {
  return arr.flatMap(([item, weight]) => new Array(weight).fill(item))
}
