import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Backdrop,Heading,Tag,Ball,Urn,Character,Fraction,Card,Die,Coin,Note,C,ease,font} from '../components/Artwork';
import {urns} from '../data/math.mjs';
import {withdrawal} from '../data/withdrawal.mjs';

const Big:React.FC<{x:number;y:number;children:string;color?:string;size?:number}>=({x,y,children,color=C.ink,size=86})=><text x={x} y={y} fill={color} fontWeight="820" fontSize={size} fontFamily={font} textAnchor="middle">{children}</text>;
const ResultRow:React.FC<{picked:number[];all?:number[];y?:number;opacity?:number}>=({picked,all=[1,2,3,4,5,6],y=500,opacity=1})=><g opacity={opacity}>
 {all.map((n,i)=>{const x=490+i*185;const active=picked.includes(n);return <g key={n}>
 <rect x={x-70} y={y-86} width="140" height="165" rx="25" fill={active?'#D8EEF6':'#FFFFFF'} stroke={active?C.blue:'#C9D7D9'} strokeWidth={active?6:3}/>
 <text x={x} y={y+20} textAnchor="middle" fill={active?'#23669C':C.ink} fontSize="76" fontWeight="800" fontFamily={font}>{n}</text>
 </g>;})}
 </g>;
const BallsLine:React.FC<{x?:number;y?:number;blue?:number;red?:number;spread?:number}>=({x=650,y=520,blue=3,red=2,spread=140})=><g>{Array.from({length:blue+red},(_,i)=><Ball key={i} x={x+(i-(blue+red-1)/2)*spread} y={y} r={52} kind={i<blue?'blue':'red'}/>)}</g>;
const PathCard:React.FC<{x:number;y:number;first:'B'|'R';second:'B'|'R';accent?:boolean}>=({x,y,first,second,accent=false})=><g>
 <rect x={x-135} y={y-100} width="270" height="195" rx="28" fill={accent?'#E3F2F2':C.card} stroke={accent?C.green:'#DCE6E6'} strokeWidth={accent?5:3}/>
 <Ball x={x-65} y={y-5} r={38} kind={first==='B'?'blue':'red'}/><Ball x={x+65} y={y-5} r={38} kind={second==='B'?'blue':'red'}/>
 <text x={x} y={y+71} fontFamily={font} textAnchor="middle" fontSize="28" fontWeight="720" fill={C.muted}>{first}{second}</text>
 </g>;
const Tree:React.FC<{reveal?:number}>=({reveal=1})=><g opacity={reveal}>
 <path d="M520 460 L800 350 M520 460 L800 640 M800 350 L1170 260 M800 350 L1170 430 M800 640 L1170 570 M800 640 L1170 740" stroke="#A5BDC2" fill="none" strokeWidth="12" strokeLinecap="round"/>
 <path d="M520 460 L800 350 L1170 430" stroke={C.blue} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
 <Coin x={520} y={460} label="?" r={58}/><Coin x={800} y={350} label="C" r={49}/><Coin x={800} y={640} label="K" r={49}/>
 {[[1170,260,'CC'],[1170,430,'CK'],[1170,570,'KC'],[1170,740,'KK']].map(([x,y,n])=><g key={n}><rect x={Number(x)-80} y={Number(y)-48} width="160" height="96" rx="20" fill={n==='CK'?'#D8EEF6':'#FFFFFF'} stroke={n==='CK'?C.blue:'#CDDCDC'} strokeWidth="5"/><text x={Number(x)} y={Number(y)+13} textAnchor="middle" fontFamily={font} fontSize="42" fontWeight="750" fill={C.ink}>{n}</text></g>)}
 </g>;

