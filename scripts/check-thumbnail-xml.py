from pathlib import Path
from xml.etree import ElementTree as ET
root=ET.parse(Path(__file__).resolve().parents[1]/'assets/thumbnail_verified.svg').getroot()
expected={'before':{'B':3,'R':2},'after_inside':{'B':2,'R':2},'removed':{'B':1,'R':0}}
for state,target in expected.items():
 node=next((x for x in root.iter() if x.get('data-state')==state),None)
 if node is None:raise RuntimeError(f'Missing state {state}')
 counts={k:sum(c.get('data-color')==k for c in node.iter()) for k in ('B','R')}
 assert counts==target,(state,counts,target)
 print('PASS',state,counts)
