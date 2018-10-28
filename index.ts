import { Monad } from './modules/Monad';

const ex = new Monad([0, 1, 2, 3]).flatMap(_ => new Monad([`No.${_}`, _ + 0, Boolean(_)]));

(<any>window).ex = ex;
console.log(ex.recursiveMap(_ => _));