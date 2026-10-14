"""QA of decoded MP4 pixels, not source or cached still images."""
import hashlib, json, subprocess
from pathlib import Path
import numpy as np
from scipy import ndimage
from PIL import Image, ImageDraw

root = Path('out/qa')
video = root / 'probabilidade-preliminar-silencioso.mp4'
first, last = 10859, 10951
raw = subprocess.run(['ffmpeg','-v','error','-i',str(video),'-vf',
    f'select=between(n\\,{first}\\,{last})','-fps_mode','passthrough',
    '-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True,check=True).stdout
frames = np.frombuffer(raw,dtype=np.uint8).reshape((-1,540,960,3))
assert len(frames) == last-first+1

def centers(im, color):
    roi = im[160:400,300:610].astype(int)
    r,g,b = roi[:,:,0],roi[:,:,1],roi[:,:,2]
    mask = ((r<110)&(g>100)&(g<190)&(b>150)&(b-g>35)) if color=='blue' else ((r>175)&(g>65)&(g<155)&(b<145)&(r-g>65))
    labels,n = ndimage.label(mask)
    result=[]
    for k in range(1,n+1):
        yy,xx=np.where(labels==k)
        if len(xx)>300:
            result.append([float(xx.mean()+300),float(yy.mean()+160)])
    return result

measurements=[]
moving=[]
stationary=[]
for i,frame in enumerate(frames):
    blue=centers(frame,'blue');red=centers(frame,'red')
    assert len(blue)==3, (first+i,'blue',blue)
    assert len(red)==2, (first+i,'red',red)
    # The two unchanged top-row balls are identified by their known seats.
    left=min(blue,key=lambda c:np.linalg.norm(np.array(c)-[347,272]))
    right=min(blue,key=lambda c:np.linalg.norm(np.array(c)-[483,272]))
    remaining=[c for c in blue if c!=left and c!=right]
    assert len(remaining)==1
    moving.append(remaining[0]);stationary.append([left,right]+sorted(red))
    measurements.append({'frame':first+i,'blue':blue,'red':red,'removed':remaining[0]})

moving=np.array(moving);stationary=np.array(stationary)
steps=np.linalg.norm(np.diff(moving,axis=0),axis=1)
motion_steps=int((steps>.4).sum())
assert motion_steps>=45, motion_steps
stable_drift=float(np.max(np.linalg.norm(stationary-stationary[0],axis=2)))
assert stable_drift<1.5,stable_drift
assert moving[:,1].min()<200, 'Ball must exit above the mouth'
assert moving[-1,0]>535, 'Removed ball must end outside the urn'
cut_drift=float(np.linalg.norm(moving[10950-first]-moving[10949-first]))
assert cut_drift<1.5

sheet=Image.new('RGB',(960,4*295),'#eeeeee');draw=ImageDraw.Draw(sheet)
for i,n in enumerate([10859,10860,10875,10890,10905,10920,10949,10950]):
    x=(i%2)*480;y=(i//2)*295
    im=Image.fromarray(frames[n-first]).resize((480,270))
    sheet.paste(im,(x,y+25));draw.text((x+8,y+7),f'MP4 frame {n}',fill='black')
sheet.save(root/'encoded-motion-evidence.jpg',quality=93)

media=[]
for name in ['probabilidade-preliminar-silencioso.mp4','retirada-sem-reposicao.mp4','amostras-17-shots.mp4']:
    p=root/name
    media.append({'file':name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
report={'status':'PASS','source':'Decoded MP4 pixels','frames_checked':len(frames),
    'moving_frame_steps_over_0_4px':motion_steps,'stationary_max_drift_px':stable_drift,
    'cut_10949_to_10950_drift_px':cut_drift,'blue_components_per_frame':3,
    'red_components_per_frame':2,'measurements':measurements,'media':media}
Path('docs/validation-v0.6/encoded-motion.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='measurements'},indent=2))
