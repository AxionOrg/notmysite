"use client";

import { useContext } from "react";
import { SupabaseContext } from "./provider";

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context.supabase;
};

export const useUser = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a SupabaseProvider");
  }
  return { user: context.user, loading: context.loading };
};
