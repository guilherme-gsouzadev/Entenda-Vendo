import test from 'node:test';
import assert from 'node:assert/strict';
import {urns,ratio,probability,withoutReplacement,complement,enumeratePaths} from '../src/data/math.mjs';
import {SCENE_TIMES,SHOTS,TOTAL_SECONDS,FPS,TOTAL_FRAMES} from '../src/data/timeline.mjs';
import fs from 'node:fs';

test('antes 3 azuis + 2 vermelhas, total cinco',()=>{
 assert.deepEqual(urns.before,{blue:3,red:2,removedBlue:0});
 assert.equal(urns.before.blue+urns.before.red,5);
});
test('depois exatamente 2+2 dentro e UMA azul visível fora',()=>{
 assert.deepEqual(urns.after,{blue:2,red:2,removedBlue:1});
 assert.equal(urns.after.blue+urns.after.red,4);
 assert.equal(urns.before.blue-urns.after.blue,urns.after.removedBlue);
 assert.equal(urns.before.red,urns.after.red);
});
test('probabilidade: retirada sem reposição',()=>{
 assert.equal(probability.firstBlue,3/5);
 assert.equal(probability.secondBlueGivenFirstBlue,2/4);
 assert.equal(probability.bothBlue,0.3);
 assert.equal(probability.atLeastOneRed,0.7);
 assert.equal(complement(withoutReplacement(3,2)),0.7);
});
test('questão final: 4/7 * 3/6 = 2/7, complemento 5/7',()=>{
 assert.equal(urns.challenge.blue,4);assert.equal(urns.challenge.red,3);
 assert.ok(Math.abs(probability.challengeBothBlue-2/7)<1e-14);
 assert.ok(Math.abs(probability.challengeRed-5/7)<1e-14);
 assert.equal(Math.round(probability.challengeRed*1000)/10,71.4);
});
test('dado e árvore não confundem OU e E',()=>{
 assert.equal(probability.evenDie,.5);
 assert.equal(probability.oneOrSixDie,1/3);
 assert.equal(probability.headsThenTails,.25);
 assert.deepEqual(enumeratePaths(),['BB','BR','RB','RR']);
});
test('ratios invalidos levantam erro',()=>{
 assert.throws(()=>ratio(3,0));
 assert.throws(()=>ratio(4,2));
 assert.throws(()=>withoutReplacement(1,2,2));
});
test('9 cenas e 17 tomadas sem lacunas/overlap, 560 segundos a 30fps',()=>{
 assert.equal(SCENE_TIMES.length,9);assert.equal(SHOTS.length,17);
 assert.equal(TOTAL_SECONDS,560);assert.equal(TOTAL_FRAMES,16800);
 assert.equal(SCENE_TIMES[0].start,0);assert.equal(SCENE_TIMES.at(-1).end,560);
 for(let i=1;i<SCENE_TIMES.length;i++)assert.equal(SCENE_TIMES[i].start,SCENE_TIMES[i-1].end);
 assert.equal(SHOTS[0].start,0);assert.equal(SHOTS.at(-1).end,560);
 for(let i=1;i<SHOTS.length;i++)assert.equal(SHOTS[i].start,SHOTS[i-1].end);
 for(const sh of SHOTS){
  const scene=SCENE_TIMES.find(s=>s.id===sh.scene);
  assert.ok(sh.start>=scene.start&&sh.end<=scene.end);
  assert.equal(sh.durationInFrames,sh.duration*FPS);
 }
});
test('roteiro possui um bloco por tomada com textos e tempos corretos',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../src/data/narration.json',import.meta.url)));
 assert.equal(data.shots.length,17);
 for(let i=0;i<SHOTS.length;i++){
  assert.equal(data.shots[i].shot,SHOTS[i].id);
  assert.equal(data.shots[i].startSec,SHOTS[i].start);
  assert.equal(data.shots[i].endSec,SHOTS[i].end);
  assert.ok(data.shots[i].text.length>20);
 }
});
test('legendas provisórias dentro da duração e sem sobreposição',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../src/data/captions-draft.json',import.meta.url)));
 assert.ok(data.length>30);
 for(let i=0;i<data.length;i++){
  const c=data[i];assert.ok(c.startSec>=0&&c.endSec<=560&&c.endSec>c.startSec);
  if(i)assert.ok(c.startSec>=data[i-1].endSec-0.001);
 }
});
