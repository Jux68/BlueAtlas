'use strict';

const VERSION = '1.1.0';
const KEY = 'blueatlas-alpha-081';
const CACHE_BUST = 'ba-110';

const spots = [
  { id:'palombaggia', name:'Palombaggia', region:'Corse-du-Sud', habitat:'Herbiers et rochers', icon:'🌿' },
  { id:'santa-giulia', name:'Santa Giulia', region:'Corse-du-Sud', habitat:'Sable et herbiers', icon:'🏖️' },
  { id:'rondinara', name:'Rondinara', region:'Corse-du-Sud', habitat:'Baie, roche et herbier', icon:'🌊' },
  { id:'piantarella', name:'Piantarella', region:'Corse-du-Sud', habitat:'Lagon et pleine eau', icon:'💧' },
  { id:'lavezzi', name:'Îles Lavezzi', region:'Corse-du-Sud', habitat:'Granite et pleine eau', icon:'🪨' },
  { id:'campomoro', name:'Campomoro', region:'Corse-du-Sud', habitat:'Rochers et tombants', icon:'🤿' },
  { id:'roccapina', name:'Roccapina', region:'Corse-du-Sud', habitat:'Sable et roche', icon:'☀️' },
  { id:'other', name:'Autre spot', region:'Corse', habitat:'À préciser', icon:'📍' }
];

