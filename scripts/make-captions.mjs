import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=f=>JSON.parse(fs.readFileSync(new URL(f,root),'utf8'));
const shots=read('src/data/narration.json').shots;
const entries=[];
for(const shot of shots){
 const words=shot.text.replace(/\s+/g,' ').trim().split(' ');
 const numChunks=Math.ceil(words.length/8);
 // Provide last 1 second silent per shot for visual holds, not definitive timestamps.
 const available=shot.durationSec-Math.min(1,shot.durationSec*.15);
 for(let i=0;i<numChunks;i++){
   const chunk=words.slice(i*8,(i+1)*8).join(' ');
   const start=shot.startSec+i*available/numChunks;
   const end=shot.startSec+(i+1)*available/numChunks;
   entries.push({shot:shot.shot,startSec:+start.toFixed(3),endSec:+end.toFixed(3),text:chunk});
 }
}
const fmt=(time,sub)=>{
 const ms=Math.round(time*1000), h=Math.floor(ms/3600000), m=Math.floor(ms%3600000/60000), s=Math.floor(ms%60000/1000), mss=ms%1000;
 return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}${sub?' .':','}${String(mss).padStart(3,'0')}`;
};
const srt=entries.map((x,i)=>`${i+1}\n${fmt(x.startSec,false)} --> ${fmt(x.endSec,false)}\n${x.text}`).join('\n\n')+'\n';
fs.writeFileSync(new URL('public/captions-draft.srt',root),srt);
fs.writeFileSync(new URL('src/data/captions-draft.json',root),JSON.stringify(entries,null,2));
const vtt='WEBVTT\n\n'+entries.map((x,i)=>`${i+1}\n${fmt(x.startSec,false).replace(',','.')} --> ${fmt(x.endSec,false).replace(',','.')}\n${x.text}`).join('\n\n')+'\n';
fs.writeFileSync(new URL('public/captions-draft.vtt',root),vtt);
console.log(`Created ${entries.length} non-voice-synced draft caption cues`);
