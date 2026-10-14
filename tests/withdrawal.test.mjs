import test from 'node:test';
import assert from 'node:assert/strict';
import {urnLayouts,removedPosition,withdrawal} from '../src/data/withdrawal.mjs';
test('four surviving balls retain exact positions and colors',()=>{
 assert.deepEqual(urnLayouts[4],urnLayouts[5].filter((_,i)=>i!==1));
});
test('removed ball starts at the central blue seat and ends outside at the hand',()=>{
 assert.deepEqual(removedPosition(0,withdrawal.targetX,withdrawal.targetY),{x:0,y:124});
 assert.deepEqual(removedPosition(1,withdrawal.targetX,withdrawal.targetY),{x:265,y:273});
 assert.ok(withdrawal.targetX-34>209);
});
test('ball passes above the rim before crossing the side, with continuous motion',()=>{
 let prev=removedPosition(0,265,273);
 for(let i=1;i<=600;i++){
  const p=removedPosition(i/600,265,273);
  assert.ok(Math.hypot(p.x-prev.x,p.y-prev.y)<3);
  if(p.x>0&&p.x<265)assert.ok(p.y+34<45);
  prev=p;
 }
});
