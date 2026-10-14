/** Local-only fallback for Remotion 4.0.535. Uses its real browser bundle.
 * No dependency patches. Silent image capture; does not validate CLI/audio rendering.
 * Browser bridge is version-specific. Prefer official CLI where it works.
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {ensureBrowser} from '@remotion/renderer';
import {SHOTS} from '../src/data/timeline.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?`${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright`:'playwright');
const root=path.resolve('out/bundle');
const out=path.resolve(process.env.QA_OUT||'out/qa');
await fs.mkdir(out,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.wav':'audio/wav'};
const server=http.createServer(async(req,res)=>{
 try{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 const target=file===root?path.join(root,'index.html'):file;
 res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(await fs.readFile(target));
 }catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browserStatus=await ensureBrowser({logLevel:'error'});
if(!('path' in browserStatus))throw Error('Chrome unavailable');
const executablePath=browserStatus.path;
let browser;
try{
 browser=await chromium.launch({executablePath,headless:true});
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error(e.message);});
 await page.addInitScript(()=>{
  window.remotion_inputProps='{}';window.remotion_envVariables='{}';window.remotion_initialFrame=0;
  window.remotion_attempt=1;window.remotion_audioEnabled=false;window.remotion_videoEnabled=true;
  window.remotion_puppeteerTimeout=30000;window.remotion_isMainTab=true;window.remotion_logLevel='error';
  window.remotion_sampleRate=48000;window.process={env:{NODE_ENV:'production'}};
 });
 await page.goto(`http://127.0.0.1:${server.address().port}`);
 await page.waitForFunction(()=>typeof window.remotion_setBundleMode==='function');
 await page.evaluate(()=>window.remotion_setBundleMode({type:'evaluation'}));
 await page.waitForFunction(()=>window.remotion_renderReady===true);
 const compositions=await page.evaluate(()=>window.getStaticCompositions());
 await fs.writeFile(path.join(out,'compositions.json'),JSON.stringify(compositions,null,2));
 console.log('RECOGNIZED',compositions.map(c=>c.id));
 async function select(id){
  const c=compositions.find(c=>c.id===id);
  await page.reload();
  await page.waitForFunction(()=>typeof window.remotion_setBundleMode==='function');
  await page.setViewportSize({width:c.width,height:c.height});
  await page.evaluate(c=>window.remotion_setBundleMode({type:'composition',compositionName:c.id,
   serializedResolvedPropsWithSchema:JSON.stringify({withVoice:false,withSfx:false,showCaptions:false}),
   compositionDurationInFrames:c.durationInFrames,compositionFps:c.fps,compositionHeight:c.height,compositionWidth:c.width}),c);
  await page.waitForSelector('svg');
 }
 async function seek(frame,id='ProbabilidadeConcursos'){
  await page.evaluate(({frame,id})=>window.remotion_setFrame(frame,id,1),{frame,id});
  await page.waitForFunction(()=>window.remotion_renderReady===true);
  await page.evaluate(()=>document.fonts.ready);
 }
 await select('EntendaVendoThumbnail');await seek(0,'EntendaVendoThumbnail');
 await page.screenshot({path:path.join(out,'thumbnail.png')});
 const thumbnailCounts=await page.locator('[data-urn]').evaluateAll(urns=>urns.map(u=>({blue:u.querySelectorAll('[data-ball=blue]').length,red:u.querySelectorAll('[data-ball=red]').length})));
 assert.deepEqual(thumbnailCounts,[{blue:3,red:2},{blue:3,red:2}]);
 await select('ProbabilidadeConcursos');
 const audit=[];
 assert.equal(compositions.length,2);
 assert.equal(compositions.find(c=>c.id==='ProbabilidadeConcursos').durationInFrames,16800);
 for(const sh of SHOTS){
  const frame=sh.from+Math.min(sh.durationInFrames-1,600);
  await seek(frame);await page.screenshot({path:path.join(out,`${sh.id}.png`)});
  const overflow=await page.locator('svg text').evaluateAll(nodes=>nodes.map(n=>({text:n.textContent,b:n.getBoundingClientRect().toJSON()})).filter(({b})=>b.x<0||b.y<0||b.right>1920||b.bottom>1080));
  assert.equal(overflow.length,0,`${sh.id}: text outside frame`);
  audit.push({shot:sh.id,frame,overflow});
 }
 const withdrawalChecks=[];
 for(const frame of [10859,10860,10875,10890,10905,10920,10949,10950,10951,11010]){
  await seek(frame);await page.screenshot({path:path.join(out,`withdraw-${frame}.png`)});
  assert.equal(await page.locator('[data-urn] [data-ball=blue]').count(),3);
  assert.equal(await page.locator('[data-urn] [data-ball=red]').count(),2);
  const balls=await page.locator('[data-urn] [data-ball] circle').evaluateAll(ns=>ns.map(n=>{const b=n.getBoundingClientRect();return {color:n.getAttribute('fill'),x:b.x+b.width/2,y:b.y+b.height/2};}));
  if(frame>=10920){assert.equal(balls.filter(b=>b.x>1071&&b.color==='#3789D4').length,1);}
  withdrawalChecks.push({frame,balls});
 }
 await fs.writeFile(path.join(out,'browser-audit.json'),JSON.stringify({errors,audit,thumbnailCounts,withdrawalChecks},null,2));
 assert.deepEqual(withdrawalChecks.find(c=>c.frame===10949).balls,withdrawalChecks.find(c=>c.frame===10950).balls);
 if(errors.length)throw Error(errors.join('\n'));
 console.log('CAPTURE PASS',out);
 if(process.env.RENDER_VIDEO==='1'||process.argv.includes('--render')){
  // All animated intervals read from Shots.tsx. Static intervals are checked at
  // start/middle/end in the browser before holding the identical image.
  const windows={SH01:[],SH02:[[50,90]],SH03:[[150,200],[450,510]],SH04:[[55,85]],
   SH05:[[45,95]],SH06:[[145,205]],SH07:[[45,70]],SH08:[],SH09:[[80,130]],
   SH10:[[0,35],[350,420]],SH11:[[810,870]],SH12:[[25,58]],SH13:[],
   SH14:[[50,90],[200,250]],SH15:[],SH16:[],SH17:[[0,38],[80,118],[160,198],[240,278]]};
  const framesDir=path.join(out,'render-frames');await fs.mkdir(framesDir,{recursive:true});
  const runs=[];let count=0;
  const svg=()=>page.locator('svg').evaluate(n=>n.outerHTML);
  async function capture(frame,duration){
   await seek(frame);
   const filename=`f${String(count++).padStart(5,'0')}.png`;
   await page.screenshot({path:path.join(framesDir,filename)});
   runs.push({frame,duration,filename});
  }
  for(const sh of SHOTS){
   const intervals=[...(sh.id==='SH12'?[]:[[0,24]]),...windows[sh.id]];
   const animated=f=>intervals.some(([a,b])=>f>=a&&f<=b);
   for(let f=0;f<sh.durationInFrames;){
    if(animated(f)){await capture(sh.from+f,1);f++;continue;}
    let end=f+1;while(end<sh.durationInFrames&&!animated(end))end++;
    await seek(sh.from+f);const first=await svg();
    await seek(sh.from+Math.floor((f+end-1)/2));assert.equal(await svg(),first,`${sh.id} static middle`);
    await seek(sh.from+end-1);assert.equal(await svg(),first,`${sh.id} static end`);
    await capture(sh.from+f,end-f);f=end;
   }
   console.log('VIDEO',sh.id,'captured',count);
  }
  assert.equal(runs.reduce((n,r)=>n+r.duration,0),16800);
  await fs.writeFile(path.join(out,'render-runs.json'),JSON.stringify(runs,null,2));
  const concat=runs.map(r=>`file '${r.filename}'\noption framerate 30\nduration ${(r.duration/30).toFixed(9)}`).join('\n')+`\nfile '${runs.at(-1).filename}'\noption framerate 30\n`;
  await fs.writeFile(path.join(framesDir,'frames.txt'),concat);
  const video=path.join(out,'probabilidade-preliminar-silencioso.mp4');
 const intermediate=path.join(out,'probabilidade-cfr-input.mp4');
  const ff=spawnSync('ffmpeg',['-y','-v','warning','-f','concat','-safe','0','-i',path.join(framesDir,'frames.txt'),'-vf','scale=960:540,tpad=stop_mode=clone:stop_duration=20','-r','30','-fps_mode','cfr','-t','560','-an','-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',intermediate],{encoding:'utf8'});
  if(ff.status!==0)throw Error(ff.stderr);
  // A final static hold may be excluded when -t trims a concat timestamp.
  // Normalize the CFR file, then hold its final frame to the exact timeline.
  const probe=spawnSync('ffprobe',['-v','error','-show_entries','format=duration','-of','json',intermediate],{encoding:'utf8'});
  if(probe.status!==0)throw Error(probe.stderr);
  const duration=Number(JSON.parse(probe.stdout).format.duration);
  const minimum=560-(runs.at(-1).duration-1)/30;
  assert.ok(duration>=minimum-.001&&duration<=560.04,'Unexpected duration loss before the final hold');
  const pad=spawnSync('ffmpeg',['-y','-v','error','-i',intermediate,'-vf','tpad=stop_mode=clone:stop_duration=20','-frames:v','16800','-an','-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',video],{encoding:'utf8'});
  if(pad.status!==0)throw Error(pad.stderr);
  await fs.unlink(intermediate);
  console.log('VIDEO PASS',video);
 }

}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
