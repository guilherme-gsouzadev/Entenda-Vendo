import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile} from 'remotion';
import {ShotVisual} from './scenes/Shots';
import {DraftCaptions} from './components/Captions';
import {SHOTS,FPS,TOTAL_FRAMES} from './data/timeline.mjs';
import {Thumbnail} from './components/Thumbnail';

type Props={withVoice:boolean;showCaptions:boolean;withSfx:boolean};
const Probability:React.FC<Props>=({withVoice,showCaptions,withSfx})=><AbsoluteFill style={{background:'#F6F4EF'}}>
 {SHOTS.map(shot=><Sequence key={shot.id} from={shot.from} durationInFrames={shot.durationInFrames} name={shot.id}>
   <ShotVisual id={shot.id} section={shot.scene}/>
 </Sequence>)}
 {withSfx&&[25,80,150,240,335,365,410,445,485,505,540].map(sec=><Sequence key={sec} from={sec*FPS} durationInFrames={FPS}><Audio src={staticFile('sfx/tap.wav')} volume={0.13}/></Sequence>)}
 {withVoice&&<Audio src={staticFile('voiceover.wav')} volume={1}/>}
 {showCaptions&&<DraftCaptions/>}
 </AbsoluteFill>;
export const RemotionRoot:React.FC=()=> <>
 <Composition id="ProbabilidadeConcursos" component={Probability} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_FRAMES} defaultProps={{withVoice:false,showCaptions:false,withSfx:true}}/>
 <Composition id="EntendaVendoThumbnail" component={Thumbnail} width={1280} height={720} fps={30} durationInFrames={1} defaultProps={{}}/>
 </>;
