import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {urns} from '../data/math.mjs';
import {urnLayouts as layouts,removedPosition} from '../data/withdrawal.mjs';

export const C={bg:'#F6F4EF', ink:'#172B38', muted:'#667782', blue:'#3789D4', red:'#E66E60', gold:'#F0B94D', aqua:'#DDEEF1', line:'#BBC9CD', card:'#FFFFFF', green:'#157A68'} as const;
export const font='Inter, Arial, sans-serif';
export const ease=(f:number,start:number,end:number)=>interpolate(f,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

export const Backdrop:React.FC<{section?:string}>=({section})=><>
 <rect x="0" y="0" width="1920" height="1080" fill={C.bg}/>
 <circle cx="1760" cy="100" r="290" fill="#E9F2F2" opacity="0.9"/>
 <circle cx="110" cy="955" r="260" fill="#FBEFE6" opacity="0.9"/>
 <path d="M 125 143 H1795" stroke="#DEE4E4" strokeWidth="2"/>
 <text x="128" y="101" fontSize="33" fill={C.ink} fontWeight="800" fontFamily={font}>ENTENDA <tspan fill={C.blue}>VENDO</tspan></text>
 {section&&<text x="1775" y="102" textAnchor="end" fontFamily={font} fontSize="25" fill={C.muted}>{section}</text>}
 </>;
export const Heading:React.FC<{title:string;subtitle?:string;size?:number}>=({title,subtitle,size=74})=><>
 <text x="960" y="236" fontFamily={font} fontWeight="800" fontSize={size} textAnchor="middle" fill={C.ink}>{title}</text>
 {subtitle&&<text x="960" y="291" fontFamily={font} fontSize="29" textAnchor="middle" fill={C.muted}>{subtitle}</text>}
 </>;
export const Tag:React.FC<{x:number;y:number;children:string;color?:string}>=({x,y,children,color=C.ink})=><g transform={`translate(${x},${y})`}>
 <rect x="-115" y="-33" rx="24" width="230" height="66" fill={C.card} stroke="#DBE5E6" strokeWidth="3"/>
 <text y="10" fontFamily={font} textAnchor="middle" fontSize="29" fontWeight="700" fill={color}>{children}</text>
 </g>;
export const Ball:React.FC<{x:number;y:number;r?:number;kind:'blue'|'red';opacity?:number}>=({x,y,r=38,kind,opacity=1})=><g data-ball={kind} opacity={opacity}>
 <ellipse cx={x+5} cy={y+r*0.8} rx={r*0.94} ry={r*0.27} fill="#143246" opacity="0.16" />
 <circle cx={x} cy={y} r={r} fill={kind==='blue'?C.blue:C.red} stroke={kind==='blue'?'#2262A2':'#C65349'} strokeWidth={r*.06}/>
 <ellipse cx={x-r*.3} cy={y-r*.33} rx={r*.24} ry={r*.14} transform={`rotate(-25 ${x-r*.3} ${y-r*.33})`} fill="#FFFFFF" opacity=".45" />
 </g>;
export const Urn:React.FC<{x:number;y:number;blue:number;red:number;scale?:number;showRemoved?:boolean;removedProgress?:number;removedBallX?:number;removedBallY?:number}>=({x,y,blue,red,scale=1,showRemoved=false,removedProgress=1,removedBallX=300,removedBallY=-55})=>{
 const total=blue+red;
 if(!(total in layouts))throw Error('No registered urn layout for '+total);
 const positions=layouts[total];
 const removed=removedPosition(removedProgress,removedBallX,removedBallY);
 return <g data-urn="true" data-inside-blue={blue} data-inside-red={red} transform={`translate(${x},${y}) scale(${scale})`}>
  <path d="M-205 45 L-175 289 Q0 344 175 289 L205 45" fill="#E8F4F5" opacity=".93" stroke="#66949E" strokeWidth="12" strokeLinejoin="round"/>
  {positions.map(([px,py],i)=><Ball key={i} x={px} y={py} kind={i<blue?'blue':'red'} r={34}/>) }
  <path d="M-205 45 L-175 289 Q0 344 175 289 L205 45" fill="none" stroke="#517F8B" strokeWidth="9"/>
  <ellipse cx="0" cy="45" rx="209" ry="22" fill="#E4EFF0" stroke="#5F939E" strokeWidth="11"/>
  {showRemoved&&<Ball x={removed.x} y={removed.y} kind="blue" r={34}/>}
 </g>;
};
/** Rig vetorial fixo: mesmo rosto/cabelo/corpo em todas as poses. */
export const Character:React.FC<{x:number;y:number;pose?:'neutral'|'thinking'|'pointing'|'holding'|'surprised';scale?:number;variant?:'C01'|'C02'}>=({x,y,pose='neutral',scale=1,variant='C01'})=>{
 const alt=variant==='C02';
 const skin=alt?'#A97152':'#D7A681'; const shirt=alt?'#497A7B':'#2C4E65';
 const handX=pose==='pointing'?135:pose==='holding'?110:79;
 const handY=pose==='pointing'?128:pose==='holding'?162:pose==='thinking'?60:183;
 return <g transform={`translate(${x},${y}) scale(${scale})`}>
  <ellipse cx="0" cy="326" rx="130" ry="18" fill="#9CAFB4" opacity=".2"/>
  <path d="M-54 214 L-55 315 M47 212 L55 315" stroke="#293F4D" strokeWidth="36" strokeLinecap="round"/>
  <path d="M-85 320 H-24 M28 320 H92" stroke="#263947" strokeWidth="27" strokeLinecap="round"/>
  <path d="M-81 98 Q0 70 81 98 L65 226 H-62 Z" fill={shirt}/>
  <path d="M-77 111 Q-101 143 -113 202" stroke={shirt} strokeWidth="33" strokeLinecap="round"/>
  <path d={`M75 113 Q110 132 ${handX} ${handY}`} fill="none" stroke={shirt} strokeWidth="30" strokeLinecap="round"/>
  <circle cx="-113" cy="202" r="17" fill={skin}/><circle cx={handX} cy={handY} r="19" fill={skin}/>
  <rect x="-19" y="65" width="38" height="42" rx="15" fill={skin}/>
  <ellipse cx="0" cy="20" rx="65" ry="74" fill={skin}/>
  <path d="M-62 20 Q-70 -61 5 -63 Q73 -63 66 17 Q42 -2 31 -24 Q-4 -2 -62 20 Z" fill={alt?'#242F32':'#313B45'}/>
  <circle cx="-22" cy="23" r={pose==='surprised'?5:3.6} fill="#263239"/><circle cx="27" cy="23" r={pose==='surprised'?5:3.6} fill="#263239"/>
  {pose==='surprised'?<ellipse cx="4" cy="57" rx="10" ry="14" fill="#6C4A44"/>:<path d={pose==='thinking'?'M-4 55 Q7 48 19 55':'M-9 53 Q3 63 18 52'} fill="none" stroke="#734E48" strokeWidth="4" strokeLinecap="round"/>}
  {pose==='thinking'&&<path d="M-21 4 L-9 0" stroke="#263239" strokeWidth="4"/>}
  {pose==='holding'&&<Ball x={handX+28} y={handY-33} kind="blue" r={34}/>} 
 </g>;
};
export const Fraction:React.FC<{x:number;y:number;top:string|number;bottom:string|number;size?:number;color?:string}>=({x,y,top,bottom,size=80,color=C.ink})=><g transform={`translate(${x},${y})`} fill={color} textAnchor="middle" fontFamily={font} fontWeight="800">
 <text y={-size*.18} fontSize={size}>{top}</text><path d={`M ${-size*.85} ${size*.04} H${size*.85}`} stroke={color} strokeWidth="6" strokeLinecap="round"/>
 <text y={size*.98} fontSize={size}>{bottom}</text>
 </g>;
export const Card:React.FC<{x:number;y:number;width:number;height:number;children:React.ReactNode;fill?:string}>=({x,y,width,height,children,fill=C.card})=><g>
 <rect x={x} y={y} width={width} height={height} rx="28" fill={fill} stroke="#DDE5E6" strokeWidth="3"/>
 {children}
 </g>;
export const Die:React.FC<{x:number;y:number;size?:number}>=({x,y,size=170})=><g transform={`translate(${x},${y})`}>
 <rect x={-size/2} y={-size/2} width={size} height={size} rx="30" fill="#FFFFFF" stroke="#D0D9D9" strokeWidth="7"/>
 {[[-.28,-.28],[.28,-.28],[0,0],[-.28,.28],[.28,.28]].map(([xx,yy],i)=><circle key={i} cx={xx*size} cy={yy*size} r={size*.062} fill={C.ink}/>)}
 </g>;
export const Coin:React.FC<{x:number;y:number;label:string;r?:number}>=({x,y,label,r=60})=><g><circle cx={x} cy={y} r={r} fill="#F6D880" stroke="#D0A647" strokeWidth="8"/><circle cx={x} cy={y} r={r*.82} fill="none" stroke="#E9BC56" strokeWidth="4"/><text x={x} y={y+r*.19} fontSize={r*.72} fontWeight="800" textAnchor="middle" fontFamily={font} fill="#795E2A">{label}</text></g>;
export const Note:React.FC<{x:number;y:number;children:string;size?:number;color?:string;bold?:boolean}>=({x,y,children,size=36,color=C.muted,bold=false})=><text x={x} y={y} fill={color} fontSize={size} fontFamily={font} fontWeight={bold?750:450} textAnchor="middle">{children}</text>;
export const Progress:React.FC=()=>{const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();return <rect x="0" y="1072" width={1920*f/durationInFrames} height="8" fill={C.blue}/>};
export const Assets={urns};
