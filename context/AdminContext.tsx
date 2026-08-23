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
  email?: string;
  mobile: string;
  city: string;
  coatingType?: string;
  companyName?: string;
  roomType?: string;
  colorInterest?: string;
  colorName?: string;
  colorHex?: string;
  finish?: string;
  message?: string;
  createdAt?: Timestamp;
}

export interface ProductDoc {
  id: string;
  name: string;
  substrate: "wood" | "metal" | "glass" | "dyestuff" | "auxiliaries" | "paint-removers";
  chemistry: string;
  description: string;
  fullDescription: string;
  features: string[];
  applications: string[];
  finishes: string[];
  icon: string;
  image: string;
  imageFront?: string;
  imageBack?: string;
  gallery?: { url: string; name: string }[];
  recommendedUse: string;
  applicationGuidelines: string;
  inCanProperties: { label: string; value: string }[];
  applicationProperties: { label: string; value: string }[];
  filmProperties: { label: string; value: string }[];
  delivery: { label: string; value: string }[];
  pdfUrl?: string;
  pdfName?: string;
  tdsUrl?: string;
  tdsName?: string;
  active: boolean;
  createdAt?: Timestamp;
}

export interface JobDoc {
  id: string;
  title: string;
  location: string;
  qualification: string;
  experience: string;
  industry: string;
  description: string;
  applyEmail: string;
  active: boolean;
  createdAt?: Timestamp;
}

export interface ApplicationDoc {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  qualification: string;
  expertise: string;
  resumeUrl: string;
  jobTitle?: string;
  createdAt?: Timestamp;
}

export interface EventDoc {
  id: string;
  title: string;
  location: string;
  eventDate: string;
  description: string;
  coverImage: string;
  gallery: { url: string; name: string }[];
  active: boolean;
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

  // Products
  products: ProductDoc[];
  productsLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<ProductDoc, "id">) => Promise<void>;
  updateProduct: (id: string, data: Partial<ProductDoc>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Jobs
  jobs: JobDoc[];
  jobsLoading: boolean;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<JobDoc, "id">) => Promise<void>;
  updateJob: (id: string, data: Partial<JobDoc>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;

  // Applications
  applications: ApplicationDoc[];
  applicationsLoading: boolean;
  fetchApplications: () => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;

  // Events
  events: EventDoc[];
  eventsLoading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<EventDoc, "id">) => Promise<void>;
  updateEvent: (id: string, data: Partial<EventDoc>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
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
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [jobs, setJobs] = useState<JobDoc[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationDoc[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

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

  // ── Products CRUD ─────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log("[AdminContext] Fetched products:", data.products?.length || 0);
      setProducts(data.products || []);
    } catch (err) {
      console.error("[AdminContext] fetchProducts error:", err);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const addProduct = async (product: Omit<ProductDoc, "id">) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create product");
    }
    await fetchProducts();
  };

  const updateProduct = async (id: string, data: Partial<ProductDoc>) => {
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update product");
    }
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete product");
    }
    await fetchProducts();
  };

  // ── Jobs CRUD ─────────────────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      console.log("[AdminContext] Fetched jobs:", data.jobs?.length || 0);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("[AdminContext] fetchJobs error:", err);
    } finally {
      setJobsLoading(false);
    }
  }, []);

  const addJob = async (job: Omit<JobDoc, "id">) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create job");
    }
    await fetchJobs();
  };

  const updateJob = async (id: string, data: Partial<JobDoc>) => {
    const res = await fetch("/api/jobs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update job");
    }
    await fetchJobs();
  };

  const deleteJob = async (id: string) => {
    const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete job");
    }
    await fetchJobs();
  };

  // ── Applications ──────────────────────────────────────────────────
  const fetchApplications = useCallback(async () => {
    setApplicationsLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      console.log("[AdminContext] Fetched applications:", data.applications?.length || 0);
      setApplications(data.applications || []);
    } catch (err) {
      console.error("[AdminContext] fetchApplications error:", err);
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  const deleteApplication = async (id: string) => {
    const res = await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete application");
    }
    await fetchApplications();
  };

  // ── Events CRUD ───────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setEventsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      console.log("[AdminContext] Fetched events:", data.events?.length || 0);
      setEvents(data.events || []);
    } catch (err) {
      console.error("[AdminContext] fetchEvents error:", err);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  const addEvent = async (event: Omit<EventDoc, "id">) => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create event");
    }
    await fetchEvents();
  };

  const updateEvent = async (id: string, data: Partial<EventDoc>) => {
    const res = await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update event");
    }
    await fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete event");
    }
    await fetchEvents();
  };

  return (
    <AdminContext.Provider
      value={{
        user, authLoading, login, logout,
        colors, colorsLoading, fetchColors, addColor, updateColor, deleteColor, toggleColorActive,
        enquiries, enquiriesLoading, fetchEnquiries,
        products, productsLoading, fetchProducts, addProduct, updateProduct, deleteProduct,
        jobs, jobsLoading, fetchJobs, addJob, updateJob, deleteJob,
        applications, applicationsLoading, fetchApplications, deleteApplication,
        events, eventsLoading, fetchEvents, addEvent, updateEvent, deleteEvent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
