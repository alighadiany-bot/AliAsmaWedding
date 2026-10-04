window.DB=(()=>{
const C=window.FB_CONFIG,adminEmail=window.ADMIN_EMAIL,demo=!C.apiKey;
const V = 'https://www.gstatic.com/firebasejs/10.12.2/';
let F, db, auth;
async function init() {
  if (F || demo) return;
  const [a, fs, au] = await Promise.all([import(V + 'firebase-app.js'), import(V + 'firebase-firestore.js'), import(V + 'firebase-auth.js')]);
  const app = a.initializeApp(C); db = fs.getFirestore(app); auth = au.getAuth(app); F = { fs, au };
}
const rd = c => JSON.parse(localStorage.getItem('d_' + c) || '[]');
const wr = (c, l) => { localStorage.setItem('d_' + c, JSON.stringify(l)); dispatchEvent(new Event('dchg')); };
async function add(col, data) {
  await init(); data.at = Date.now();
  if (demo) return wr(col, [...rd(col), { ...data, id: '' + data.at }]);
  await F.fs.addDoc(F.fs.collection(db, col), data);
}
async function watch(col, cb) {
  await init();
  if (demo) { const f = () => cb(rd(col).sort((a, b) => b.at - a.at)); f(); addEventListener('dchg', f); return; }
  const q = F.fs.query(F.fs.collection(db, col), F.fs.orderBy('at', 'desc'));
  F.fs.onSnapshot(q, s => cb(s.docs.map(d => ({ ...d.data(), id: d.id }))), e => cb(null, e));
}
async function del(col, id) {
  await init();
  if (demo) return wr(col, rd(col).filter(x => x.id !== id));
  await F.fs.deleteDoc(F.fs.doc(db, col, id));
}
async function login(pw) {
  await init();
  if (demo) { if (pw !== 'AliAsma') throw 0; sessionStorage.adm = 1; return; }
  await F.au.signInWithEmailAndPassword(auth, adminEmail, pw);
}
async function logout() { await init(); delete sessionStorage.adm; if (!demo) await F.au.signOut(auth); }
async function onUser(cb) { await init(); if (demo) return cb(sessionStorage.adm ? { demo: true } : null); F.au.onAuthStateChanged(auth, cb); }
return {add,watch,del,login,logout,onUser,demo};
})();
