import {pair,inspect} from './math.js';
const classic=pair([[1,1],[2,1]],[4,5],[3,2]);
const gym=pair([[2,5],[3,1]],[10,8],[3,2]);
const lab=pair([[1,0],[0,1]],[3,2],[2,3]);
// Expected facts are authored independently, then checked by tests and at startup.
const entries=[
 ['v1','values',classic,[1,2],[1,1],true,true,7,9,'bound'],
 ['v2','values',gym,[1,1],[1,1],true,true,5,18,'bound'],
 ['v3','values',lab,[2,1],[2,3],true,true,7,12,'bound'],
 ['f1','feasible',classic,[2,2],[1,1],false,true,10,9,'infeasible'],
 ['f2','feasible',classic,[0,4],[0,2],true,true,8,10,'bound'],
 ['f3','feasible',gym,[1,1],[0,1],true,false,5,8,'infeasible'],
 ['b1','bound',classic,[1,2],[1,1],true,true,7,9,'bound'],
 ['b2','bound',gym,[1,1],[1,1],true,true,5,18,'bound'],
 ['b3','bound',lab,[1,1],[2,3],true,true,5,12,'bound'],
 ['o1','optimal',classic,[1,2],[1,1],true,true,7,9,'bound'],
 ['o2','optimal',lab,[2,2],[2,3],true,true,10,12,'bound'],
 ['o3','optimal',classic,[1,1],[1,1],true,true,5,9,'bound'],
 ['e1','error',classic,[2,2],[1,1],false,true,10,9,'infeasible'],
 ['e2','error',classic,[1,3],[1,0],true,false,9,4,'infeasible'],
 ['e3','error',lab,[3,2],[1,1],true,false,12,5,'infeasible']
];
export const bank=entries.map(([id,type,models,x,y,pf,df,z,w,conclusion])=>({id,type,...models,x,y,expected:{pf,df,z,w,conclusion},source:models===gym?'Gimnasio 4 · p. 10–11':'Ejemplo didáctico · convención p. 9',...(type==='optimal'?{adjustIndex:models===lab?0:1,target:3}:{}),...(type==='bound'?{candidates:models===classic?[[1,0],[1,1],[0,0]]:models===gym?[[0,1],[1,1],[0,0]]:[[1,1],[2,3],[0,0]]}:{})}));
export function validateBank(){for(const s of bank){const {p,d,conclusion}=inspect(s),e=s.expected;if(p.feasible!==e.pf||d.feasible!==e.df||p.value!==e.z||d.value!==e.w||conclusion!==e.conclusion)throw Error(`Escenario inválido: ${s.id}`);}return bank.length;}