export const ShotVisual:React.FC<{id:string;section:string}>=({id,section})=>{
 const f=useCurrentFrame(); const fade=id==='SH12'?1:ease(f,0,24);
 let content:React.ReactNode=null;
 switch(id){
 case 'SH01': content=<><Heading title="QUAL A CHANCE?" subtitle="Uma pergunta. Cinco possibilidades."/><Urn {...urns.before} x={820} y={395} scale={1.2}/><Character x={1320} y={500} pose="thinking" scale={1.08}/><Note x={860} y={860} size={36}>3 azuis · 2 vermelhas</Note></>;break;
 case 'SH02': content=<><Heading title="E SE PRECISAR SAIR AZUL?" size={69}/><g transform={`translate(${(1-fade)*-70},0)`}><Urn {...urns.before} x={840} y={396} scale={1.23}/><Character x={1360} y={510} pose="pointing" scale={1.08}/></g><g opacity={ease(f,50,90)}><Tag x={840} y={872} color={C.blue}>AZUL</Tag></g></>;break;
 case 'SH03':content=<><Heading title="DE ONDE VEM A FRAÇÃO?" size={72}/><BallsLine x={960} y={500}/><g opacity={ease(f,150,200)}><Note x={755} y={667} color={C.blue} size={35} bold>3 FAVORÁVEIS</Note><Note x={960} y={815} size={31}>5 RESULTADOS POSSÍVEIS</Note></g><g opacity={ease(f,450,510)}><Fraction x={1470} y={540} top={3} bottom={5} size={105}/></g></>;break;
 case 'SH04':content=<><Heading title="ANTES DA CONTA: AS POSSIBILIDADES" size={64}/><BallsLine x={820} y={505} spread={130}/><g opacity={ease(f,55,85)}><Fraction x={1430} y={492} top={3} bottom={5} size={100}/><Big x={1600} y={560} children="= 60%" size={68} color={C.blue}/></g><Note x={940} y={820} size={37}>Probabilidade = casos favoráveis / casos possíveis</Note></>;break;
 case 'SH05':content=<><Heading title="ESPAÇO AMOSTRAL" subtitle="O conjunto de todos os resultados possíveis"/><Die x={260} y={535}/><g opacity={ease(f,45,95)}><ResultRow picked={[]} y={535}/></g><Note x={960} y={873} size={35}>Um dado justo tem 6 resultados possíveis.</Note></>;break;
 case 'SH06':content=<><Heading title="E SE EU QUISER UM NÚMERO PAR?" size={62}/><ResultRow picked={[2,4,6]} y={515}/><g opacity={ease(f,145,205)}><Big x={960} y={804} children="3/6 = 1/2 = 50%" size={74} color={C.blue}/></g></>;break;
 case 'SH07':content=<><Heading title="OU REÚNE RESULTADOS" subtitle="No exemplo: sair 1 OU sair 6"/><ResultRow picked={[1,6]} y={520}/><g opacity={ease(f,45,70)}><path d="M490 670 Q960 850 1415 670" stroke={C.blue} strokeWidth="12" strokeLinecap="round" fill="none"/><Note x={960} y={810} size={34} color={C.blue} bold>Dois resultados que atendem à condição</Note></g></>;break;
 case 'SH08':content=<><Heading title="1 OU 6" subtitle="São 2 resultados favoráveis entre 6 possíveis."/><ResultRow picked={[1,6]} y={480}/><Big x={970} y={826} children="2/6 = 1/3" size={90} color={C.blue}/><Note x={970} y={914} size={32}>Neste exemplo, contamos duas opções diferentes.</Note></>;break;
 case 'SH09':content=<><Heading title="E É UM CAMINHO" subtitle="Duas jogadas independentes de uma moeda justa"/><Character x={530} y={488} pose="pointing" scale={1.0}/><Coin x={1040} y={555} label="C" r={92}/><g opacity={ease(f,80,130)}><path d="M1140 555 L1400 400 M1140 555 L1400 700" stroke="#AFBEC0" strokeWidth="12"/><Tag x={1450} y={390}>CARA</Tag><Tag x={1450} y={710}>COROA</Tag></g></>;break;
 case 'SH10':content=<><Heading title="QUATRO CAMINHOS POSSÍVEIS" size={70}/><g transform="translate(80,140) scale(.85)"><Tree reveal={ease(f,0,35)}/></g><g opacity={ease(f,350,420)}><Big x={1500} y={540} size={53} children="C → K" color={C.blue}/><Big x={1500} y={630} size={53} children="1/2 × 1/2 = 1/4"/></g><Note x={960} y={945} size={29}>C = cara · K = coroa · Primeira E segunda jogada</Note></>;break;
 case 'SH11':{
 const extracted=f>=withdrawal.start;
 const move=ease(f,withdrawal.start,withdrawal.end);
 content=<><Heading title="SEM REPOSIÇÃO: ANTES" subtitle="Retiramos uma bola azul e não devolvemos"/><Character x={1250} y={510} pose="neutral" scale={1.02}/><Urn x={withdrawal.urnX} y={withdrawal.urnY} blue={extracted?urns.after.blue:urns.before.blue} red={urns.before.red} showRemoved={extracted} removedProgress={move} removedBallX={withdrawal.targetX} removedBallY={withdrawal.targetY} scale={withdrawal.scale}/><Tag x={755} y={880}>3 / 5</Tag><Note x={1370} y={890} size={34}>5 bolas no início</Note></>;break;
 }
 case 'SH12': content=<><Heading title="SEM REPOSIÇÃO: DEPOIS" subtitle="A azul retirada está fora da urna"/><Character x={1250} y={510} pose="neutral" scale={1.02}/><Urn x={withdrawal.urnX} y={withdrawal.urnY} {...urns.after} showRemoved removedBallX={withdrawal.targetX} removedBallY={withdrawal.targetY} scale={withdrawal.scale}/><g opacity={ease(f,25,58)}><Tag x={755} y={880} color={C.blue}>2 / 4</Tag><Tag x={1370} y={880}>4 RESTANTES</Tag></g><Note x={955} y={972} size={30}>O espaço amostral diminuiu: 3/5 → 2/4.</Note></>;break;
 case 'SH13':content=<><Heading title="PELO MENOS UMA VERMELHA..." size={69} subtitle="Três padrões de resultados servem à pergunta"/><PathCard x={550} y={553} first="B" second="R"/><PathCard x={960} y={553} first="R" second="B"/><PathCard x={1370} y={553} first="R" second="R"/><Character x={1600} y={730} pose="thinking" scale={0.68}/><Note x={960} y={861} size={30}>Caminhos diferentes não precisam ter a mesma probabilidade.</Note></>;break;
 case 'SH14':content=<><Heading title="O CONTRÁRIO É MAIS SIMPLES" size={68}/><PathCard x={490} y={557} first="B" second="B" accent/><g opacity={ease(f,50,90)}><Big x={1120} y={450} size={53} children="P(duas azuis)"/><Big x={1120} y={540} size={60} children="3/5 × 2/4 = 30%" color={C.blue}/></g><g opacity={ease(f,200,250)}><Big x={1120} y={715} size={48} children="P(pelo menos uma vermelha)"/><Big x={1120} y={820} size={65} children="1 − 30% = 70%" color={C.green}/></g></>;break;
 case 'SH15':content=<><Heading title="AGORA É COM VOCÊ" subtitle="Duas retiradas sem reposição"/><Urn x={815} y={410} {...urns.challenge} scale={1.12}/><Character x={1460} y={510} pose="thinking" scale={.96}/><Big x={960} y={890} size={43} children="4 AZUIS + 3 VERMELHAS"/><Note x={960} y={978} color={C.blue} size={36} bold>Qual a chance de pelo menos uma vermelha?</Note></>;break;
 case 'SH16':content=<><Heading title="RESOLVENDO PELO CONTRÁRIO" size={64}/><Card x={130} y={360} width={710} height={458} fill="#FFFFFF"><Note x={485} y={442} color={C.muted} size={36}>Nenhuma vermelha = duas azuis</Note><Big x={485} y={593} size={59} children="4/7 × 3/6"/><Big x={485} y={715} size={76} children="= 2/7" color={C.blue}/></Card><Card x={910} y={360} width={870} height={458} fill="#E5F4F2"><Note x={1345} y={445} size={35}>Pelo menos uma vermelha</Note><Big x={1345} y={590} size={62} children="1 − 2/7 = 5/7"/><Big x={1345} y={723} size={92} children="≈ 71,4%" color={C.green}/></Card><Note x={960} y={910} size={31}>A pergunta ficou simples porque começamos pelo complemento.</Note></>;break;
 case 'SH17':content=<><Heading title="LEMBRE DOS QUATRO MODELOS" size={67}/>{[
 ['ESPAÇO AMOSTRAL','Tudo o que pode sair'],['FAVORÁVEIS','O que nos interessa'],['E','Um caminho em etapas'],['COMPLEMENTO','O contrário é mais fácil']].map(([label,desc],i)=>{
  const x=105+(i%2)*875,y=330+Math.floor(i/2)*255;
  return <g key={i} opacity={ease(f,i*80,i*80+38)}><Card x={x} y={y} width={825} height={208}><text x={x+45} y={y+78} fontFamily={font} fontSize="47" fontWeight="800" fill={i===3?C.green:C.ink}>{label}</text><text x={x+45} y={y+143} fontFamily={font} fontSize="31" fill={C.muted}>{desc}</text></Card></g>;
 })}<Big x={960} y={994} size={43} children="PROBABILIDADE COMEÇA NAS POSSIBILIDADES." color={C.blue}/></>;break;
 default: throw Error('Unknown shot '+id);
 }
 return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1920 1080">
  <Backdrop section={section}/><g opacity={fade}>{content}</g>
 </svg>;
};
