import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

// Auth Service
export const firebaseAuthService = {
  // Sign up with email and password
  signUp: async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Sign in with Google
  signInWithGoogle: async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  // Sign out
  signOut: async (): Promise<void> => {
    return await signOut(auth);
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};

// Firestore Service
export const firestoreService = {
  // Get a single document
  getDocument: async <T = DocumentData>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  },

  // Get all documents from a collection
  getDocuments: async <T = DocumentData>(
    collectionName: string,
    ...constraints: QueryConstraint[]
  ): Promise<T[]> => {
    const collectionRef = collection(db, collectionName);
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  },

  // Add a new document
  addDocument: async <T extends DocumentData = DocumentData>(
    collectionName: string,
    data: T
  ): Promise<string> => {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data as DocumentData);
    return docRef.id;
  },

  // Update a document
  updateDocument: async <T extends Partial<DocumentData> = Partial<DocumentData>>(
    collectionName: string,
    documentId: string,
    data: T
  ): Promise<void> => {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data as Partial<DocumentData>);
  },

  // Delete a document
  deleteDocument: async (collectionName: string, documentId: string): Promise<void> => {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  },
};

// Export query helpers for easy use
export { where, orderBy } from 'firebase/firestore';
