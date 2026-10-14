import React from 'react';
import {useCurrentFrame} from 'remotion';
import timed from '../data/captions-draft.json';

/** Legendas são apenas draft até alinhamento por áudio real. Desativadas por padrão. */
export const DraftCaptions:React.FC=()=>{
 const sec=useCurrentFrame()/30;
 const entry=timed.find(x=>sec>=x.startSec&&sec<x.endSec);
 if(!entry)return null;
 return <div style={{position:'absolute',left:220,right:220,bottom:46,padding:'16px 28px',margin:'auto',width:'fit-content',maxWidth:1400,borderRadius:15,background:'rgba(19,38,49,0.90)',color:'white',fontFamily:'Arial,sans-serif',fontSize:35,fontWeight:650,lineHeight:1.2,textAlign:'center'}}>{entry.text}</div>;
};
