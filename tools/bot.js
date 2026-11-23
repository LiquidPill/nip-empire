// Test-only bot for v3 (location-based). Loaded into test.html?debug via fetch+eval.
(function(){
const N=window.__nip;
const B=window.B={N,chMonths:[],monthsInCh:0,
 hide(){for(let i=0;i<8;i++){const b=document.querySelector('#talkOpts:not([hidden]) button');if(b)b.click();N.talkSkip();}document.getElementById('win').hidden=true;document.getElementById('shade').hidden=true;N.G.place=null;N.G.arrange=false;},
 cost(t){return N.FAC[t].cost*N.LOCS[N.G.at].M;},
 build(t){for(let r=1;r<=11;r++)for(let c=0;c<14;c++){if(N.canPlace(t,c,r)){N.G.place={type:t,mode:'new',c,r,ok:true,combos:[]};N.act('placeOk');N.G.place=null;return true;}}return false;},
 comboBuild(t){for(let r=1;r<=11;r++)for(let c=0;c<14;c++){N.G.place={type:t,mode:'new',c:null,r:null,ok:false,combos:[]};N.placeAt(c,r);if(N.G.place.ok&&N.G.place.combos.length){N.act('placeOk');N.G.place=null;return true;}}N.G.place=null;return false;},
 plan:['g','p','counter','guard','g','p','r','sun','g','p','counter','r','cushion','guard','tower','g','p','r','counter','g','p','r','fish','guard','g','p','r','counter','g','r','p','g','r'],
 pi:{},
 month(){const G=N.G,l=N.LOCS[G.at],cap=4+G.lot*3+(G.unlocked.cap?3:0)+(G.unlocked.cap2?3:0);
  if(G.staff.length<cap&&G.cands.length){const c=[...G.cands].sort((a,b)=>b.fee-a.fee)[0];if(G.cash>c.fee*2)N.act('hire',String(c.id));}
  for(const r of ['fish','arcade','hire2','cap','fert','yarn','express','conveyor','hush','lookout','hype','cap2','autopilot'])if(!G.unlocked[r])N.act('buyRes',r);
  if(G.ch>G.at&&G.at<G.locMax){N.travel(G.at+1);B.hide();return;}
  if(G.lot<l.lots.length-1&&G.cash>l.lotCost[G.lot+1]*l.M*1.3)N.act('expand');
  const LOOP=['g','p','r','g','counter','g','p','r','guard','cushion','fish','svc','sun','svc'];
  if(G.rp>300)N.act('buyRes','strain');if(G.rp>200)N.act('buyRes','workshop');
  if(Math.random()<.3&&G.staff.length){const s=[...G.staff].sort((a,b)=>a.lvl-b.lvl)[0];if(G.cash>(60+s.lvl*60)*l.M*6)N.act('train',String(s.id));}
  let i=B.pi[G.at]||0,g=0;
  while(g++<6){let t=i<B.plan.length?B.plan[i]:LOOP[(i-B.plan.length)%LOOP.length];t=t==='g'?l.mach[0]:t==='p'?l.mach[1]:t==='r'?l.mach[2]:t;if(t==='svc'){const o=['hottub','claw','teatable','arcade','beanbag','fish'].filter(x=>!N.FAC[x].lock||G.unlocked[N.FAC[x].lock]);t=o[0]||'cushion';}
    if(N.FAC[t].lock&&!G.unlocked[N.FAC[t].lock]){i++;continue;}
    if(G.cash<B.cost(t)*1.5)break;const smart=B.combo&&(t===l.mach[2]||t===l.mach[0]||t===l.mach[1]);const ok=(t==='sun'||t==='tower'||smart)?(B.comboBuild(t)||B.build(t)):B.build(t);if(ok)i++;else break;}
  if(B.combo&&G.cash>B.cost('sun')*4){for(const t of ['sun','bonsai','tower','punchbag','candyjar','lavalamp','fish'])if(!N.FAC[t].lock||G.unlocked[N.FAC[t].lock]){if(Math.random()<.5&&B.comboBuild(t))break;}}
  {const chd=N.CHAPTERS[G.ch];const co=chd&&chd.loc===G.at&&chd.obj.find(o=>o.t==='combos');if(co&&!N.objDone(co,G.at))for(const t of ['cushion','fish','lavalamp','aquarium','neonsign','arcade','claw','velvet','punchbag','tower','candyjar','yarn','beanbag','teatable','sun','hottub','trophy'])if((!N.FAC[t].lock||G.unlocked[N.FAC[t].lock])&&G.cash>B.cost(t)*2)B.comboBuild(t);}
  B.pi[G.at]=i;
  if(G.cash>B.cost('counter')*20&&Math.random()<.25)N.act('promoBuy','radio');
  B.hide();},
 done:{},
 run(months){const out=[];for(let m=0;m<months;m++){const ch0=N.G.ch;for(let w=0;w<8;w++){N.step(7.5);B.hide();}B.month();B.monthsInCh++;const G=N.G;
   const chd=N.CHAPTERS[ch0];if(chd)chd.obj.forEach((o,k)=>{const key=ch0+':'+k;if(!B.done[key]&&N.objDone(o,chd.loc))B.done[key]=o.t+'@'+B.monthsInCh;});
   if(G.ch>ch0){B.chMonths.push(B.monthsInCh);out.push(`CH${ch0+1} done in ${B.monthsInCh} months · cash ${G.cash.toExponential(2)} · `+Object.entries(B.done).filter(([k])=>k.startsWith(ch0+':')).map(([,v])=>v).join(' '));B.monthsInCh=0;}
   if(G.over){out.push('OVER '+G.y+'/'+G.m);break;}if(G.flags.ended){out.push('ENDED');break;}}
  return out.join('\n');},
 status(){const G=N.G,ch=N.CHAPTERS[G.ch];if(!ch)return 'done';return `Y${G.y}M${G.m} at${G.at} ch${G.ch+1} $${G.cash.toExponential(2)} rep${Math.round(G.fame)} heat${Math.round(G.heat)} crew${G.staff.length} fac${G.facs.length} lot${G.lot} | `+ch.obj.map(o=>(N.objDone(o,ch.loc)?'✓':'·')+o.t+':'+N.objText(o,ch.loc)).join(' ');}
};
})();
