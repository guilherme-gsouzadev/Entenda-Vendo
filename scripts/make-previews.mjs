import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {SHOTS} from '../src/data/timeline.mjs';
const root='out/qa';
const video=`${root}/probabilidade-preliminar-silencioso.mp4`;
function run(bin,args){
 const r=spawnSync(bin,args,{encoding:'utf8'});
 if(r.status!==0)throw Error(`${bin}: ${r.stderr}`);
 return r.stdout;
}
run('ffmpeg',['-y','-v','error','-ss','360','-i',video,'-t','12','-an','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',`${root}/retirada-sem-reposicao.mp4`]);
const select=SHOTS.map(sh=>`gte(t,${sh.end-3})*lt(t,${sh.end-1})`).join('+');
run('ffmpeg',['-y','-v','error','-i',video,'-vf',`select='${select}',setpts=N/30/TB`,'-an','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',`${root}/amostras-17-shots.mp4`]);
const results=[];
for(const [name,frames,duration] of [['probabilidade-preliminar-silencioso',16800,560],['retirada-sem-reposicao',360,12],['amostras-17-shots',1020,34]]){
 const p=JSON.parse(run('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',`${root}/${name}.mp4`]));
 assert.equal(p.streams.length,1);
 assert.equal(Number(p.streams[0].nb_read_frames),frames);
 assert.equal(Number(p.format.duration),duration);
 assert.equal(p.streams[0].r_frame_rate,'30/1');
 run('ffmpeg',['-v','error','-i',`${root}/${name}.mp4`,'-f','null','-']);
 results.push({file:`${name}.mp4`,frames,durationSeconds:duration,fps:30,width:p.streams[0].width,height:p.streams[0].height,audio:false,decode:'PASS'});
}
await fs.writeFile('docs/validation-v0.6/media-final.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
