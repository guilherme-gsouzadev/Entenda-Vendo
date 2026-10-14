export const FPS=30;
/** @type {[string,number,number][]} */
const sceneRows=[
 ['S01',0,25], ['S02',25,80], ['S03',80,150], ['S04',150,240],
 ['S05',240,335], ['S06',335,410], ['S07',410,485], ['S08',485,540], ['S09',540,560]
];
export const SCENE_TIMES=sceneRows.map(([id,start,end])=>({id,start,end,duration:end-start}));
/** @type {[string,string,number,number][]} */
const shotRows=[
 ['SH01','S01',0,5], ['SH02','S01',5,25],
 ['SH03','S02',25,50], ['SH04','S02',50,80],
 ['SH05','S03',80,115], ['SH06','S03',115,150],
 ['SH07','S04',150,195], ['SH08','S04',195,240],
 ['SH09','S05',240,285], ['SH10','S05',285,335],
 ['SH11','S06',335,365], ['SH12','S06',365,410],
 ['SH13','S07',410,445], ['SH14','S07',445,485],
 ['SH15','S08',485,505], ['SH16','S08',505,540],
 ['SH17','S09',540,560]
];
export const SHOTS=shotRows.map(([id,scene,start,end])=>({id,scene,start,end,duration:end-start,from:start*FPS,durationInFrames:(end-start)*FPS}));
export const TOTAL_SECONDS=560;
export const TOTAL_FRAMES=FPS*TOTAL_SECONDS;
