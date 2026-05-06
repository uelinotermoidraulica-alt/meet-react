import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIydfYnvkcKVai2m6Zl7LjnsXiQnT0PMk",
  authDomain: "meet-react-dd136.firebaseapp.com",
  projectId: "meet-react-dd136",
  storageBucket: "meet-react-dd136.firebasestorage.app",
  messagingSenderId: "902511777751",
  appId: "1:902511777751:web:514ffef33e30d704575d92",
  measurementId: "G-X3SEF0W2N5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let currentProfile = null;
let view = "home";
let nearby = [];
let messages = [];

const stickers = [
  ["☕","Caffè insieme?"],["🍹","Drink?"],["🔥","Sei tanta roba"],["👋","Sono qui vicino"],["💬","Parliamo due minuti?"],["🚶","Due passi?"]
];

const content = document.getElementById("content");
const authBtn = document.getElementById("authBtn");

window.showView = (v) => { view = v; render(); };

authBtn.onclick = async () => {
  if (currentUser) {
    await signOut(auth);
    toast("Logout effettuato");
  } else {
    showLogin();
  }
};

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  authBtn.textContent = user ? "Esci" : "Login";
  if (user) {
    await loadOrCreateProfile();
    await updateMyLocation();
    await loadNearbyUsers();
    await loadMessages();
  }
  render();
});

async function loadOrCreateProfile(){
  const ref = doc(db, "users", currentUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    currentProfile = snap.data();
  } else {
    currentProfile = {
      uid: currentUser.uid,
      name: currentUser.email.split("@")[0],
      age: 30,
      bio: "Profilo appena creato.",
      interests: ["caffè","musica","aperitivo"],
      verified: false,
      visible: true,
      lat: null,
      lng: null,
      updatedAt: Date.now()
    };
    await setDoc(ref, currentProfile);
  }
}

async function updateMyLocation(){
  if (!navigator.geolocation) {
    toast("GPS non supportato");
    return;
  }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    currentProfile.lat = pos.coords.latitude;
    currentProfile.lng = pos.coords.longitude;
    currentProfile.updatedAt = Date.now();
    await setDoc(doc(db, "users", currentUser.uid), currentProfile, {merge:true});
    await loadNearbyUsers();
    render();
  }, () => {
    toast("Permetti il GPS per vedere persone vicine");
  });
}

async function loadNearbyUsers(){
  nearby = [];
  const qs = await getDocs(collection(db, "users"));
  qs.forEach((d) => {
    const u = d.data();
    if (!currentProfile || u.uid === currentUser.uid || !u.lat || !u.lng || !currentProfile.lat || !currentProfile.lng) return;
    const distance = getDistanceMeters(currentProfile.lat, currentProfile.lng, u.lat, u.lng);
    if (distance <= 300) nearby.push({...u, distance: Math.round(distance)});
  });
}

async function loadMessages(){
  messages = [];
  const qs = await getDocs(query(collection(db, "messages"), orderBy("createdAt")));
  qs.forEach((d) => messages.push(d.data()));
}

function render(){
  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  const nav = document.getElementById("nav-" + view);
  if (nav) nav.classList.add("active");

  if (!currentUser) {
    content.innerHTML = welcomeView();
    return;
  }
  if (view === "home") content.innerHTML = homeView();
  if (view === "stickers") content.innerHTML = stickersView();
  if (view === "chat") content.innerHTML = chatView();
  if (view === "profile") content.innerHTML = profileView();
  if (view === "menu") content.innerHTML = menuView();
}

function welcomeView(){
  return `<div class="card">
    <h2>Benvenuto su Meet & React</h2>
    <p class="bio">Accedi o registrati per vedere persone vere entro 300 metri.</p>
    <button class="btn primary" onclick="showLogin()">Login / Registrati</button>
  </div>`;
}

window.showLogin = function(){
  content.innerHTML = `<div class="card">
    <h2>Login reale Firebase</h2>
    <input class="input" id="email" placeholder="Email" type="email">
    <input class="input" id="password" placeholder="Password" type="password">
    <div class="grid2">
      <button class="btn primary" onclick="login()">Accedi</button>
      <button class="btn" onclick="register()">Registrati</button>
    </div>
    <p class="small">Usa una email e una password di test.</p>
  </div>`;
};

window.login = async function(){
  try {
    await signInWithEmailAndPassword(auth, val("email"), val("password"));
    toast("Login riuscito");
  } catch(e) {
    toast("Errore login: " + e.message);
  }
};

window.register = async function(){
  try {
    await createUserWithEmailAndPassword(auth, val("email"), val("password"));
    toast("Registrazione riuscita");
  } catch(e) {
    toast("Errore registrazione: " + e.message);
  }
};

function homeView(){
  return `<div class="notice">📍 Mostra solo utenti reali entro 300 metri.</div>
  <button class="btn green" onclick="refreshLocation()">Aggiorna posizione GPS</button>
  <h2 class="section-title">Persone vicine</h2>
  ${nearby.length ? nearby.map(userCard).join("") : `<div class="card"><p>Nessun utente entro 300 m.</p><p class="bio">Per testare: apri l'app su un altro telefono vicino, registrati e autorizza il GPS.</p></div>`}`;
}

