export const EPS = 1e-8;
export const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0);
export const transpose = a => a[0].map((_,j)=>a.map(r=>r[j]));
export function pair(A,b,c){
  return {primal:{sense:'max',A,b,c,relation:'≤'},dual:{sense:'min',A:transpose(A),b:c,c:b,relation:'≥'}};
}
export function evaluate(model,v){
  const rows=model.A.map((a,i)=>({lhs:dot(a,v),rhs:model.b[i],ok:model.sense==='max'?dot(a,v)<=model.b[i]+EPS:dot(a,v)>=model.b[i]-EPS}));
  const nonnegative=v.every(x=>Number.isFinite(x)&&x>=-EPS);
  return {feasible:nonnegative&&rows.every(r=>r.ok),value:dot(model.c,v),rows,nonnegative};
}
export function conclude(p,d){
  if(!p.feasible||!d.feasible)return 'infeasible';
  if(p.value>d.value+EPS)throw Error('Contradicción de dualidad');
  return Math.abs(p.value-d.value)<EPS?'optimal':'bound';
}
export function inspect(s){const p=evaluate(s.primal,s.x),d=evaluate(s.dual,s.y);return {p,d,conclusion:conclude(p,d)};}
export function selectGame(bank,rng=Math.random){
  return ['values','feasible','bound','optimal','error'].map(type=>{const pool=bank.filter(s=>s.type===type);return pool[Math.floor(rng()*pool.length)];});
}
