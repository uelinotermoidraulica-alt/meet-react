const state = {
  view: "home",
  hearts: Number(localStorage.getItem("mr_hearts") || 35),
  verified: localStorage.getItem("mr_verified") === "true",
  myInterests: JSON.parse(localStorage.getItem("mr_interests") || '["musica","montagna","caffè"]'),
  currentUser: 0,
  points: JSON.parse(localStorage.getItem("mr_points") || '{"Giulia":34,"Marta":18,"Sara":61}'),
  chat: JSON.parse(localStorage.getItem("mr_chat") || '["Giulia ha accettato il tuo sticker ☕"]'),
  tris: Array(9).fill("")
};

const users = [
  {name:"Giulia", age:32, distance:120, avatar:"💃", bio:"Aperitivo, musica e ironia.", interests:["musica","montagna","aperitivo"], verified:true},
  {name:"Marta", age:28, distance:45, avatar:"🎧", bio:"Caffè, concerti e passeggiate.", interests:["musica","caffè","eventi"], verified:true},
  {name:"Sara", age:35, distance:250, avatar:"⛰️", bio:"Natura, trekking e vino buono.", interests:["montagna","natura","food"], verified:false},
  {name:"Luna", age:29, distance:410, avatar:"🌙", bio:"Fuori raggio demo: non deve comparire.", interests:["moda","cinema"], verified:true}
];

const stickers = [
  ["🔥","Sei tanta roba"],["🍾","Sblocchiamo?"],["🤮","Non sei il mio tipo"],
  ["☕","Caffè insieme?"],["🍹","Drink?"],["👋","Sono qui vicino"],
  ["💋","Bacio"],["🚶","Due passi?"],["😏","Mi incuriosisci"],
  ["🌙","After?"],["🍸","Drink + chimica?"],["💬","Parliamo due minuti?"]
];

function save(){
  localStorage.setItem("mr_hearts", state.hearts);
  localStorage.setItem("mr_verified", state.verified);
  localStorage.setItem("mr_interests", JSON.stringify(state.myInterests));
  localStorage.setItem("mr_points", JSON.stringify(state.points));
  localStorage.setItem("mr_chat", JSON.stringify(state.chat));
}

function showView(view){
  state.view = view;
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
  const nav = document.getElementById("nav-"+view);
  if(nav) nav.classList.add("active");
  render();
}

function nearbyUsers(){ return users.filter(u => u.distance <= 300); }

function commonInterests(u){
  return u.interests.filter(i => state.myInterests.includes(i));
}

function render(){
  document.getElementById("heartCount").textContent = state.hearts;
  const c = document.getElementById("content");
  if(state.view==="home") c.innerHTML = home();
  if(state.view==="stickers") c.innerHTML = stickersView();
  if(state.view==="tris") c.innerHTML = trisView();
  if(state.view==="chat") c.innerHTML = chatView();
  if(state.view==="menu") c.innerHTML = menuView();
  if(state.view==="profile") c.innerHTML = profileView();
}

function home(){
  const list = nearbyUsers().map((u,idx)=>{
    const common = commonInterests(u);
    const pts = state.points[u.name] || 0;
    return `<div class="card profile-card" onclick="openProfile(${idx})">
      <div class="avatar">${u.avatar}</div>
      <div>
        <h2 class="name">${u.name}, ${u.age}</h2>
        <p class="meta">📍 ${u.distance} m • 🟢 Attiva ora</p>
        <p class="bio">${u.bio}</p>
        <div>${u.verified?'<span class="badge">✅ Verificata</span>':''}</div>
        <div class="interests">${u.interests.map(i=>`<span class="chip">${i}</span>`).join("")}</div>
        <p class="common">🔥 ${common.length} interessi in comune</p>
        <div class="progress-wrap"><div class="progress-label"><span>Interesse</span><span>${pts}/100</span></div><div class="progress"><span style="width:${pts}%"></span></div></div>
      </div>
    </div>`;
  }).join("");
  return `<div class="notice">📍 Visibilità limitata a 300 metri. Le persone oltre questa distanza non compaiono.</div>
  <h2 class="section-title">Persone vicine</h2>${list}`;
}

