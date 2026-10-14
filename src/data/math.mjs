/** Fonte matemática única para gráficos, cenas, thumbnail e testes. */
export const urns = Object.freeze({
  before: Object.freeze({blue: 3, red: 2, removedBlue: 0}),
  after: Object.freeze({blue: 2, red: 2, removedBlue: 1}),
  challenge: Object.freeze({blue: 4, red: 3, removedBlue: 0}),
});
export const ratio = (n,d) => {
  if (!Number.isInteger(n)||!Number.isInteger(d)||n<0||d<=0||n>d) throw Error(`Invalid ratio ${n}/${d}`);
  return n/d;
};
export const withoutReplacement = (blue,red,draws=2) => {
  if (![blue,red,draws].every(Number.isInteger) || draws<1 || draws>blue || red<0) throw Error('Invalid urn');
  let p=1;
  for(let i=0;i<draws;i++) p*=ratio(blue-i,blue+red-i);
  return p;
};
export const complement = p=>1-p;
export const probability = Object.freeze({
  firstBlue: ratio(3,5),
  secondBlueGivenFirstBlue:ratio(2,4),
  bothBlue: withoutReplacement(3,2),
  atLeastOneRed: complement(withoutReplacement(3,2)),
  challengeBothBlue: withoutReplacement(4,3),
  challengeRed: complement(withoutReplacement(4,3)),
  evenDie:ratio(3,6),
  oneOrSixDie:ratio(2,6),
  headsThenTails:ratio(1,4),
});
export const enumeratePaths=()=>['BB','BR','RB','RR']; // tipo, não equiprobabilidades
export const roundedPercent=(p,decimals=1)=>`${(p*100).toFixed(decimals).replace('.',',')}%`;