function userCard(u){
  const common = (u.interests || []).filter(i => (currentProfile.interests || []).includes(i));
  return `<div class="card profile-card">
    <div class="avatar">🙂</div>
    <div>
      <h2 class="name">${u.name || "Utente"}, ${u.age || ""}</h2>
      <p class="meta">📍 ${u.distance} m • 🟢 Attivo ora</p>
      <p class="bio">${u.bio || ""}</p>
      ${u.verified ? `<span class="badge">✅ Verificato</span>` : ""}
      <div class="interests">${(u.interests || []).map(i => `<span class="chip">${i}</span>`).join("")}</div>
      <p class="common">🔥 ${common.length} interessi in comune</p>
      <div class="grid2">
        <button class="btn primary" onclick="sendSticker('${u.uid}','☕ Caffè insieme?')">☕ Caffè</button>
        <button class="btn" onclick="sendSticker('${u.uid}','🔥 Sei tanta roba')">🔥 Sticker</button>
      </div>
    </div>
  </div>`;
}

function stickersView(){
  return `<h2 class="section-title">Sticker</h2><div class="grid3">
    ${stickers.map(s => `<button class="sticker"><span class="emoji">${s[0]}</span>${s[1]}</button>`).join("")}
  </div>`;
}

window.sendSticker = async function(toUid, text){
  await addDoc(collection(db, "messages"), {
    from: currentUser.uid,
    to: toUid,
    text: "Sticker: " + text,
    createdAt: serverTimestamp()
  });
  toast("Sticker inviato");
  await loadMessages();
};

function chatView(){
  const myMsgs = messages.filter(m => m.from === currentUser.uid || m.to === currentUser.uid || m.to === "global");
  return `<h2 class="section-title">Chat reale base</h2>
    <div class="card">
      ${myMsgs.length ? myMsgs.map(m => `<div class="msg ${m.from === currentUser.uid ? 'me' : ''}">${m.text}</div>`).join("") : "<p>Nessun messaggio.</p>"}
      <input class="input" id="chatText" placeholder="Messaggio demo globale">
      <button class="btn primary" onclick="sendGlobalMsg()">Invia demo</button>
    </div>`;
}

window.sendGlobalMsg = async function(){
  const text = val("chatText");
  if (!text) return;
  await addDoc(collection(db, "messages"), {
    from: currentUser.uid,
    to: "global",
    text,
    createdAt: serverTimestamp()
  });
  await loadMessages();
  render();
};

function profileView(){
  const interests = (currentProfile.interests || []).join(", ");
  return `<h2 class="section-title">Profilo reale</h2><div class="card">
    <input class="input" id="pname" placeholder="Nome" value="${currentProfile.name || ""}">
    <input class="input" id="page" placeholder="Età" value="${currentProfile.age || ""}">
    <input class="input" id="pbio" placeholder="Bio" value="${currentProfile.bio || ""}">
    <input class="input" id="pinterests" placeholder="Interessi separati da virgola" value="${interests}">
    <p class="small">${currentProfile.verified ? "✅ Profilo verificato" : "⚠️ Foto non verificata"}</p>
    <button class="btn primary" onclick="saveProfile()">Salva profilo</button>
    <button class="btn green" onclick="verifyPhoto()">Simula verifica foto</button>
  </div>`;
}

window.saveProfile = async function(){
  currentProfile.name = val("pname");
  currentProfile.age = Number(val("page")) || "";
  currentProfile.bio = val("pbio");
  currentProfile.interests = val("pinterests").split(",").map(x => x.trim()).filter(Boolean);
  await setDoc(doc(db, "users", currentUser.uid), currentProfile, {merge:true});
  toast("Profilo salvato");
  render();
};

window.verifyPhoto = async function(){
  currentProfile.verified = true;
  await setDoc(doc(db, "users", currentUser.uid), {verified:true}, {merge:true});
  toast("Verifica foto simulata");
  render();
};

function menuView(){
  return `<h2 class="section-title">Menu</h2><div class="grid2">
    <button class="btn" onclick="refreshLocation()">📍 Aggiorna GPS</button>
    <button class="btn" onclick="showView('profile')">👤 Profilo</button>
    <button class="btn" onclick="toast('Modalità invisibile demo')">👻 Invisibile</button>
    <button class="btn danger" onclick="authBtn.click()">🚪 Esci</button>
  </div><p class="notice">Gli sticker sono inviti simbolici. Nessuno è obbligato a rispondere.</p>`;
}

window.refreshLocation = async function(){
  await updateMyLocation();
  toast("Posizione aggiornata");
};

function val(id){
  return document.getElementById(id)?.value?.trim() || "";
}

function getDistanceMeters(lat1, lon1, lat2, lon2){
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 3000);
}

render();