function openProfile(idx){
  const u = nearbyUsers()[idx];
  const common = commonInterests(u);
  const pts = state.points[u.name] || 0;
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-bg" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="avatar">${u.avatar}</div>
      <h2>${u.name}, ${u.age}</h2>
      <p class="meta">📍 ${u.distance} m • 🟢 Attiva ora ${u.verified?'• ✅ verificata':''}</p>
      <p>${u.bio}</p>
      <div class="interests">${u.interests.map(i=>`<span class="chip">${i}</span>`).join("")}</div>
      <p class="common">${common.length} interessi in comune</p>
      <div class="progress-wrap"><div class="progress-label"><span>Interesse</span><span>${pts}/100</span></div><div class="progress"><span style="width:${pts}%"></span></div></div>
      <div class="grid2" style="margin-top:14px">
        <button class="btn primary" onclick="sendSticker('${u.name}','☕ Caffè insieme?')">☕ Caffè insieme?</button>
        <button class="btn" onclick="sendSticker('${u.name}','🔥 Sei tanta roba')">🔥 Sticker</button>
        <button class="btn" onclick="challenge('${u.name}')">🎮 Sfida a tris</button>
        <button class="btn danger" onclick="toast('Hai passato ${u.name}')">❌ Passa</button>
      </div>
      <button class="btn" style="margin-top:10px" onclick="document.querySelector('.modal-bg').remove()">Chiudi</button>
    </div>
  </div>`);
}

function closeModal(e){ if(e.target.classList.contains("modal-bg")) e.target.remove(); }

function sendSticker(name, text){
  state.points[name] = Math.min(100, (state.points[name] || 0) + 5);
  state.chat.push(`Hai inviato a ${name}: ${text}`);
  save(); render();
  toast(`Sticker inviato a ${name}: ${text}`);
}

function challenge(name){
  state.points[name] = Math.min(100, (state.points[name] || 0) + 5);
  state.chat.push(`Hai sfidato ${name} a tris 🎮`);
  save(); showView("tris"); toast(`Sfida a tris inviata a ${name}`);
}

function stickersView(){
  return `<h2 class="section-title">Sticker disponibili</h2>
  <div class="grid3">${stickers.map(s=>`<button class="sticker" onclick="toast('Sticker selezionato: ${s[1]}')"><span class="emoji">${s[0]}</span><span>${s[1]}</span></button>`).join("")}</div>
  <h2 class="section-title">Shop demo</h2>
  <div class="card"><p>❤️ Cuori disponibili: <b>${state.hearts}</b></p><div class="grid2">
  <button class="btn primary" onclick="buyPack(10)">10 sticker base</button>
  <button class="btn" onclick="buyPack(25)">5 premium</button></div></div>`;
}

function buyPack(cost){
  if(state.hearts < cost) return toast("Cuori insufficienti");
  state.hearts -= cost; save(); render(); toast("Pacchetto acquistato demo");
}

function trisView(){
  return `<h2 class="section-title">Sfida a tris</h2><div class="notice">Chi vince sblocca uno sticker speciale. Nessuno è obbligato a rispondere.</div>
  <div class="tris-board">${state.tris.map((v,i)=>`<button class="cell" onclick="playCell(${i})">${v}</button>`).join("")}</div>
  <button class="btn danger" onclick="resetTris()">Reset partita</button>`;
}

function playCell(i){
  if(state.tris[i]) return;
  state.tris[i]="X";
  const empty = state.tris.map((v,i)=>v?null:i).filter(v=>v!==null);
  if(empty.length){ state.tris[empty[Math.floor(Math.random()*empty.length)]]="O"; }
  render();
}

function resetTris(){ state.tris = Array(9).fill(""); render(); }

function chatView(){
  return `<h2 class="section-title">Chat demo</h2><div class="card chat-box">
  ${state.chat.map((m,i)=>`<div class="msg ${i%2?'':'me'}">${m}</div>`).join("")}
  <div style="display:flex;gap:8px;margin-top:8px"><input class="input" id="msgInput" placeholder="Scrivi..." /><button class="btn primary" style="width:110px" onclick="sendMsg()">Invia</button></div>
  </div>`;
}

function sendMsg(){
  const i=document.getElementById("msgInput");
  if(!i.value.trim()) return;
  state.chat.push(i.value.trim()); i.value=""; save(); render();
}

function profileView(){
  return `<h2 class="section-title">Il mio profilo</h2><div class="card">
  <div class="avatar">🙂</div><h2>Andrea</h2>
  <p class="meta">${state.verified?'✅ Profilo verificato':'⚠️ Profilo non verificato'}</p>
  <p class="bio">La foto profilo deve rappresentare la persona reale.</p>
  <div class="interests">${state.myInterests.map(i=>`<span class="chip">${i}</span>`).join("")}</div>
  <button class="btn green" style="margin-top:14px" onclick="verifyPhoto()">📸 Verifica foto profilo</button></div>`;
}

function verifyPhoto(){
  state.verified = true; save(); render(); toast("Verifica foto completata nel prototipo");
}

function menuView(){
  return `<h2 class="section-title">Menu</h2>
  <div class="grid2">
    <button class="btn" onclick="showView('stickers')">🛒 Shop sticker</button>
    <button class="btn" onclick="showView('profile')">👤 Profilo</button>
    <button class="btn" onclick="toast('Modalità invisibile attivata demo')">👻 Invisibile</button>
    <button class="btn" onclick="toast('Utente bloccato demo')">🚫 Blocca</button>
    <button class="btn" onclick="toast('Segnalazione inviata demo')">⚠️ Segnala</button>
    <button class="btn danger" onclick="logout()">🚪 Esci</button>
  </div>
  <p class="notice" style="margin-top:14px">Gli sticker sono inviti simbolici. Nessuno è obbligato a rispondere.</p>`;
}

function logout(){ localStorage.clear(); toast("Dati demo cancellati"); setTimeout(()=>location.reload(),700); }

function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg; t.style.display="block";
  setTimeout(()=>t.style.display="none",2300);
}

showView("home");// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIydfYnvkcKVai2m6Zl7LjnsXiQnT0PMk"
  authDomain: "meet-react-dd136.firebaseapp.com",
  projectId: "meet-react-dd136",
  storageBucket: "meet-react-dd136.firebasestorage.app",
  messagingSenderId: "902511777751",
  appId: "1:902511777751:web:514ffef33e30d704575d92",

measurementId: "G-X3SEF0W2N5"
};

