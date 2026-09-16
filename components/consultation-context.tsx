"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ConsultationContextType {
  isOpen: boolean;
  openConsultation: (initialService?: string) => void;
  closeConsultation: () => void;
  selectedService?: string;
}

const ConsultationContext = createContext<ConsultationContextType>({
  isOpen: false,
  openConsultation: () => {},
  closeConsultation: () => {},
});

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const openConsultation = (service?: string) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
    setSelectedService(undefined);
  };

  // Global listener for data-open-consultation elements
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-open-consultation]");
      if (target) {
        e.preventDefault();
        const service = target.getAttribute("data-service") || undefined;
        openConsultation(service);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <ConsultationContext.Provider
      value={{ isOpen, openConsultation, closeConsultation, selectedService }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
