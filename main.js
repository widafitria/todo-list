import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';


const firebaseConfig = {
  apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
  authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
  projectId: "insan-cemerlang-ee7af",
  storageBucket: "insan-cemerlang-ee7af.firebasestorage.app",
  messagingSenderId: "1047091827759",
  appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
  measurementId: "G-GL8J5GC8XB"
};
//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarTodo() {
  try {
    const refDokumen = collection(basisdata, "todo");
    const kueri = query(refDokumen, orderBy("teks")); // Mengurutkan berdasarkan teks
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));
  } catch (error) {
    console.error("Gagal mengambil data todo:", error);
    return [];
  }
}

export async function tambahTodoList(teks, status) {
  try {
    // Menyimpan data ke Firebase
    await addDoc(collection(basisdata, "todo"), {
      teks: teks,
      status: status //bisa "belum", "proses", atau "selesai"
    });

    console.log("Berhasil menyimpan data todo");
  } catch (error) {
    console.log("Gagal menyimpan data todo:", error.message);
  }
}
