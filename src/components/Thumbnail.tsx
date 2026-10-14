import React from 'react';
import {Urn,C,font} from './Artwork';
import {urns} from '../data/math.mjs';
/** Deterministic vector thumbnail: extracted blue ball visible outside, no stochastic image objects. */
export const Thumbnail:React.FC=()=> <svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
 <rect width="1280" height="720" fill="#F6F4EF"/>
 <rect width="1280" height="110" fill={C.ink}/>
 <text x="640" y="78" fontFamily={font} textAnchor="middle" fontWeight="900" fontSize="70" fill="#FFFFFF">POR QUE MUDOU?</text>
 <path d="M640 127 V627" stroke="#D2DCDC" strokeWidth="5" strokeDasharray="15 12"/>
 <text x="330" y="183" fontFamily={font} fontWeight="800" fontSize="44" textAnchor="middle" fill={C.ink}>ANTES</text>
 <text x="966" y="183" fontFamily={font} fontWeight="800" fontSize="44" textAnchor="middle" fill={C.ink}>DEPOIS</text>
 <Urn x={320} y={212} blue={urns.before.blue} red={urns.before.red} scale={.83}/>
 <Urn x={874} y={213} blue={urns.after.blue} red={urns.after.red} showRemoved removedBallX={326} removedBallY={80} scale={.83}/>
 <rect x="195" y="544" rx="24" width="240" height="101" fill="#DDEFFC"/><text x="315" y="619" textAnchor="middle" fill="#1E5F9B" fontWeight="900" fontFamily={font} fontSize="78">3/5</text>
 <rect x="750" y="544" rx="24" width="240" height="101" fill="#D9EFE8"/><text x="870" y="619" textAnchor="middle" fill="#167A68" fontWeight="900" fontFamily={font} fontSize="78">2/4</text>
 <text x="1090" y="688" fill={C.muted} fontWeight="800" fontFamily={font} textAnchor="middle" fontSize="24">SEM REPOSIÇÃO</text>
 </svg>;
