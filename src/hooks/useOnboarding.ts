import { useState, useEffect, useCallback } from "react";

export interface FarmerProfile {
  location: string;
  crops: string[];
}

const STORAGE_KEY = "kisansathi_farmer_profile";

export function useOnboarding() {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const saveProfile = useCallback((data: FarmerProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProfile(data);
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  }, []);

  return { profile, isLoading, saveProfile, clearProfile, needsOnboarding: !isLoading && !profile };
}