const species = [
  {id:'saupe',name:'Saupe',latin:'Sarpa salpa',group:'Poisson',habitat:'Herbier / roche',biome:'Herbier',prob:95,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Sarpa_salpa_1.jpg/640px-Sarpa_salpa_1.jpg',desc:'Poisson argenté parcouru de fines lignes dorées, souvent en banc près des herbiers.',similar:['oblade','sar']},
  {id:'girelle',name:'Girelle commune',latin:'Coris julis',group:'Poisson',habitat:'Roche / herbier',biome:'Herbier',prob:95,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Coris_julis_male.jpg/640px-Coris_julis_male.jpg',desc:'Petite girelle très vive, aux couleurs variables selon le sexe et l’âge.',similar:['serran','castagnole']},
  {id:'sar',name:'Sar commun',latin:'Diplodus sargus',group:'Poisson',habitat:'Roche',biome:'Roche',prob:90,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Diplodus_sargus.jpg/640px-Diplodus_sargus.jpg',desc:'Poisson argenté à bandes sombres, fréquent sur les petits fonds rocheux.',similar:['oblade','saupe']},
  {id:'oblade',name:'Oblade',latin:'Oblada melanura',group:'Poisson',habitat:'Pleine eau / roche',biome:'Pleine eau',prob:85,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Oblada_melanura.jpg/640px-Oblada_melanura.jpg',desc:'Poisson argenté reconnaissable à sa tache noire cerclée de blanc près de la queue.',similar:['sar','saupe']},
  {id:'castagnole',name:'Castagnole',latin:'Chromis chromis',group:'Poisson',habitat:'Roche / pleine eau',biome:'Pleine eau',prob:80,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chromis_chromis_2.jpg/640px-Chromis_chromis_2.jpg',desc:'Petit poisson sombre nageant en groupes au-dessus des fonds rocheux.',similar:['girelle','serran']},
  {id:'serran',name:'Serran écriture',latin:'Serranus scriba',group:'Poisson',habitat:'Roche / herbier',biome:'Roche',prob:75,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Serranus_scriba.jpg/640px-Serranus_scriba.jpg',desc:'Poisson territorial coloré, avec des motifs bleus et bruns très caractéristiques.',similar:['girelle','mero']},
  {id:'rouget',name:'Rouget de roche',latin:'Mullus surmuletus',group:'Poisson',habitat:'Sable / roche',biome:'Sable',prob:65,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mullus_surmuletus.jpg/640px-Mullus_surmuletus.jpg',desc:'Explore le fond avec ses deux barbillons sensoriels.',similar:['sar','serran']},
  {id:'poulpe',name:'Poulpe commun',latin:'Octopus vulgaris',group:'Céphalopode',habitat:'Roche',biome:'Roche',prob:35,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus_vulgaris_2.jpg/640px-Octopus_vulgaris_2.jpg',desc:'Maître du camouflage, souvent caché dans une cavité entourée de coquilles.',similar:['seiche']},
  {id:'murene',name:'Murène méditerranéenne',latin:'Muraena helena',group:'Poisson',habitat:'Faille rocheuse',biome:'Roche',prob:25,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Muraena_helena_1.jpg/640px-Muraena_helena_1.jpg',desc:'Poisson allongé vivant dans les failles. Observer à distance sans approcher les mains.',similar:['mero','serran']},
  {id:'seiche',name:'Seiche commune',latin:'Sepia officinalis',group:'Céphalopode',habitat:'Sable / herbier',biome:'Sable',prob:20,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sepia_officinalis_%28aquarium%29.jpg/640px-Sepia_officinalis_%28aquarium%29.jpg',desc:'Céphalopode capable de changer rapidement de couleur et de texture.',similar:['poulpe']},
  {id:'mero',name:'Mérou brun',latin:'Epinephelus marginatus',group:'Poisson',habitat:'Roche / grotte',biome:'Roche',prob:12,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Epinephelus_marginatus_1.jpg/640px-Epinephelus_marginatus_1.jpg',desc:'Grand poisson emblématique, plus facile à observer dans les zones protégées.',similar:['serran','murene']},
  {id:'barracuda',name:'Barracuda méditerranéen',latin:'Sphyraena viridensis',group:'Poisson',habitat:'Pleine eau',biome:'Pleine eau',prob:10,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sphyraena_viridensis.jpg/640px-Sphyraena_viridensis.jpg',desc:'Prédateur fuselé parfois visible en banc dans les eaux claires.',similar:['oblade']},
  {id:'oursin',name:'Oursin violet',latin:'Paracentrotus lividus',group:'Échinoderme',habitat:'Roche / herbier',biome:'Herbier',prob:90,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Paracentrotus_lividus_01.jpg/640px-Paracentrotus_lividus_01.jpg',desc:'Oursin fréquent sur les rochers. Ne pas marcher dessus et ne pas le prélever.',similar:['etoile','concombre']},
  {id:'etoile',name:'Étoile de mer rouge',latin:'Echinaster sepositus',group:'Échinoderme',habitat:'Roche',biome:'Roche',prob:20,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Echinaster_sepositus_1.jpg/640px-Echinaster_sepositus_1.jpg',desc:'Étoile rouge vif observée sur les roches ombragées.',similar:['oursin','concombre']},
  {id:'concombre',name:'Concombre de mer noir',latin:'Holothuria forskali',group:'Échinoderme',habitat:'Roche / sable',biome:'Sable',prob:50,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Holothuria_forskali.jpg/640px-Holothuria_forskali.jpg',desc:'Animal benthique allongé participant au recyclage des sédiments.',similar:['oursin','etoile']},
  {id:'crabe',name:'Crabe marbré',latin:'Pachygrapsus marmoratus',group:'Crustacé',habitat:'Rochers superficiels',biome:'Roche',prob:55,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pachygrapsus_marmoratus_2009_G1.jpg/640px-Pachygrapsus_marmoratus_2009_G1.jpg',desc:'Crabe rapide des rochers battus par les vagues, visible tout près de la surface.',similar:['oursin']}
];

const defaultState = () => ({version:VERSION,expeditions:[],observations:[],activeExpeditionId:null,selectedTab:'home',seenWhatsNew:false,region:'Corse',atlasFilter:'all',atlasBiome:'all',atlasSort:'prob',atlasSearch:'',favoriteSpecies:[]});
let state = load();
let modal = null;
let currentIdentifyId = null;

function load(){
  try{
    const x=JSON.parse(localStorage.getItem(KEY));
    if(x&&Array.isArray(x.observations)){
      x.expeditions=Array.isArray(x.expeditions)?x.expeditions:[];
      x.selectedTab=x.selectedTab||'home';
      x.seenWhatsNew=Boolean(x.seenWhatsNew);
      x.region=x.region||'Corse';
      x.atlasFilter=x.atlasFilter||'all';
      x.atlasBiome=x.atlasBiome||'all';
      x.atlasSort=x.atlasSort||'prob';
      x.atlasSearch=x.atlasSearch||'';
      x.favoriteSpecies=Array.isArray(x.favoriteSpecies)?x.favoriteSpecies:[];
      return x;
    }
  }catch(e){console.warn('BlueAtlas storage',e)}
  return defaultState();
}
function save(){state.version=VERSION;localStorage.setItem(KEY,JSON.stringify(state))}
function uid(p='id'){return p+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7)}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function fmtDate(x){return new Intl.DateTimeFormat('fr-FR',{dateStyle:'medium',timeStyle:'short'}).format(new Date(x))}
function fmtDay(x){return new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long'}).format(new Date(x))}
function duration(exp){const end=exp.endedAt||Date.now();const min=Math.max(0,Math.round((end-exp.startedAt)/60000));return min<60?min+' min':Math.floor(min/60)+' h '+String(min%60).padStart(2,'0')}
function sp(id){return species.find(s=>s.id===id)}
function expObs(id){return state.observations.filter(o=>o.expeditionId===id)}
function discovered(){return new Set(state.observations.filter(o=>o.speciesId&&o.certainty!=='pending').map(o=>o.speciesId))}
function active(){return state.expeditions.find(e=>e.id===state.activeExpeditionId&&!e.endedAt)}
function imageForSpecies(sid){const own=[...state.observations].reverse().find(o=>o.speciesId===sid&&o.photo);return own?.photo||sp(sid)?.img||''}
function obsForSpecies(sid){return state.observations.filter(o=>o.speciesId===sid).sort((a,b)=>a.createdAt-b.createdAt)}
function biomeStats(){const seen=discovered();return ['Herbier','Roche','Sable','Pleine eau'].map(name=>{const all=species.filter(s=>s.biome===name);const count=all.filter(s=>seen.has(s.id)).length;return {name,count,total:all.length,pct:all.length?Math.round(count/all.length*100):0,icon:{Herbier:'🌿',Roche:'🪨',Sable:'🏖️','Pleine eau':'🌊'}[name]}})}
function rarity(s){if(s.prob<=15)return {label:'Exceptionnelle',cls:'legendary'};if(s.prob<=30)return {label:'Rare',cls:'rare'};if(s.prob<=60)return {label:'Peu commune',cls:'uncommon'};return {label:'Commune',cls:'common'}}
function lastObsTime(id){const os=obsForSpecies(id);return os.length?os[os.length-1].createdAt:0}
function atlasGoal(){const bs=biomeStats().filter(b=>b.count<b.total).sort((a,b)=>(a.total-a.count)-(b.total-b.count))[0];if(!bs)return 'Tous les écosystèmes pilotes sont complétés.';const left=bs.total-bs.count;return `Plus que ${left} espèce${left>1?'s':''} pour compléter ${bs.name.toLowerCase()}.`}
function expeditionTitle(e){const os=expObs(e.id), ids=[...new Set(os.map(o=>o.speciesId).filter(Boolean))];const rare=ids.map(sp).filter(Boolean).sort((a,b)=>a.prob-b.prob)[0];const hour=new Date(e.startedAt).getHours();if(rare&&rare.prob<=25)return `La rencontre avec ${rare.name}`;if(hour<9)return `Lumière du matin à ${e.spot}`;if(os.length>=12)return `Grande exploration à ${e.spot}`;return `Les eaux de ${e.spot}`}
function expeditionStory(e){const os=expObs(e.id), ids=[...new Set(os.map(o=>o.speciesId).filter(Boolean))];const pending=os.filter(o=>!o.speciesId).length;const rare=ids.map(sp).filter(Boolean).sort((a,b)=>a.prob-b.prob)[0];let text=`Tu as exploré ${esc(e.spot||'la Corse')} pendant ${duration(e)} et capturé ${os.length} souvenir${os.length>1?'s':''}. `;if(ids.length)text+=`${ids.length} espèce${ids.length>1?'s ont':' a'} rejoint ton récit. `;if(rare)text+=`La rencontre marquante : ${esc(rare.name)}. `;if(pending)text+=`${pending} photo${pending>1?'s restent':' reste'} à identifier.`;return text}

async function compressFile(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1280;let w=img.width,h=img.height;if(Math.max(w,h)>max){const q=max/Math.max(w,h);w=Math.round(w*q);h=Math.round(h*q)}const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,w,h);resolve(c.toDataURL('image/jpeg',.78))};img.src=r.result};r.readAsDataURL(file)})}

function nav(){return `<nav class="nav">${[['home','⌂','Accueil'],['discoveries','⌁','Explorer'],['atlas','◫','Atlas'],['journal','◇','Journal'],['profile','◎','Profil']].map(([id,ic,l])=>`<button data-tab="${id}" class="${state.selectedTab===id?'active':''}"><b>${ic}</b>${l}</button>`).join('')}</nav>`}
function shell(content){return `<main class="app">${content}</main>${nav()}${modal||''}`}

function home(){
  const d=discovered(), photos=state.observations.filter(o=>o.photo).length, pending=state.observations.filter(o=>!o.speciesId).length;
  const last=[...state.expeditions].filter(e=>e.endedAt).sort((a,b)=>b.startedAt-a.startedAt)[0];
  const running=active();
  return shell(`<section class="hero">
    <div class="brand-row"><div class="brand">BLUE<span>ATLAS</span></div><button class="version-pill" id="versionBtn">Alpha v${VERSION}</button></div>
    <div class="hero-location"><span>📍</span><div><b>${running?esc(running.spot):'Corse-du-Sud'}</b><small>${running?'Expédition en cours':'Prêt pour une nouvelle aventure'}</small></div></div>
    <div class="eyebrow">Compagnon d’exploration</div><h1>${running?'Ton expédition continue':'Bonjour Julien'}</h1>
    <p class="sub">${running?'Retourne au mode terrain en un geste.':'La mer est magnifique aujourd’hui. Capture maintenant, identifie plus tard.'}</p>
    <button class="btn block" id="startExp">${running?'Continuer l’expédition':'Commencer une expédition'}</button>
  </section>
  <div class="stats"><div class="stat"><strong>${d.size}</strong><span>espèces</span></div><div class="stat"><strong>${photos}</strong><span>photos</span></div><div class="stat"><strong>${state.expeditions.length}</strong><span>expéditions</span></div></div>
  ${pending?`<article class="card clickable discovery-callout" data-tab="discoveries"><div class="callout-icon">❓</div><div><div class="eyebrow">À faire après la sortie</div><h2>${pending} souvenir${pending>1?'s':''} à identifier</h2><p class="muted">Retrouve tes photos et complète ton Atlas tranquillement.</p></div><span class="chevron">›</span></article>`:''}
  ${last?`<div class="section-title"><h2>Dernière aventure</h2><span>Revivre</span></div>${expeditionCard(last)}`:''}`)
}

function expeditionCard(e){const os=expObs(e.id),cover=os.find(o=>o.photo)?.photo,ids=new Set(os.map(o=>o.speciesId).filter(Boolean));return `<article class="card expedition-card clickable" data-open-exp="${e.id}">${cover?`<img class="expedition-cover" src="${cover}" alt="Couverture de l’expédition">`:`<div class="expedition-placeholder">🌊</div>`}<div class="expedition-body"><div class="eyebrow">${fmtDay(e.startedAt)}</div><h2>${esc(e.title||expeditionTitle(e))}</h2><p class="mini-story">${expeditionStory(e)}</p><div class="stats"><div class="stat"><strong>${os.length}</strong><span>souvenirs</span></div><div class="stat"><strong>${ids.size}</strong><span>espèces</span></div><div class="stat"><strong>${duration(e)}</strong><span>durée</span></div></div></div></article>`}

function discoveries(){
  const pending=state.observations.filter(o=>!o.speciesId).slice().reverse();
  const done=state.observations.filter(o=>o.speciesId).slice().reverse();
  return shell(`<div class="topbar"><div><div class="eyebrow">Capture maintenant. Identifie plus tard.</div><h1>Explorer</h1></div><button class="btn icon secondary" id="addLibrary" aria-label="Ajouter des photos">＋</button></div>
  <p class="muted">Retrouve les souvenirs pris sous l’eau, puis attribue une espèce en quelques secondes.</p>
  <div class="section-title"><h2>À identifier</h2><span>${pending.length}</span></div>
  ${pending.length?`<div class="discovery-stack">${pending.map((o,i)=>`<article class="card discovery-large ${i?'compact':''}"><img src="${o.photo}" alt="Souvenir"><div class="discovery-overlay"><span class="badge">Souvenir #${pending.length-i}</span><button class="btn" data-identify="${o.id}">Identifier cette découverte</button></div></article>`).join('')}</div>`:'<div class="card empty"><b>Tout est identifié.</b><br>Ton Atlas est à jour.</div>'}
  <div class="section-title"><h2>Souvenirs identifiés</h2><span>${done.length}</span></div>
  ${done.length?`<div class="photo-list">${done.map(o=>{const s=sp(o.speciesId);return `<article class="card photo-card clickable" data-species="${s.id}"><img src="${o.photo||s.img}" alt="${esc(s.name)}"><div class="actions"><b>${esc(s.name)}</b><div class="muted">${fmtDate(o.createdAt)}</div></div></article>`}).join('')}</div>`:'<div class="card empty">Tes espèces identifiées apparaîtront ici.</div>'}`)
}

function reefScene(){const seen=[...discovered()].map(sp).filter(Boolean).slice(0,10);return `<div class="reef"><div class="sun-rays"></div><div class="reef-ground"><span>〰</span><span>⌇</span><span>〰</span></div>${seen.map((s,i)=>`<button class="reef-fish fish-${i%6}" data-species="${s.id}" title="${esc(s.name)}"><img src="${imageForSpecies(s.id)}" alt="${esc(s.name)}"></button>`).join('')}${!seen.length?'<div class="reef-empty">Ton écosystème prendra vie<br>avec chaque découverte.</div>':''}</div>`}

function atlas(){
  const seen=discovered(), biomes=biomeStats();
  const q=(state.atlasSearch||'').trim().toLowerCase();
  let list=species.filter(s=>{
    if(state.atlasFilter==='seen'&&!seen.has(s.id))return false;
    if(state.atlasFilter==='unseen'&&seen.has(s.id))return false;
    if(state.atlasFilter==='favorite'&&!state.favoriteSpecies.includes(s.id))return false;
    if(state.atlasBiome!=='all'&&s.biome!==state.atlasBiome)return false;
    return !q||[s.name,s.latin,s.group,s.habitat,s.desc].join(' ').toLowerCase().includes(q);
  });
  list.sort((a,b)=>state.atlasSort==='name'?a.name.localeCompare(b.name,'fr'):state.atlasSort==='rare'?a.prob-b.prob:state.atlasSort==='recent'?lastObsTime(b.id)-lastObsTime(a.id):b.prob-a.prob);
  return shell(`<div class="topbar"><div><div class="eyebrow">Ta collection vivante</div><h1>Mon Atlas</h1></div><span class="count">${seen.size}/${species.length}</span></div>
  ${reefScene()}
  <article class="card atlas-goal"><div class="goal-icon">🧭</div><div><div class="eyebrow">Prochain objectif</div><b>${atlasGoal()}</b></div></article>
  <div class="section-title"><h2>Écosystèmes</h2><span>Progression</span></div>
  <div class="biome-grid">${biomes.map(b=>`<button class="card biome-card ${state.atlasBiome===b.name?'selected':''}" data-atlas-biome="${b.name}"><div class="biome-icon">${b.icon}</div><div><b>${b.name}</b><small>${b.count}/${b.total} espèces</small></div><div class="progress"><i style="width:${b.pct}%"></i></div><strong>${b.pct}%</strong></button>`).join('')}</div>
  <div class="atlas-tools card"><input class="field" id="atlasSearch" value="${esc(state.atlasSearch)}" placeholder="Rechercher une espèce, un habitat…"><div class="filter-row">${[['all','Toutes'],['seen','Découvertes'],['unseen','À découvrir'],['favorite','Favorites']].map(([id,l])=>`<button class="filter-chip ${state.atlasFilter===id?'active':''}" data-atlas-filter="${id}">${l}</button>`).join('')}</div><div class="sort-row"><button class="filter-chip ${state.atlasBiome==='all'?'active':''}" data-atlas-biome="all">Tous les milieux</button><select class="field compact" id="atlasSort"><option value="prob" ${state.atlasSort==='prob'?'selected':''}>Plus probables</option><option value="rare" ${state.atlasSort==='rare'?'selected':''}>Plus rares</option><option value="recent" ${state.atlasSort==='recent'?'selected':''}>Observées récemment</option><option value="name" ${state.atlasSort==='name'?'selected':''}>Nom A–Z</option></select></div></div>
  <div class="section-title"><h2>Cartes d’espèces</h2><span>${list.length} affichée${list.length>1?'s':''}</span></div>
  ${list.length?`<div class="species-grid premium">${list.map(s=>{const r=rarity(s),isSeen=seen.has(s.id),fav=state.favoriteSpecies.includes(s.id),os=obsForSpecies(s.id);return `<article class="card species premium-card clickable ${isSeen?'':'locked'}" data-species="${s.id}"><div class="species-photo"><img src="${imageForSpecies(s.id)}" alt="${esc(s.name)}"><span class="rarity ${r.cls}">${r.label}</span>${fav?'<span class="favorite-mark">★</span>':''}</div><div class="species-body"><small>${esc(s.biome)} · ${s.prob}% indicatif</small><h3>${esc(s.name)}</h3><small><i>${esc(s.latin)}</i></small><div class="species-meta"><span>${isSeen?`${os.length} rencontre${os.length>1?'s':''}`:'Pas encore rencontrée'}</span><span>${isSeen?'Découverte':'À découvrir'}</span></div></div></article>`}).join('')}</div>`:'<div class="card empty">Aucune espèce ne correspond à ces filtres.</div>'}`)
}
function journal(){const exps=[...state.expeditions].sort((a,b)=>b.startedAt-a.startedAt);return shell(`<div class="topbar"><div><div class="eyebrow">Tes histoires sous-marines</div><h1>Journal</h1></div><span class="count">${exps.length}</span></div>${exps.length?exps.map(expeditionCard).join(''):'<div class="card empty">Commence une expédition pour créer ton premier souvenir.</div>'}`)}

function profile(){return shell(`<div class="topbar"><div><div class="eyebrow">Ton espace</div><h1>Profil</h1></div><button class="version-pill" id="versionBtn">v${VERSION}</button></div><div class="card profile-hero"><div style="display:flex;gap:15px;align-items:center"><div class="profile-avatar">J</div><div><h2 style="margin-bottom:4px">Julien</h2><p class="muted" style="margin:0">Explorateur sous-marin · ${esc(state.region)}</p></div></div><div class="stats"><div class="stat"><strong>${state.expeditions.length}</strong><span>expéditions</span></div><div class="stat"><strong>${discovered().size}</strong><span>espèces</span></div><div class="stat"><strong>${state.observations.filter(o=>o.photo).length}</strong><span>photos</span></div></div></div><div class="card"><h3>Protéger mes souvenirs</h3><p class="muted">Crée une sauvegarde avant un changement important de version ou d’adresse.</p><button class="btn block" id="exportBtn">Exporter mes données</button><button class="btn block secondary" id="restoreBtn" style="margin-top:10px">Restaurer une sauvegarde</button></div><div class="card"><h3>Application</h3><p>BlueAtlas Alpha <b>v${VERSION}</b></p><p class="muted">Données stockées uniquement sur cet appareil.</p><button class="btn block danger" id="resetBtn">Effacer toutes les données</button></div><div class="version">Chaque observation raconte une histoire.</div>`)}

function terrain(){const e=active();if(!e)return home();const os=expObs(e.id),pending=os.filter(o=>!o.speciesId).length;return `<section class="terrain"><div class="terrain-bg"></div><div class="terrain-ui"><div class="terrain-head"><div><b>${esc(e.spot||'Expédition')}</b><div class="timer" id="timer">${duration(e)}</div></div><div class="terrain-counter">📷 ${os.length} &nbsp; ❓ ${pending}</div></div><div class="terrain-center"><button class="shutter" id="terrainCamera" aria-label="Capturer un souvenir"><span>📷</span></button><div class="capture-label">Capturer un souvenir</div></div><div class="terrain-foot"><button class="btn secondary small" id="terrainLibrary">Photothèque</button><button class="btn danger small" id="finishExp">Terminer</button></div></div></section>`}

function versionModal(){modal=`<div class="modal"><div class="sheet"><button class="btn secondary small" data-close>Fermer</button><div class="eyebrow" style="margin-top:16px">BlueAtlas Alpha</div><h1>Version ${VERSION}</h1><p class="muted">Sprint MarineDex Premium.</p><div class="card whats-new"><h3>Nouveautés</h3><ul><li>Recherche et filtres avancés dans l’Atlas.</li><li>Tri par probabilité, rareté, date et nom.</li><li>Cartes premium avec rareté et historique personnel.</li><li>Espèces favorites et objectif d’écosystème.</li><li>Navigation directe par habitat.</li></ul></div><button class="btn block" data-close>Continuer l’exploration</button></div></div>`;state.seenWhatsNew=true;save();render()}
function startExpeditionModal(){modal=`<div class="modal"><div class="sheet"><button class="btn secondary small" data-close>Annuler</button><div class="eyebrow" style="margin-top:16px">Nouvelle aventure</div><h1>Où explores-tu ?</h1><p class="muted">Le spot sera associé automatiquement à toutes les photos de cette expédition.</p><div class="spot-grid">${spots.map(s=>`<button class="spot-choice" data-spot="${s.id}"><span>${s.icon}</span><div><b>${esc(s.name)}</b><small>${esc(s.habitat)}</small></div><i>›</i></button>`).join('')}</div></div></div>`;render()}

function speciesModal(sid){const s=sp(sid),os=obsForSpecies(sid),first=os[0],last=os[os.length-1],fav=state.favoriteSpecies.includes(sid),r=rarity(s);modal=`<div class="modal"><div class="sheet"><div class="sheet-actions"><button class="btn secondary small" data-close>Fermer</button><button class="favorite-toggle ${fav?'active':''}" data-favorite-species="${sid}" aria-label="Ajouter aux favorites">${fav?'★':'☆'}</button></div><img src="${imageForSpecies(sid)}" alt="${esc(s.name)}" style="margin-top:12px"><div class="species-title-row"><div><h1 style="margin:16px 0 4px">${esc(s.name)}</h1><p style="margin:0"><i>${esc(s.latin)}</i></p></div><span class="rarity ${r.cls}">${r.label}</span></div><span class="chip">${esc(s.group)}</span><span class="chip">${esc(s.habitat)}</span><span class="chip">${s.prob}% indicatif</span><p style="margin-top:15px">${esc(s.desc)}</p><div class="personal-story"><div><small>Première rencontre</small><b>${first?fmtDate(first.createdAt):'À découvrir'}</b><span>${first?esc(first.spot||'Corse'):'—'}</span></div><div><small>Dernière rencontre</small><b>${last?fmtDate(last.createdAt):'—'}</b><span>${os.length} observation${os.length>1?'s':''}</span></div></div><h3>Espèces ressemblantes</h3><div class="similar-row">${s.similar.map(id=>{const x=sp(id);return x?`<button class="similar" data-species="${x.id}"><img src="${x.img}" alt="${esc(x.name)}"><span>${esc(x.name)}</span></button>`:''}).join('')}</div><h3>Tes rencontres (${os.length})</h3>${os.length?os.slice().reverse().map(o=>`<div class="timeline-item">${o.photo?`<img src="${o.photo}">`:''}<div><b>${fmtDate(o.createdAt)}</b><div class="muted">${esc(o.spot||'Corse-du-Sud')}</div></div></div>`).join(''):'<p class="muted">Pas encore observée.</p>'}</div></div>`;render()}
function identifyModal(oid){const o=state.observations.find(x=>x.id===oid);if(!o)return;currentIdentifyId=oid;modal=`<div class="modal"><div class="sheet"><button class="btn secondary small" data-close>Fermer</button><img src="${o.photo}" alt="Photo à identifier" style="margin-top:12px"><h2 style="margin-top:16px">Quelle espèce est-ce ?</h2><input class="field" id="speciesSearch" placeholder="Rechercher une espèce"><div id="candidates">${candidateList('')}</div></div></div>`;render();setTimeout(()=>document.getElementById('speciesSearch')?.focus(),30)}
function candidateList(q){const qq=q.trim().toLowerCase();return species.filter(s=>!qq||[s.name,s.latin,s.group,s.habitat,s.desc].join(' ').toLowerCase().includes(qq)).sort((a,b)=>b.prob-a.prob).map(s=>`<button class="candidate" data-choose-species="${s.id}"><img src="${s.img}"><div class="grow"><b>${esc(s.name)}</b><div class="muted"><i>${esc(s.latin)}</i> · ${s.prob}%</div></div><span>›</span></button>`).join('')}

function discoveryModal(sid){const s=sp(sid);modal=`<div class="modal discovery-modal"><div class="sheet"><div class="discovery-burst">✨</div><div class="eyebrow">Nouvelle espèce</div><h1>${esc(s.name)}</h1><p><i>${esc(s.latin)}</i></p><img src="${imageForSpecies(sid)}" alt="${esc(s.name)}"><p class="muted">Cette rencontre rejoint maintenant ton Atlas vivant.</p><button class="btn block" data-close>Voir la prochaine découverte</button></div></div>`;render()}

function expeditionModal(id){const e=state.expeditions.find(x=>x.id===id),os=expObs(id).sort((a,b)=>a.createdAt-b.createdAt),ids=[...new Set(os.map(o=>o.speciesId).filter(Boolean))],cover=os.find(o=>o.photo)?.photo;modal=`<div class="modal"><div class="sheet expedition-sheet"><button class="btn secondary small" data-close>Fermer</button>${cover?`<img class="journal-hero" src="${cover}" alt="Couverture">`:''}<div class="eyebrow" style="margin-top:16px">${fmtDay(e.startedAt)}</div><h1>${esc(e.title||expeditionTitle(e))}</h1><p class="muted">${esc(e.spot)} · ${duration(e)}</p><div class="stats"><div class="stat"><strong>${os.length}</strong><span>souvenirs</span></div><div class="stat"><strong>${ids.length}</strong><span>espèces</span></div><div class="stat"><strong>${os.filter(o=>!o.speciesId).length}</strong><span>à identifier</span></div></div><div class="journal-story">${expeditionStory(e)}</div><h3>Chronologie</h3>${os.length?os.map(o=>{const s=o.speciesId?sp(o.speciesId):null;return `<div class="timeline-item ${!s?'pending':''}">${o.photo?`<img src="${o.photo}">`:''}<div><b>${new Date(o.createdAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})} · ${s?esc(s.name):'À identifier'}</b><div class="muted">${s?esc(s.latin):'Souvenir capturé sous l’eau'}</div>${!s?`<button class="text-action" data-identify="${o.id}">Identifier maintenant</button>`:''}</div></div>`}).join(''):'<p class="muted">Aucune photo.</p>'}</div></div>`;render()}

function render(){const root=document.getElementById('app');root.innerHTML=active()&&state.selectedTab==='terrain'?terrain():({home,discoveries,atlas,journal,profile}[state.selectedTab]||home)();bind()}

function bind(){
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.selectedTab=b.dataset.tab;save();render()});
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{modal=null;currentIdentifyId=null;render()});
  document.querySelectorAll('[data-species]').forEach(b=>b.onclick=()=>speciesModal(b.dataset.species));
  document.querySelectorAll('[data-open-exp]').forEach(b=>b.onclick=()=>expeditionModal(b.dataset.openExp));
  document.querySelectorAll('[data-identify]').forEach(b=>b.onclick=()=>identifyModal(b.dataset.identify));
  document.querySelectorAll('[data-atlas-filter]').forEach(b=>b.onclick=()=>{state.atlasFilter=b.dataset.atlasFilter;save();render()});
  document.querySelectorAll('[data-atlas-biome]').forEach(b=>b.onclick=()=>{state.atlasBiome=b.dataset.atlasBiome;save();render()});
  document.querySelectorAll('[data-favorite-species]').forEach(b=>b.onclick=()=>{const id=b.dataset.favoriteSpecies;state.favoriteSpecies=state.favoriteSpecies.includes(id)?state.favoriteSpecies.filter(x=>x!==id):[...state.favoriteSpecies,id];save();speciesModal(id)});
  document.querySelectorAll('[data-spot]').forEach(b=>b.onclick=()=>{const s=spots.find(x=>x.id===b.dataset.spot);let spot=s.name;if(s.id==='other')spot=prompt('Nom du spot','Plage de Corse')||'Corse';const id=uid('exp');state.expeditions.push({id,spot,region:s.region,title:null,startedAt:Date.now(),endedAt:null});state.activeExpeditionId=id;state.selectedTab='terrain';modal=null;save();render()});
  document.getElementById('versionBtn')?.addEventListener('click',versionModal);
  document.getElementById('startExp')?.addEventListener('click',()=>{if(active()){state.selectedTab='terrain';save();render()}else startExpeditionModal()});
  document.getElementById('terrainCamera')?.addEventListener('click',()=>document.getElementById('cameraInput').click());
  document.getElementById('terrainLibrary')?.addEventListener('click',()=>document.getElementById('libraryInput').click());
  document.getElementById('addLibrary')?.addEventListener('click',()=>{if(!active()){alert('Démarre une expédition avant d’ajouter des photos.');return}document.getElementById('libraryInput').click()});
  document.getElementById('finishExp')?.addEventListener('click',()=>{const e=active();if(e&&confirm('Terminer cette expédition ?')){e.endedAt=Date.now();e.title=expeditionTitle(e);state.activeExpeditionId=null;state.selectedTab='journal';save();expeditionModal(e.id)}});
  document.getElementById('speciesSearch')?.addEventListener('input',e=>{document.getElementById('candidates').innerHTML=candidateList(e.target.value);bindCandidates()});
  document.getElementById('atlasSearch')?.addEventListener('input',e=>{state.atlasSearch=e.target.value;save();render()});
  document.getElementById('atlasSort')?.addEventListener('change',e=>{state.atlasSort=e.target.value;save();render()});
  bindCandidates();
  document.getElementById('exportBtn')?.addEventListener('click',exportData);
  document.getElementById('restoreBtn')?.addEventListener('click',()=>document.getElementById('restoreInput').click());
  document.getElementById('resetBtn')?.addEventListener('click',()=>{if(confirm('Effacer définitivement toutes les données BlueAtlas ?')){state=defaultState();save();render()}});
}
function bindCandidates(){document.querySelectorAll('[data-choose-species]').forEach(b=>b.onclick=()=>{const obs=state.observations.find(o=>o.id===currentIdentifyId);if(!obs)return;const wasSeen=discovered().has(b.dataset.chooseSpecies);obs.speciesId=b.dataset.chooseSpecies;obs.certainty='confirmed';save();currentIdentifyId=null;if(!wasSeen)discoveryModal(obs.speciesId);else{modal=null;render()}})}

async function ingest(files){const e=active();if(!e){alert('Démarre une expédition avant de capturer un souvenir.');return}for(const f of files){try{const photo=await compressFile(f);state.observations.push({id:uid('obs'),expeditionId:e.id,photo,speciesId:null,certainty:'pending',spot:e.spot,region:e.region||state.region,createdAt:Date.now()})}catch(err){console.error(err);alert('Impossible de traiter une photo.')}}save();render()}
function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`blueatlas-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}

document.getElementById('cameraInput').addEventListener('change',e=>{ingest([...e.target.files]);e.target.value='' });
document.getElementById('libraryInput').addEventListener('change',e=>{ingest([...e.target.files]);e.target.value='' });
document.getElementById('restoreInput').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.observations||!x.expeditions)throw new Error();state=x;save();render();alert('Sauvegarde restaurée.')}catch{alert('Fichier de sauvegarde invalide.')}};r.readAsText(f);e.target.value=''});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register(`sw.js?v=${CACHE_BUST}`).catch(console.warn))}
if(!state.seenWhatsNew||state.version!==VERSION){state.seenWhatsNew=false;save();setTimeout(versionModal,300)}else render();
