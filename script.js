let view = "home";
const defaultProfile = {name:"",age:"",bio:"",photo:"",interests:[]};
const interestsList = ["musica","montagna","caffè","aperitivo","moda","sport","viaggi","cinema","arte","moto","palestra","cucina","natura","ballo","lettura","metal detecting"];
const stickers = [["☕","Caffè insieme?"],["🍹","Drink?"],["🔥","Sei tanta roba"],["👋","Sono qui vicino"],["💬","Parliamo due minuti?"],["🚶","Due passi?"]];
const demoUsers = [
{name:"Giulia",age:32,distance:120,bio:"Aperitivo, musica e ironia.",interests:["musica","aperitivo"],verified:true},
{name:"Marta",age:28,distance:80,bio:"Caffè, concerti e passeggiate.",interests:["caffè","musica"],verified:true},
{name:"Sara",age:35,distance:250,bio:"Natura, trekking e vino buono.",interests:["montagna","natura"],verified:false}
];
const content=document.getElementById("content");
document.getElementById("authBtn").onclick=()=>showView("profile");
window.showView=function(v){view=v;render();};
function getProfile(){return JSON.parse(localStorage.getItem("mr_profile")||JSON.stringify(defaultProfile));}
function setProfile(p){localStorage.setItem("mr_profile",JSON.stringify(p));}
function render(){
document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
const nav=document.getElementById("nav-"+view); if(nav) nav.classList.add("active");
if(view==="home")content.innerHTML=homeView();
if(view==="stickers")content.innerHTML=stickersView();
if(view==="chat")content.innerHTML=chatView();
if(view==="profile")content.innerHTML=profileView();
if(view==="menu")content.innerHTML=menuView();
}
function homeView(){const p=getProfile();return `<div class="notice">📍 Demo 300 metri attiva. Ora il profilo si apre e si può compilare.</div>${p.name?profileCard(p):`<div class="card"><h2>Completa il tuo profilo</h2><p class="bio">Inserisci nome, foto e interessi per iniziare.</p><button class="btn primary" onclick="showView('profile')">Vai al profilo</button></div>`}<h2 class="section-title">Persone vicine</h2>${demoUsers.map(userCard).join("")}`;}
function profileCard(p){return `<div class="card profile-preview"><div class="avatar">${p.photo?`<img src="${p.photo}">`:"🙂"}</div><div><h2 class="name">${esc(p.name)}${p.age?", "+esc(p.age):""}</h2><p class="bio">${esc(p.bio)||"Nessuna bio inserita."}</p><span class="badge">Profilo locale salvato</span><div class="chips">${(p.interests||[]).map(i=>`<span class="chip-check"><span>${i}</span></span>`).join("")}</div></div></div>`;}
function userCard(u){return `<div class="card profile-preview"><div class="avatar">🙂</div><div><h2 class="name">${u.name}, ${u.age}</h2><p class="meta">📍 ${u.distance} m • 🟢 Attiva ora</p><p class="bio">${u.bio}</p>${u.verified?`<span class="badge">✅ Verificata</span>`:""}<div class="chips">${u.interests.map(i=>`<span class="chip-check"><span>${i}</span></span>`).join("")}</div><div class="grid2"><button class="btn primary" onclick="toast('Sticker inviato a ${u.name}')">☕ Caffè</button><button class="btn" onclick="toast('Hai passato ${u.name}')">Passa</button></div></div></div>`;}
function profileView(){const p=getProfile();return `<h2 class="section-title">Il mio profilo</h2><div class="card"><div class="profile-head"><div class="avatar-large" id="photoPreview">${p.photo?`<img src="${p.photo}">`:"🙂"}</div><div><h2>Foto profilo</h2><p class="bio">Usa una foto reale del viso.</p><label class="file-label">📸 Carica foto<input type="file" accept="image/*" onchange="loadPhoto(event)"></label></div></div><input class="input" id="pname" placeholder="Nome" value="${esc(p.name)}"><input class="input" id="page" placeholder="Età" inputmode="numeric" value="${esc(p.age)}"><textarea id="pbio" placeholder="Bio breve">${esc(p.bio)}</textarea><h3>Interessi</h3><div class="chips">${interestsList.map(i=>`<label class="chip-check"><input type="checkbox" value="${i}" ${(p.interests||[]).includes(i)?"checked":""}><span>${i}</span></label>`).join("")}</div><button class="btn primary" onclick="saveProfile()">Salva profilo</button></div>`;}
window.loadPhoto=function(event){const file=event.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=function(e){const p=getProfile();p.photo=e.target.result;setProfile(p);document.getElementById("photoPreview").innerHTML=`<img src="${p.photo}">`;toast("Foto caricata");};reader.readAsDataURL(file);};
window.saveProfile=function(){const p=getProfile();p.name=document.getElementById("pname").value.trim();p.age=document.getElementById("page").value.trim();p.bio=document.getElementById("pbio").value.trim();p.interests=Array.from(document.querySelectorAll(".chip-check input:checked")).map(x=>x.value);setProfile(p);toast("Profilo salvato");showView("home");};
function stickersView(){return `<h2 class="section-title">Sticker</h2><div class="grid3">${stickers.map(s=>`<button class="sticker"><span class="emoji">${s[0]}</span>${s[1]}</button>`).join("")}</div>`;}
function chatView(){return `<h2 class="section-title">Chat</h2><div class="card"><p class="bio">La chat reale la collegheremo a Firebase nella fase successiva.</p></div>`;}
function menuView(){return `<h2 class="section-title">Menu</h2><div class="grid2"><button class="btn" onclick="showView('profile')">👤 Profilo</button><button class="btn" onclick="toast('Shop sticker demo')">🛒 Shop</button><button class="btn" onclick="toast('Modalità invisibile demo')">👻 Invisibile</button><button class="btn danger" onclick="localStorage.removeItem('mr_profile');toast('Profilo cancellato');showView('home')">Cancella profilo</button></div>`;}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2500);}
function esc(str){return String(str||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
render();