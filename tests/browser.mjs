import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {bank} from '../bank.js';
import {selectGame,inspect,evaluate} from '../math.js';
const browser=await chromium.launch();
const sizes=[[375,812],[390,844],[820,1180],[1180,820],[1440,900]];
try{await Promise.all(sizes.map(async([width,height],n)=>{
 const context=await browser.newContext({viewport:{width,height},reducedMotion:n===0?'reduce':'no-preference',hasTouch:n<4});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const rng=n/5;await page.addInitScript(v=>Math.random=()=>v,rng);
 await page.goto('http://localhost:4287');
 assert.equal((await new AxeBuilder({page}).analyze()).violations.length,0,'intro axe');
 await page.getByRole('button',{name:'Sonido: apagado'}).click();
 await page.getByRole('button',{name:'Sonido: encendido'}).click();
 await page.locator('#start').focus();await page.keyboard.press('Enter');
 const start=Date.now(),rounds=selectGame(bank,()=>rng);
 for(const s of rounds){
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width}`);
  const small=await page.locator('button:visible,input:visible').evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return r.width<44||r.height<44;}).map(e=>e.outerHTML));assert.deepEqual(small,[]);
  const axe=await new AxeBuilder({page}).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[],`axe ${s.id}`);
  // Simulated reading/thinking interval; not a human usability measurement.
  await page.waitForTimeout(12000);
  const {p,d}=inspect(s);
  if(s.type==='values'){await page.locator('#z').fill(String(p.value));await page.locator('#w').fill(String(d.value));}
  if(s.type==='feasible'){await page.locator(`[data-seal=p][data-value="${p.feasible}"]`).click();await page.locator(`[data-seal=d][data-value="${d.feasible}"]`).click();}
  if(s.type==='bound'){const i=s.candidates.findIndex(y=>evaluate(s.dual,y).feasible);await page.locator('#candidate').fill(String(i));await page.locator('#w').fill(String(evaluate(s.dual,s.candidates[i]).value));}
  if(s.type==='optimal'){await page.locator('#adjust').fill(String(s.target));}
  if(s.type==='error'){const side=!p.feasible?'primal':'dual',r=evaluate(s[side],side==='primal'?s.x:s.y);await page.locator(`[data-error="${side}:${r.rows.findIndex(r=>!r.ok)}"]`).click();}
  await page.getByRole('button',{name:'Verificar balanza'}).click();
  assert.equal(await page.locator('#next').isVisible(),true,s.id);
  if(s.type==='optimal')assert.equal(await page.locator('.certified').count(),1);
  await page.locator('#next').click();
 }
 assert.equal(await page.locator('#score').textContent(),'5 / 5');
 console.log(JSON.stringify({viewport:`${width}x${height}`,seconds:Math.round((Date.now()-start)/1000),errors,axe:'0 violations',rounds:rounds.map(s=>s.id)}));assert.deepEqual(errors,[]);
 await page.locator('#replay').click();assert.match(await page.locator('#round').textContent(),/01/);assert.equal(await page.locator('#next').isVisible(),false);
 await context.close();
}));}finally{await browser.close();}
