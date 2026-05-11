<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<title>Meet & React</title>
<meta name="theme-color" content="#e8c89a">
<style>
*{box-sizing:border-box}
:root{--ink:#fffaf1;--muted:#f1d8b8;--card:rgba(22,17,28,.72);--line:rgba(255,255,255,.20);--pink:#ef5fa4;--violet:#7656ff;--green:#40734d}
body{margin:0;min-height:100vh;color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:radial-gradient(circle at 18% 14%,rgba(255,255,255,.55),transparent 22%),radial-gradient(circle at 84% 22%,rgba(255,228,182,.75),transparent 30%),linear-gradient(180deg,#f2dfc4 0%,#dcb688 52%,#b77c48 100%);background-attachment:fixed}
body:before{content:"";position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(96,55,25,.065) 0 2px,transparent 2px 14px),radial-gradient(circle at 50% 110%,rgba(83,41,20,.42),transparent 45%)}
.app{position:relative;max-width:520px;min-height:100vh;margin:auto;padding:calc(18px + env(safe-area-inset-top)) 18px calc(94px + env(safe-area-inset-bottom))}
.topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px}
h1{margin:0;font-size:34px;letter-spacing:.7px;color:#fff;text-shadow:0 3px 0 rgba(92,49,23,.62),0 7px 18px rgba(0,0,0,.45)}
.subtitle{margin:5px 0 0;color:#5f3c22;font-weight:800;text-shadow:0 1px 0 rgba(255,255,255,.45)}
.hero-img{width:92px;height:92px;border-radius:28px;object-fit:cover;box-shadow:0 12px 26px rgba(82,39,13,.38)}
.card{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:18px;margin-bottom:14px;backdrop-filter:blur(10px);box-shadow:0 14px 36px rgba(61,31,17,.32),inset 0 1px 0 rgba(255,255,255,.18)}
.screen-title{font-size:31px;margin:0 0 12px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.48)}
.card-title{font-size:25px;margin:0 0 8px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.48)}
p,.bio,.small{color:var(--muted);line-height:1.35;font-size:16px}.small{font-size:13px}
.btn,.pill{border:1px solid rgba(255,255,255,.22);border-radius:20px;color:white;font-weight:850;letter-spacing:.2px;background:rgba(48,38,62,.78);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 7px 16px rgba(0,0,0,.25)}
.pill{padding:12px 15px;white-space:nowrap}.btn{width:100%;padding:15px;margin:6px 0;font-size:17px;cursor:pointer}
.primary{background:linear-gradient(135deg,var(--pink),var(--violet));border:0}.green{background:linear-gradient(135deg,#3f7351,#88a865)}.wood{background:linear-gradient(135deg,#8c552c,#d19a62);text-shadow:0 2px 0 rgba(86,39,12,.55)}.red{background:linear-gradient(135deg,#703222,#b14a32)}
.input,textarea{width:100%;padding:14px;margin:7px 0;border-radius:17px;border:1px solid rgba(255,255,255,.22);background:rgba(12,10,18,.58);color:white;font-size:16px;outline:none}textarea{min-height:90px;resize:none}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.avatar{width:92px;height:92px;border-radius:50%;display:grid;place-items:center;overflow:hidden;background:linear-gradient(135deg,var(--pink),var(--violet));font-size:38px;border:3px solid rgba(255,240,220,.7);box-shadow:0 12px 25px rgba(0,0,0,.28)}
.avatar.big{width:148px;height:148px;margin:8px auto 12px;font-size:58px}.avatar img{width:100%;height:100%;object-fit:cover}
.user-card{display:grid;grid-template-columns:104px 1fr;gap:14px;align-items:center}
.badge{display:inline-flex;padding:6px 10px;border-radius:999px;background:rgba(83,140,82,.32);color:#d4ffbd;border:1px solid rgba(190,255,170,.25);font-weight:800}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:9px 0}.chip{display:inline-block;border-radius:999px;padding:8px 12px;background:rgba(255,238,204,.14);border:1px solid rgba(255,238,204,.22);color:#ffe7be;font-weight:750;font-size:13px}
.interest-list{display:flex;flex-direction:column;gap:8px;margin:11px 0}.interest-row{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:16px;background:rgba(12,10,18,.42);border:1px solid rgba(255,255,255,.15);color:#fff1d3;font-weight:750}
.file-label{display:block;width:max-content;margin:0 auto 12px;padding:10px 14px;border-radius:18px;background:linear-gradient(135deg,#8c552c,#d19a62);font-weight:850;box-shadow:0 8px 18px rgba(0,0,0,.24)}.file-label input{display:none}
.sticker{min-height:130px;border-radius:22px;border:1px solid rgba(255,255,255,.22);background:rgba(22,17,28,.67);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:white;font-weight:850;padding:10px}.sticker img{width:72px;height:72px;object-fit:cover;border-radius:18px;box-shadow:0 10px 18px rgba(0,0,0,.22)}
.chatbox{max-height:48vh;overflow:auto;padding:3px 0}.bubble{max-width:84%;padding:12px 14px;border-radius:18px;margin:8px 0;box-shadow:0 7px 14px rgba(0,0,0,.18)}.me{margin-left:auto;background:linear-gradient(135deg,var(--pink),var(--violet));border-bottom-right-radius:5px}.other{background:rgba(19,15,25,.72);border:1px solid rgba(255,255,255,.14);border-bottom-left-radius:5px}
.tris-board{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:rgba(111,68,37,.56);padding:12px;border-radius:22px;box-shadow:inset 0 2px 10px rgba(0,0,0,.25)}.cell{aspect-ratio:1;border-radius:16px;border:1px solid rgba(255,255,255,.22);background:linear-gradient(135deg,#906038,#d29a61);color:#fff;font-size:42px;font-weight:900;text-shadow:0 2px 0 rgba(0,0,0,.35)}
.bottom-nav{position:fixed;left:0;right:0;bottom:0;max-width:520px;margin:auto;display:grid;grid-template-columns:repeat(6,1fr);background:rgba(30,24,41,.82);border-top:1px solid rgba(255,255,255,.18);padding:8px 6px calc(8px + env(safe-area-inset-bottom));backdrop-filter:blur(13px);box-shadow:0 -8px 24px rgba(0,0,0,.24)}
.nav-item{border:0;background:transparent;color:#ffe0b4;font-size:10px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:3px;text-shadow:0 2px 5px rgba(0,0,0,.5)}
.nav-img{width:35px;height:35px;border-radius:50%;object-fit:cover;box-shadow:0 6px 12px rgba(0,0,0,.28)}.nav-item.active{transform:translateY(-3px);color:white}.nav-item.active .nav-img{box-shadow:0 0 0 3px rgba(255,255,255,.58),0 7px 18px rgba(119,80,255,.42)}
#toast{position:fixed;bottom:96px;left:18px;right:18px;max-width:480px;margin:auto;display:none;z-index:99;padding:14px;text-align:center;font-weight:850;border-radius:18px;background:rgba(35,27,48,.95);border:1px solid rgba(255,255,255,.18)}
</style>
</head>
<body>
<div class="app">
<header class="topbar"><div><h1>Meet & React</h1><p class="subtitle">Persone vere entro 300 metri</p></div><img class="hero-img" src="assets/drink.jpg" alt=""></header>
<button class="pill" id="authBtn">Login</button>
<main id="content"></main>
<nav class="bottom-nav">
<button class="nav-item active" data-view="vicini"><img class="nav-img" src="assets/limone.jpg"><span>Vicini</span></button>
<button class="nav-item" data-view="sticker"><img class="nav-img" src="assets/pesca.jpg"><span>Sticker</span></button>
<button class="nav-item" data-view="chat"><img class="nav-img" src="assets/caffe.jpg"><span>Chat</span></button>
<button class="nav-item" data-view="profilo"><img class="nav-img" src="assets/pere.jpg"><span>Profilo</span></button>
<button class="nav-item" data-view="tris"><img class="nav-img" src="assets/fuoco.jpg"><span>Tris</span></button>
<button class="nav-item" data-view="menu"><img class="nav-img" src="assets/scopa.jpg"><span>Menu</span></button>
</nav></div><div id="toast"></div>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, reload } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig={apiKey:"AIzaSyAIydfYnvkcKVai2m6Zl7LjnsXiQnT0PMk",authDomain:"meet-react-dd136.firebaseapp.com",projectId:"meet-react-dd136",storageBucket:"meet-react-dd136.firebasestorage.app",messagingSenderId:"902511777751",appId:"1:902511777751:web:514ffef33e30d704575d92"};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
const DEMO_EMAIL="demo@meetreact.local",DEMO_PASSWORD="Demo1234";
let user=null,profile=null,view="home",demo=false,nearby=[],gps=false,selectedChat=null,chatMessages=[],board=Array(9).fill(""),turn="X",gameOver=false;
const content=document.getElementById("content"),authBtn=document.getElementById("authBtn");
const interests=["musica","montagna","caffè","aperitivo","sport","viaggi","cinema","natura","palestra","metal detecting"];
const stickers=[["assets/caffe.jpg","Caffè insieme?"],["assets/drink.jpg","Drink?"],["assets/fuoco.jpg","Sei tanta roba"],["assets/banana.jpg","Sono qui vicino"],["assets/limone.jpg","Parliamo?"],["assets/pere.jpg","Due passi?"]];
document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>show(b.dataset.view));
authBtn.onclick=async()=>{if(user){if(demo){demo=false;user=null;profile=null;nearby=[];authBtn.textContent="Login";show("home");return}await signOut(auth)}else showLogin()};
onAuthStateChanged(auth,async u=>{if(demo)return;user=u;authBtn.textContent=u?"Esci":"Login";if(u){await reload(u);if(!u.emailVerified){verifyView();return}await loadProfile();await updateLocation(false);await loadNearby();view="vicini"}else{profile=null;nearby=[];gps=false;view="home"}render()});
function show(v){view=v;document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));let a=document.querySelector(`[data-view="${v}"]`);if(a)a.classList.add("active");render()}
function render(){if(!user&&view!=="home"){showLogin();return}if(view==="home")home();if(view==="vicini")vicini();if(view==="profilo")profilo();if(view==="chat")chat();if(view==="sticker")sticker();if(view==="tris")tris();if(view==="menu")menu()}
function home(){content.innerHTML=`<section class="card"><h2 class="screen-title">Benvenuto</h2><p>Accedi, registrati o usa la demo.</p><button class="btn primary" onclick="showLogin()">Login / Registrati</button><button class="btn green" onclick="demoAccess()">Entra in demo</button><p class="small">Demo: ${DEMO_EMAIL} / ${DEMO_PASSWORD}</p></section>`}
window.showLogin=()=>{content.innerHTML=`<section class="card"><h2 class="screen-title">Login</h2><input class="input" id="email" placeholder="Email"><input class="input" id="password" placeholder="Password" type="password"><div class="grid2"><button class="btn primary" onclick="login()">Accedi</button><button class="btn" onclick="register()">Registrati</button></div><button class="btn green" onclick="demoAccess()">Entra in demo</button><p class="small">La registrazione reale invia una mail di verifica.</p></section>`}
window.demoAccess=()=>{demo=true;user={uid:"demo",email:DEMO_EMAIL,emailVerified:true};profile={uid:"demo",name:"Demo",age:"30",bio:"Profilo demo senza registrazione",photo:"",interests:["musica","montagna","caffè"],profileComplete:true,lat:45.99,lng:9.03};nearby=[{uid:"demo2",name:"Profilo test",age:"29",distance:120,bio:"Utente dimostrativo entro 300 metri",interests:["caffè","aperitivo","viaggi"]}];gps=true;authBtn.textContent="Esci";selectedChat="demo2";chatMessages=[{from:"demo2",text:"Ciao, sono vicino a te."},{from:"demo",text:"Messaggio demo."}];show("vicini");toast("Demo attiva")}
window.login=async()=>{try{let e=val("email"),p=val("password");if(e===DEMO_EMAIL&&p===DEMO_PASSWORD){demoAccess();return}await signInWithEmailAndPassword(auth,e,p);await reload(auth.currentUser);if(!auth.currentUser.emailVerified){verifyView();toast("Verifica la mail");return}}catch(err){toast("Errore login: "+err.code)}}
window.register=async()=>{try{let c=await createUserWithEmailAndPassword(auth,val("email"),val("password"));await sendEmailVerification(c.user);verifyView();toast("Controlla la mail")}catch(err){toast("Errore registrazione: "+err.code)}}
function verifyView(){content.innerHTML=`<section class="card"><h2 class="screen-title">Verifica email</h2><p>Apri la mail Firebase e conferma il link.</p><button class="btn primary" onclick="checkEmail()">Ho verificato la mail</button><button class="btn" onclick="resendEmail()">Reinvia email</button><button class="btn red" onclick="authBtn.click()">Esci</button></section>`}
window.checkEmail=async()=>{await reload(auth.currentUser);if(auth.currentUser.emailVerified){await loadProfile();show("profilo")}else toast("Email non ancora verificata")}
window.resendEmail=async()=>{await sendEmailVerification(auth.currentUser);toast("Email reinviata")}
async function loadProfile(){const r=doc(db,"users",user.uid),s=await getDoc(r);profile=s.exists()?s.data():{uid:user.uid,email:user.email,name:"",age:"",bio:"",photo:"",interests:[],profileComplete:false,lat:null,lng:null};if(!s.exists())await setDoc(r,profile)}
async function saveProfileDB(){if(!demo&&user&&profile)await setDoc(doc(db,"users",user.uid),profile,{merge:true})}
async function updateLocation(msg=true){if(demo){gps=true;return}if(!navigator.geolocation){gps=false;toast("GPS non supportato");return}navigator.geolocation.getCurrentPosition(async p=>{gps=true;profile.lat=p.coords.latitude;profile.lng=p.coords.longitude;await saveProfileDB();await loadNearby();if(msg)toast("Posizione aggiornata");render()},()=>{gps=false;if(msg)toast("Permetti il GPS");render()},{enableHighAccuracy:true,timeout:10000})}
async function loadNearby(){nearby=[];if(demo)return;if(!profile?.lat||!profile?.lng)return;const qs=await getDocs(collection(db,"users"));qs.forEach(d=>{let u=d.data();if(!u.uid||u.uid===user.uid||!u.profileComplete||!u.lat||!u.lng)return;let dist=distance(profile.lat,profile.lng,u.lat,u.lng);if(dist<=300)nearby.push({...u,distance:Math.round(dist)})})}
function vicini(){let h=`<h2 class="screen-title">Persone vicine</h2><p class="subtitle">Qui vedi chi è entro 300 metri.</p><button class="btn green" onclick="refreshLocation()">Aggiorna posizione GPS</button>`;if(demo)h+=`<p class="subtitle">Modalità demo attiva.</p>`;if(!profile?.profileComplete)return content.innerHTML=h+`<section class="card"><h3 class="card-title">Profilo incompleto</h3><p>Completa foto, nome, bio e interessi.</p><button class="btn primary" onclick="show('profilo')">Completa profilo</button></section>`;if(!gps)return content.innerHTML=h+`<section class="card"><h3 class="card-title">GPS non attivo</h3><p>Permetti la posizione al browser.</p></section>`;if(!nearby.length)return content.innerHTML=h+`<section class="card"><h3 class="card-title">Nessun utente entro 300 m</h3></section>`;content.innerHTML=h+nearby.map(u=>`<section class="card user-card"><div class="avatar">${u.photo?`<img src="${u.photo}">`:"🙂"}</div><div><h3 class="card-title">${esc(u.name)}, ${esc(u.age||"")}</h3><span class="badge">● ${u.distance} m</span><p class="bio">${esc(u.bio||"")}</p><div class="chips">${(u.interests||[]).map(i=>`<span class="chip">${esc(i)}</span>`).join("")}</div><button class="btn primary" onclick="openChat('${u.uid}')">Apri chat</button><button class="btn wood" onclick="challenge('${u.uid}')">Sfida a tris</button></div></section>`).join("")}
window.openChat=async(uid)=>{selectedChat=uid;view="chat";await loadChat();show("chat")}
async function loadChat(){chatMessages=[];if(demo)return;if(!user)return;const qs=await getDocs(collection(db,"messages"));qs.forEach(d=>{let m=d.data();if(m.from===user.uid||m.to===user.uid)chatMessages.push(m)});chatMessages.sort((a,b)=>(a.createdAt?.seconds||0)-(b.createdAt?.seconds||0))}
function chat(){let other=nearby.find(u=>u.uid===selectedChat)||{name:"Profilo test",uid:"demo2"};let list=chatMessages.filter(m=>(m.from===user?.uid&&m.to===selectedChat)||(m.from===selectedChat&&m.to===user?.uid));if(demo)list=chatMessages;content.innerHTML=`<h2 class="screen-title">Chat</h2><section class="card"><h3 class="card-title">${esc(other.name||"Utente")}</h3><div class="chatbox">${list.length?list.map(m=>`<div class="bubble ${m.from===user.uid?'me':'other'}">${esc(m.text)}</div>`).join(""):`<p>Nessun messaggio.</p>`}</div><input class="input" id="msg" placeholder="Scrivi un messaggio..."><button class="btn primary" onclick="sendMsg()">Invia</button><button class="btn" onclick="loadChat().then(()=>chat())">Aggiorna chat</button></section>`}
window.sendMsg=async()=>{let text=val("msg");if(!text)return toast("Scrivi un messaggio");if(demo){chatMessages.push({from:"demo",text});chat();return}await addDoc(collection(db,"messages"),{from:user.uid,to:selectedChat,text,createdAt:serverTimestamp()});await loadChat();chat()}
function profilo(){content.innerHTML=`<h2 class="screen-title">Il tuo profilo</h2><section class="card"><div class="avatar big" id="photoPreview">${profile?.photo?`<img src="${profile.photo}">`:"🙂"}</div><label class="file-label">Carica foto<input type="file" accept="image/*" onchange="loadPhoto(event)"></label><input class="input" id="pname" placeholder="Nome" value="${esc(profile?.name||"")}"><input class="input" id="page" placeholder="Età" value="${esc(profile?.age||"")}"><textarea id="pbio" placeholder="Breve bio">${esc(profile?.bio||"")}</textarea><h3 class="card-title">Interessi</h3><div class="interest-list">${interests.map(i=>`<label class="interest-row"><span>${i}</span><input type="checkbox" value="${i}" ${(profile?.interests||[]).includes(i)?"checked":""}></label>`).join("")}</div><button class="btn wood" onclick="saveProfile()">Salva profilo</button></section>`}
window.loadPhoto=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=x=>{profile.photo=x.target.result;document.getElementById("photoPreview").innerHTML=`<img src="${profile.photo}">`};r.readAsDataURL(f)}
window.saveProfile=async()=>{profile.name=val("pname");profile.age=val("page");profile.bio=val("pbio");profile.interests=[...document.querySelectorAll(".interest-row input:checked")].map(x=>x.value);profile.profileComplete=!!(profile.name&&profile.photo&&profile.interests.length);await saveProfileDB();toast(profile.profileComplete?"Profilo salvato":"Aggiungi nome, foto e almeno un interesse")}
function sticker(){content.innerHTML=`<h2 class="screen-title">Sticker</h2><div class="grid3">${stickers.map(s=>`<button class="sticker" onclick="toast('Sticker inviato')"><img src="${s[0]}"><span>${s[1]}</span></button>`).join("")}</div>`}
window.challenge=uid=>{selectedChat=uid;board=Array(9).fill("");turn="X";gameOver=false;show("tris")}
function tris(){content.innerHTML=`<h2 class="screen-title">Sfida a tris</h2><section class="card"><h3 class="card-title">Chat bonus</h3><p>Se vinci, ottieni una chat bonus.</p><div class="tris-board">${board.map((c,i)=>`<button class="cell" onclick="play(${i})">${c}</button>`).join("")}</div><button class="btn green" onclick="resetGame()">Nuova sfida</button><button class="btn red" onclick="show('vicini')">Annulla</button></section>`}
window.play=i=>{if(gameOver||board[i])return;board[i]=turn;if(win(turn)){gameOver=true;toast(turn==="X"?"Hai vinto: chat bonus!":"Hai perso la sfida")}else if(board.every(Boolean)){gameOver=true;toast("Pareggio")}else turn=turn==="X"?"O":"X";tris()}
window.resetGame=()=>{board=Array(9).fill("");turn="X";gameOver=false;tris()}
function win(t){return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(a=>a.every(i=>board[i]===t))}
function menu(){content.innerHTML=`<h2 class="screen-title">Menu</h2><section class="card"><button class="btn" onclick="show('profilo')">Profilo</button><button class="btn" onclick="show('vicini')">Persone vicine</button><button class="btn" onclick="show('tris')">Sfida a tris</button><button class="btn red" onclick="authBtn.click()">Esci</button></section>`}
window.refreshLocation=()=>updateLocation(true);function val(id){return document.getElementById(id)?.value?.trim()||""}function distance(a,b,c,d){const R=6371000,rad=x=>x*Math.PI/180,dl=rad(c-a),dn=rad(d-b),x=Math.sin(dl/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dn/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}function toast(msg){let t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",3000)}home();
</script>
</body>
</html>
