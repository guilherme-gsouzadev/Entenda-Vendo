// The central blue ball exits through the mouth; the other four keep their seats.
/** @type {Record<number,[number,number][]>} */
export const urnLayouts={
 4:[[-118,124],[118,124],[-61,220],[61,220]],
 5:[[-118,124],[0,124],[118,124],[-61,220],[61,220]],
 7:[[-113,102],[0,102],[113,102],[-125,196],[-42,196],[42,196],[125,196]],
};
export const withdrawal={start:810,end:870,urnX:830,urnY:402,scale:1.15,targetX:265,targetY:273};
export function removedPosition(progress,x,y){
 const p=Math.max(0,Math.min(1,progress));
 const smooth=t=>t*t*(3-2*t);
 if(p<.4)return {x:0,y:124+(-144)*smooth(p/.4)};
 if(p<.7)return {x:x*smooth((p-.4)/.3),y:-20};
 return {x,y:-20+(y+20)*smooth((p-.7)/.3)};
}
