"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged, User,
} from "firebase/auth";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PaintColorDoc {
  id: string;
  name: string;
  hex: string;
  family: string;
  finish?: string;
  active: boolean;
  createdAt?: Timestamp;
}

export interface EnquiryDoc {
  id: string;
  name: string;
  mobile: string;
  city: string;
  roomType?: string;
  colorInterest?: string;
  colorName?: string;
  colorHex?: string;
  finish?: string;
  message?: string;
  createdAt?: Timestamp;
}

interface AdminContextType {
  // Auth
  user: User | null;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // Colors
  colors: PaintColorDoc[];
  colorsLoading: boolean;
  fetchColors: () => Promise<void>;
  addColor: (color: Omit<PaintColorDoc, "id">) => Promise<void>;
  updateColor: (id: string, data: Partial<PaintColorDoc>) => Promise<void>;
  deleteColor: (id: string) => Promise<void>;
  toggleColorActive: (id: string, active: boolean) => Promise<void>;

  // Enquiries
  enquiries: EnquiryDoc[];
  enquiriesLoading: boolean;
  fetchEnquiries: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [colors, setColors] = useState<PaintColorDoc[]>([]);
  const [colorsLoading, setColorsLoading] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryDoc[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // ── Colors CRUD ───────────────────────────────────────────────────
  const fetchColors = useCallback(async () => {
    setColorsLoading(true);
    try {
      const q = query(collection(db, "colors"), orderBy("name"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PaintColorDoc));
      console.log("[AdminContext] Fetched colors:", data.length);
      setColors(data);
    } catch (err) {
      console.error("[AdminContext] fetchColors error:", err);
    } finally {
      setColorsLoading(false);
    }
  }, []);

  const addColor = async (color: Omit<PaintColorDoc, "id">) => {
    await addDoc(collection(db, "colors"), { ...color, createdAt: Timestamp.now() });
    await fetchColors();
  };

  const updateColor = async (id: string, data: Partial<PaintColorDoc>) => {
    await updateDoc(doc(db, "colors", id), data);
    await fetchColors();
  };

  const deleteColor = async (id: string) => {
    await deleteDoc(doc(db, "colors", id));
    await fetchColors();
  };

  const toggleColorActive = async (id: string, active: boolean) => {
    await updateDoc(doc(db, "colors", id), { active });
    await fetchColors();
  };

  // ── Enquiries ─────────────────────────────────────────────────────
  const fetchEnquiries = useCallback(async () => {
    setEnquiriesLoading(true);
    try {
      const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as EnquiryDoc));
      console.log("[AdminContext] Fetched enquiries:", data.length);
      setEnquiries(data);
    } catch (err) {
      console.error("[AdminContext] fetchEnquiries error:", err);
    } finally {
      setEnquiriesLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        user, authLoading, login, logout,
        colors, colorsLoading, fetchColors, addColor, updateColor, deleteColor, toggleColorActive,
        enquiries, enquiriesLoading, fetchEnquiries,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
