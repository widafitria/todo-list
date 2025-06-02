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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// tambahkan fungsi untuk menampilkan daftar todo list
export async function ambilDaftarTodoList() {
  const refDokumen = collection(basisdata, "todoList");
  const kueri = query(refDokumen, orderBy("teks")); // urutkan berdasarkan teks, bisa disesuaikan

  try {
    const cuplikanKueri = await getDocs(kueri);
    const hasilKueri = cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));

    return hasilKueri;
  } catch (error) {
    console.error("Gagal mengambil daftar todo list:", error);
    return [];
  }
}