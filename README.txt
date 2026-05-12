<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Meet & React</title>
<meta name="theme-color" content="#d9b07a">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;color:#fffaf1;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:radial-gradient(circle at 18% 14%,rgba(255,255,255,.55),transparent 22%),radial-gradient(circle at 84% 22%,rgba(255,228,182,.75),transparent 30%),linear-gradient(180deg,#f2dfc4 0%,#dcb688 52%,#b77c48 100%);background-attachment:fixed}
body:before{content:"";position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(96,55,25,.065) 0 2px,transparent 2px 14px),radial-gradient(circle at 50% 110%,rgba(83,41,20,.42),transparent 45%)}
.app{position:relative;max-width:520px;min-height:100vh;margin:auto;padding:calc(18px + env(safe-area-inset-top)) 18px calc(100px + env(safe-area-inset-bottom))}
.topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px}
h1{margin:0;font-size:34px;letter-spacing:.5px;color:white;text-shadow:0 3px 0 rgba(92,49,23,.62),0 7px 18px rgba(0,0,0,.45)}
.subtitle{margin:5px 0 0;color:#5f3c22;font-weight:800;text-shadow:0 1px 0 rgba(255,255,255,.45)}
.pill,.btn{border:1px solid rgba(255,255,255,.24);border-radius:20px;color:white;font-weight:850;background:rgba(48,38,62,.78);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 7px 16px rgba(0,0,0,.25)}
.pill{padding:12px 15px;white-space:nowrap}
.btn{width:100%;padding:15px;margin:6px 0;font-size:17px;cursor:pointer}
.primary{background:linear-gradient(135deg,#ef5fa4,#7656ff);border:none}
.green{background:linear-gradient(135deg,#3f7351,#88a865)}
.wood{background:linear-gradient(135deg,#8c552c,#d19a62);text-shadow:0 2px 0 rgba(86,39,12,.55)}
.red{background:linear-gradient(135deg,#703222,#b14a32)}
.card{background:rgba(22,17,28,.74);border:1px solid rgba(255,255,255,.20);border-radius:28px;padding:18px;margin-bottom:14px;backdrop-filter:blur(10px);box-shadow:0 14px 36px rgba(61,31,17,.32),inset 0 1px 0 rgba(255,255,255,.18)}
.screen-title{font-size:31px;margin:0 0 12px;color:white;text-shadow:0 2px 8px rgba(0,0,0,.48)}
.card-title{font-size:25px;margin:0 0 8px;color:white;text-shadow:0 2px 8px rgba(0,0,0,.48)}
p,.bio,.small{color:#f1d8b8;line-height:1.35;font-size:16px}
.small{font-size:13px}
.input,textarea{width:100%;padding:14px;margin:7px 0;border-radius:17px;border:1px solid rgba(255,255,255,.22);background:rgba(12,10,18,.58);color:white;font-size:16px;outline:none}
textarea{min-height:90px;resize:none}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.grid3{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.avatar{width:92px;height:92px;border-radius:50%;display:grid;place-items:center;overflow:hidden;background:linear-gradient(135deg,#ef5fa4,#7656ff);font-size:38px;border:3px solid rgba(255,240,220,.7);box-shadow:0 12px 25px rgba(0,0,0,.28)}
.avatar.big{width:148px;height:148px;margin:8px auto 12px;font-size:58px}
.avatar img{width:100%;height:100%;object-fit:cover}
.user-card{display:grid;grid-template-columns:104px 1fr;gap:14px;align-items:center}
.badge{display:inline-flex;padding:6px 10px;border-radius:999px;background:rgba(83,140,82,.32);color:#d4ffbd;border:1px solid rgba(190,255,170,.25);font-weight:800}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:9px 0}
.chip{display:inline-block;border-radius:999px;padding:8px 12px;background:rgba(255,238,204,.14);border:1px solid rgba(255,238,204,.22);color:#ffe7be;font-weight:750;font-size:13px}
.interest-list{display:flex;flex-direction:column;gap:8px;margin:11px 0}
.interest-row{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:16px;background:rgba(12,10,18,.42);border:1px solid rgba(255,255,255,.15);color:#fff1d3;font-weight:750}
.file-label{display:block;width:max-content;margin:0 auto 12px;padding:10px 14px;border-radius:18px;background:linear-gradient(135deg,#8c552c,#d19a62);font-weight:850;box-shadow:0 8px 18px rgba(0,0,0,.24)}
.file-label input{display:none}
.sticker{min-height:150px;border-radius:24px;border:1px solid rgba(255,255,255,.22);background:rgba(22,17,28,.67);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;color:white;font-weight:850;padding:10px;text-align:center}
.sticker img{width:84px;height:84px;object-fit:cover;border-radius:20px;box-shadow:0 10px 18px rgba(0,0,0,.22)}
.chatbox{max-height:48vh;overflow:auto;padding:3px 0}
.bubble{max-width:84%;padding:12px 14px;border-radius:18px;margin:8px 0;box-shadow:0 7px 14px rgba(0,0,0,.18)}
.me{margin-left:auto;background:linear-gradient(135deg,#ef5fa4,#7656ff);border-bottom-right-radius:5px}
.other{background:rgba(19,15,25,.72);border:1px solid rgba(255,255,255,.14);border-bottom-left-radius:5px}
.tris-board{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:rgba(111,68,37,.56);padding:12px;border-radius:22px;box-shadow:inset 0 2px 10px rgba(0,0,0,.25)}
.cell{aspect-ratio:1;border-radius:16px;border:1px solid rgba(255,255,255,.22);background:linear-gradient(135deg,#906038,#d29a61);color:#fff;font-size:42px;font-weight:900;text-shadow:0 2px 0 rgba(0,0,0,.35)}
.bottom-nav{position:fixed;left:0;right:0;bottom:0;max-width:520px;margin:auto;display:grid;grid-template-columns:repeat(6,1fr);background:rgba(30,24,41,.82);border-top:1px solid rgba(255,255,255,.18);padding:8px 6px calc(8px + env(safe-area-inset-bottom));backdrop-filter:blur(13px);box-shadow:0 -8px 24px rgba(0,0,0,.24)}
.nav-item{border:0;background:transparent;color:#ffe0b4;font-size:10px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:3px;text-shadow:0 2px 5px rgba(0,0,0,.5)}
.nav-img{width:35px;height:35px;border-radius:50%;object-fit:cover;box-shadow:0 6px 12px rgba(0,0,0,.28)}
.nav-item.active{transform:translateY(-3px);color:white}
.nav-item.active .nav-img{box-shadow:0 0 0 3px rgba(255,255,255,.58),0 7px 18px rgba(119,80,255,.42)}
#toast{position:fixed;bottom:96px;left:18px;right:18px;max-width:480px;margin:auto;display:none;z-index:99;padding:14px;text-align:center;font-weight:850;border-radius:18px;background:rgba(35,27,48,.95);border:1px solid rgba(255,255,255,.18)}
</style>
</head>
<body>
<div class="app">
<header class="topbar">
  <div>
    <h1>Meet & React</h1>
    <p class="subtitle">Persone vere entro 300 metri</p>
  </div>
  <button class="pill" id="authBtn">Login</button>
</header>

<main id="content"></main>

<nav class="bottom-nav">
  <button class="nav-item active" data-view="vicini"><img class="nav-img" src="assets/nav-vicini.jpg"><span>Vicini</span></button>
  <button class="nav-item" data-view="sticker"><img class="nav-img" src="assets/nav-sticker.jpg"><span>Sticker</span></button>
  <button class="nav-item" data-view="chat"><img class="nav-img" src="assets/nav-chat.jpg"><span>Chat</span></button>
  <button class="nav-item" data-view="profilo"><img class="nav-img" src="assets/nav-profilo.jpg"><span>Profilo</span></button>
  <button class="nav-item" data-view="tris"><img class="nav-img" src="assets/nav-tris.jpg"><span>Tris</span></button>
  <button class="nav-item" data-view="menu"><img class="nav-img" src="assets/nav-menu.jpg"><span>Menu</span></button>
</nav>
</div>

<div id="toast"></div>

<script>
const DEMO_EMAIL="demo@meetreact.local";
const DEMO_PASSWORD="Demo1234";

let user=null;
let profile=null;
let view="home";
let demo=false;
let nearby=[];
let selectedChat=null;
let chatMessages=[];
let board=Array(9).fill("");
let turn="X";
let gameOver=false;

const content=document.getElementById("content");
const authBtn=document.getElementById("authBtn");

const interests=["musica","montagna","caffè","aperitivo","sport","viaggi","cinema","natura","palestra","metal detecting"];

const stickers=[
  ["assets/sticker-caffe.jpg","Caffè insieme?"],
  ["assets/sticker-fuoco.jpg","Sei una bomba"],
  ["assets/sticker-banana.jpg","L’unico frutto dell’amor"],
  ["assets/sticker-pesca.jpg","Che chiappe"],
  ["assets/sticker-drink.jpg","Drink"],
  ["assets/sticker-limone.jpg","Bacio"],
  ["assets/sticker-scopa.jpg","Motel"],
  ["assets/sticker-pere.jpg","Che meloni"]
];

document.querySelectorAll(".nav-item").forEach(button=>{
  button.onclick=()=>show(button.dataset.view);
});

authBtn.onclick=()=>{
  if(user){
    demo=false;
    user=null;
    profile=null;
    nearby=[];
    authBtn.textContent="Login";
    show("home");
  }else{
    showLogin();
  }
};

function show(v){
  view=v;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
  const active=document.querySelector(`[data-view="${v}"]`);
  if(active)active.classList.add("active");
  render();
}

function render(){
  if(!user&&view!=="home"){
    showLogin();
    return;
  }
  if(view==="home")home();
  if(view==="vicini")vicini();
  if(view==="profilo")profilo();
  if(view==="chat")chat();
  if(view==="sticker")sticker();
  if(view==="tris")tris();
  if(view==="menu")menu();
}

function home(){
  content.innerHTML=`
    <section class="card">
      <h2 class="screen-title">Benvenuto</h2>
      <p>Accedi, registrati o usa la demo.</p>
      <button class="btn primary" onclick="showLogin()">Login / Registrati</button>
      <button class="btn green" onclick="demoAccess()">Entra in demo</button>
      <p class="small">Demo: ${DEMO_EMAIL} / ${DEMO_PASSWORD}</p>
    </section>
  `;
}

window.showLogin=()=>{
  content.innerHTML=`
    <section class="card">
      <h2 class="screen-title">Login</h2>
      <input class="input" id="email" placeholder="Email">
      <input class="input" id="password" placeholder="Password" type="password">
      <div class="grid2">
        <button class="btn primary" onclick="login()">Accedi</button>
        <button class="btn" onclick="register()">Registrati</button>
      </div>
      <button class="btn green" onclick="demoAccess()">Entra in demo</button>
      <p class="small">Versione pronta per GitHub Pages con icone e sticker definitivi.</p>
    </section>
  `;
};

window.login=()=>{
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  if(email===DEMO_EMAIL&&password===DEMO_PASSWORD){
    demoAccess();
    return;
  }
  toast("Per ora usa la demo");
};

window.register=()=>{
  demoAccess();
};

window.demoAccess=()=>{
  demo=true;
  user={uid:"demo",email:DEMO_EMAIL};
  profile={
    uid:"demo",
    name:"Demo",
    age:"30",
    bio:"Profilo demo senza registrazione",
    photo:"",
    interests:["musica","montagna","caffè"],
    profileComplete:true
  };
  nearby=[
    {
      uid:"demo2",
      name:"Profilo test",
      age:"29",
      distance:120,
      bio:"Utente dimostrativo entro 300 metri.",
      interests:["caffè","aperitivo","viaggi"]
    }
  ];
  selectedChat="demo2";
  chatMessages=[
    {from:"other",text:"Ciao, sono vicino a te."},
    {from:"me",text:"Messaggio demo."}
  ];
  authBtn.textContent="Esci";
  show("vicini");
  toast("Demo attiva");
};

function vicini(){
  content.innerHTML=`
    <h2 class="screen-title">Persone vicine</h2>
    <p class="subtitle">Qui vedi chi è entro 300 metri.</p>
    <button class="btn green" onclick="toast('Posizione GPS aggiornata')">Aggiorna posizione GPS</button>
    ${nearby.map(u=>`
      <section class="card user-card">
        <div class="avatar">🙂</div>
        <div>
          <h3 class="card-title">${esc(u.name)}, ${esc(u.age)}</h3>
          <span class="badge">● ${u.distance} m</span>
          <p class="bio">${esc(u.bio)}</p>
          <div class="chips">${u.interests.map(i=>`<span class="chip">${esc(i)}</span>`).join("")}</div>
          <button class="btn primary" onclick="openChat('${u.uid}')">Apri chat</button>
          <button class="btn wood" onclick="challenge('${u.uid}')">Sfida a tris</button>
        </div>
      </section>
    `).join("")}
  `;
}

window.openChat=(uid)=>{
  selectedChat=uid;
  show("chat");
};

function chat(){
  content.innerHTML=`
    <h2 class="screen-title">Chat</h2>
    <section class="card">
      <h3 class="card-title">Profilo test</h3>
      <div class="chatbox">
        ${chatMessages.map(m=>`<div class="bubble ${m.from==="me"?"me":"other"}">${esc(m.text)}</div>`).join("")}
      </div>
      <input class="input" id="message" placeholder="Scrivi un messaggio...">
      <button class="btn primary" onclick="sendMessage()">Invia</button>
    </section>
  `;
}

window.sendMessage=()=>{
  const input=document.getElementById("message");
  const text=input.value.trim();
  if(!text){
    toast("Scrivi un messaggio");
    return;
  }
  chatMessages.push({from:"me",text});
  chat();
};

function profilo(){
  content.innerHTML=`
    <h2 class="screen-title">Il tuo profilo</h2>
    <section class="card">
      <div class="avatar big" id="photoPreview">${profile?.photo?`<img src="${profile.photo}">`:"🙂"}</div>
      <label class="file-label">Carica foto
        <input type="file" accept="image/*" onchange="loadPhoto(event)">
      </label>
      <input class="input" id="pname" placeholder="Nome" value="${esc(profile?.name||"")}">
      <input class="input" id="page" placeholder="Età" value="${esc(profile?.age||"")}">
      <textarea id="pbio" placeholder="Breve bio">${esc(profile?.bio||"")}</textarea>
      <h3 class="card-title">Interessi</h3>
      <div class="interest-list">
        ${interests.map(i=>`
          <label class="interest-row">
            <span>${i}</span>
            <input type="checkbox" value="${i}" ${(profile?.interests||[]).includes(i)?"checked":""}>
          </label>
        `).join("")}
      </div>
      <button class="btn wood" onclick="saveProfile()">Salva profilo</button>
    </section>
  `;
}

window.loadPhoto=(event)=>{
  const file=event.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    profile.photo=e.target.result;
    document.getElementById("photoPreview").innerHTML=`<img src="${profile.photo}">`;
  };
  reader.readAsDataURL(file);
};

window.saveProfile=()=>{
  profile.name=document.getElementById("pname").value.trim();
  profile.age=document.getElementById("page").value.trim();
  profile.bio=document.getElementById("pbio").value.trim();
  profile.interests=Array.from(document.querySelectorAll(".interest-row input:checked")).map(i=>i.value);
  toast("Profilo salvato");
};

function sticker(){
  content.innerHTML=`
    <h2 class="screen-title">Sticker</h2>
    <div class="grid3">
      ${stickers.map(([img,label])=>`
        <button class="sticker" onclick="toast('Sticker inviato')">
          <img src="${img}">
          <span>${label}</span>
        </button>
      `).join("")}
    </div>
  `;
}

window.challenge=(uid)=>{
  selectedChat=uid;
  board=Array(9).fill("");
  turn="X";
  gameOver=false;
  show("tris");
};

function tris(){
  content.innerHTML=`
    <h2 class="screen-title">Sfida a tris</h2>
    <section class="card">
      <h3 class="card-title">Chat bonus</h3>
      <p>Se vinci, ottieni una chat bonus.</p>
      <div class="tris-board">
        ${board.map((cell,index)=>`<button class="cell" onclick="play(${index})">${cell}</button>`).join("")}
      </div>
      <button class="btn green" onclick="resetGame()">Nuova sfida</button>
      <button class="btn red" onclick="show('vicini')">Annulla</button>
    </section>
  `;
}

window.play=(index)=>{
  if(gameOver||board[index])return;
  board[index]=turn;
  if(winner(turn)){
    gameOver=true;
    toast(turn==="X"?"Hai vinto: chat bonus!":"Hai perso la sfida");
  }else if(board.every(Boolean)){
    gameOver=true;
    toast("Pareggio");
  }else{
    turn=turn==="X"?"O":"X";
  }
  tris();
};

window.resetGame=()=>{
  board=Array(9).fill("");
  turn="X";
  gameOver=false;
  tris();
};

function winner(mark){
  return [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ].some(combo=>combo.every(i=>board[i]===mark));
}

function menu(){
  content.innerHTML=`
    <h2 class="screen-title">Menu</h2>
    <section class="card">
      <button class="btn" onclick="show('profilo')">Profilo</button>
      <button class="btn" onclick="show('vicini')">Persone vicine</button>
      <button class="btn" onclick="show('sticker')">Sticker</button>
      <button class="btn" onclick="show('tris')">Sfida a tris</button>
      <button class="btn red" onclick="authBtn.click()">Esci</button>
    </section>
  `;
}

function toast(message){
  const t=document.getElementById("toast");
  t.textContent=message;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",3000);
}

function esc(value){
  return String(value||"").replace(/[&<>"']/g,char=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[char]));
}

home();
</script>
</body>
</html>
