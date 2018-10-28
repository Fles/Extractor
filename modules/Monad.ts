export class Monad<T> {

  payload: T[];

  constructor(payload: T[]) {
    this.payload = payload;
  }

  private recursive <G>(fn: (item: T) => G, arr: T[]) {
    let [head, ...tail] = arr;
    if (head === undefined && !tail.length) return [];
    if (tail.length === 0) { return [fn(head)] }
    return [fn(head)].concat(this.recursive(fn, tail));
  }

  justMap <G>(fn: (item: T) => G): G[] {
    let t: G[] = [];
    for (let i = 0; i < this.payload.length; i++) {
      t.push(fn(this.payload[i]));
    }
    return t;
  }

  recursiveMap <G>(fn: (item: T) => G): G[] {
    return this.recursive(fn, this.payload);
  }

  functorMap <G>(fn: (item: T) => G): Monad<G> {
    return new Monad(this.recursive(fn, this.payload));
  }

  flatMap <G>(fn: (item: T) => Monad<G>): Monad<G> {
    return new Monad([].concat(...this.payload.map(fn)));
  }

  of <G>(arr: G[]): Monad<G> {
    return new Monad(arr)
  }

}