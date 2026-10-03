"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ConsultationContextType {
  isOpen: boolean;
  openConsultation: (initialService?: string, welcome?: boolean) => void;
  closeConsultation: () => void;
  selectedService?: string;
  isWelcomeMode: boolean;
}

const ConsultationContext = createContext<ConsultationContextType>({
  isOpen: false,
  openConsultation: () => {},
  closeConsultation: () => {},
  isWelcomeMode: false,
});

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [isWelcomeMode, setIsWelcomeMode] = useState(false);

  const openConsultation = (service?: string, welcome: boolean = false) => {
    setSelectedService(service);
    setIsWelcomeMode(welcome);
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
    setSelectedService(undefined);
    setIsWelcomeMode(false);
  };

  // Auto-open Welcome Form when a visitor arrives on the site / profile
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceWelcome =
        urlParams.has("welcome") ||
        urlParams.has("profile") ||
        urlParams.has("ref") ||
        urlParams.has("contact");

      const alreadySeen = sessionStorage.getItem("astria_welcome_prompt_shown");

      if (!alreadySeen || forceWelcome) {
        const timer = setTimeout(() => {
          openConsultation(undefined, true);
          sessionStorage.setItem("astria_welcome_prompt_shown", "true");
        }, 1200);

        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback in case of storage restrictions
    }
  }, []);

  // Global listener for data-open-consultation elements
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-open-consultation]");
      if (target) {
        e.preventDefault();
        const service = target.getAttribute("data-service") || undefined;
        openConsultation(service, false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <ConsultationContext.Provider
      value={{ isOpen, openConsultation, closeConsultation, selectedService, isWelcomeMode }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
