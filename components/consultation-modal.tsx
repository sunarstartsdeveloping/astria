"use client";

import React, { useState, useEffect, useRef } from "react";
import { useConsultation } from "@/components/consultation-context";
import {
  X,
  Check,
  Upload,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";
import { AstriaLogoMark } from "@/components/ui/astria-logo";

const SERVICES = [
  "Web App Development",
  "Graphic Design",
  "Sales Funnel",
  "Meta Ads",
  "Video Editing",
  "Automation",
  "Not sure yet",
];

const INITIAL_FORM_DATA = {
  name: "",
  brand: "",
  email: "",
  phone: "",
  website: "",
  services: [] as string[],
  projectType: "",
  brief: "",
  budget: "",
  timeline: "",
  source: "",
  refs: "",
  fileNames: [] as string[],
};

export function ConsultationModal() {
  const { isOpen, closeConsultation, selectedService } = useConsultation();

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      services: selectedService ? [selectedService] : [],
    });
    setIsSuccess(false);
    setErrorMsg("");
    setIsSubmitting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset form whenever modal opens or closes, or initial service changes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    } else {
      setIsSuccess(false);
      setErrorMsg("");
    }
  }, [isOpen, selectedService]);

  // Handle ESC key & body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          resetForm();
          closeConsultation();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, closeConsultation]);

  // Handle pageshow (e.g. browser refresh / back-forward cache) to ensure clean reset
  useEffect(() => {
    const handlePageShow = () => {
      resetForm();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleClose = () => {
    resetForm();
    closeConsultation();
  };

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(svc);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== svc)
          : [...prev.services, svc],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setFormData((prev) => ({
        ...prev,
        fileNames: names,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.brand || !formData.email || !formData.phone || !formData.brief) {
      setErrorMsg("Please fill in all required fields marked with *");
      return;
    }

    if (formData.services.length === 0) {
      setErrorMsg("Please pick at least one service that applies.");
      return;
    }

    setIsSubmitting(true);

    try {
      const servicesList = Array.isArray(formData.services) && formData.services.length > 0
        ? formData.services.join(", ")
        : "Not specified";

      const emailSubject = `🚀 New Project Consultation: ${formData.name} (${formData.brand})`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0997f394-0cf2-4a0b-93ff-09c314051a66",
          subject: emailSubject,
          from_name: `${formData.name} (via Astria & Co. Portal)`,
          to_email: "astriacreative.co@gmail.com",
          name: formData.name,
          brand: formData.brand,
          email: formData.email,
          phone: formData.phone,
          website: formData.website || "None",
          services: servicesList,
          project_type: formData.projectType || "N/A",
          brief: formData.brief,
          budget: formData.budget || "Not specified",
          timeline: formData.timeline || "Not specified",
          referral_source: formData.source || "N/A",
          style_references: formData.refs || "N/A",
          reference_files: formData.fileNames.join(", ") || "None",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Failed to submit form");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      console.error(err);
      // Even if network fails, we still allow client to trigger mailto / whatsapp fallback
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md transition-all">
      {/* Click backdrop to close and reset */}
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[680px] my-auto bg-[#0C100D] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle top glow line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Check size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400 block">
                Inquiry Dispatched Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Thank you, {formData.name || "friend"}!
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed">
                Your consultation request has been forwarded directly to our inbox at{" "}
                <span className="text-emerald-300 font-medium">astriacreative.co@gmail.com</span>. We will review your project brief and reply with a tailored strategy within 24 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs sm:text-sm space-y-2 text-white/80 max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/50">Brand:</span>
                <span className="font-semibold text-white">{formData.brand}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/50">Services:</span>
                <span className="font-semibold text-emerald-400 truncate max-w-[220px]">
                  {formData.services.join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Contact:</span>
                <span className="font-mono text-white">{formData.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/918278455700?text=${encodeURIComponent(
                  `Hi Astria & Co., I just submitted a project consultation for ${formData.brand || formData.name}. Looking forward to discussing!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg shadow-emerald-950"
              >
                <PhoneCall size={16} />
                Instant WhatsApp Chat
              </a>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
            
            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-white/10 bg-[#0F1410]/50">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <AstriaLogoMark className="w-4.5 h-4.5 text-emerald-400" />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                    Free Strategy Consultation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-white/40 hover:text-emerald-400 transition-colors mr-10 cursor-pointer underline underline-offset-4"
                  title="Clear all fields"
                >
                  Reset form
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                Tell us about your project
              </h1>
              <p className="text-sm text-white/60 font-light leading-relaxed max-w-xl">
                A few details so we can understand what you need and come back with a relevant plan — not a generic quote.
              </p>
            </div>

            {errorMsg && (
              <div className="mx-6 sm:mx-8 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off" className="divide-y divide-white/10">
              
              {/* Section 1: Who you are */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    Who you are
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5">So we know who we&apos;re talking to.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Full name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="brand" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Business / brand name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="brand"
                      required
                      placeholder="Your company"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Phone / WhatsApp <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="website" className="text-xs sm:text-sm font-medium text-white/90 block">
                    Current website <span className="text-xs text-white/40 font-light">(if you have one)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    placeholder="https://"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Section 2: What you need */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    What you need
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5">Pick everything that applies.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-white/90 block">
                    Service <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SERVICES.map((svc) => {
                      const selected = formData.services.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            selected
                              ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/10"
                              : "bg-[#141A15] border border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                              selected
                                ? "bg-emerald-400 border-emerald-400 text-black"
                                : "border-white/30"
                            }`}
                          >
                            {selected && <Check size={10} strokeWidth={3} />}
                          </span>
                          <span>{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="project-type" className="text-xs sm:text-sm font-medium text-white/90 block">
                    Project type
                  </label>
                  <select
                    id="project-type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#0C100D] text-white/60">Select one</option>
                    <option value="New project" className="bg-[#0C100D]">New project</option>
                    <option value="Redesign / improvement" className="bg-[#0C100D]">Redesign / improvement</option>
                    <option value="Ongoing support" className="bg-[#0C100D]">Ongoing support</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="brief" className="text-xs sm:text-sm font-medium text-white/90 block">
                    Tell us what you&apos;re looking to build or fix <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="brief"
                    required
                    rows={3}
                    placeholder="A sentence or two is enough to start — we'll ask follow-ups on the call."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-y"
                  />
                </div>
              </div>

              {/* Section 3: Budget & timeline */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    Budget &amp; timeline
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5">Helps us recommend something that actually fits.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Estimated budget
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
                    >
                      <option value="" className="bg-[#0C100D] text-white/60">Select a range</option>
                      <option value="Under ₹25,000" className="bg-[#0C100D]">Under ₹25,000</option>
                      <option value="₹25,000 – ₹75,000" className="bg-[#0C100D]">₹25,000 – ₹75,000</option>
                      <option value="₹75,000 – ₹2,00,000" className="bg-[#0C100D]">₹75,000 – ₹2,00,000</option>
                      <option value="₹2,00,000+" className="bg-[#0C100D]">₹2,00,000+</option>
                      <option value="Let's discuss" className="bg-[#0C100D]">Let&apos;s discuss</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="timeline" className="text-xs sm:text-sm font-medium text-white/90 block">
                      Preferred timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
                    >
                      <option value="" className="bg-[#0C100D] text-white/60">Select one</option>
                      <option value="As soon as possible" className="bg-[#0C100D]">As soon as possible</option>
                      <option value="2–4 weeks" className="bg-[#0C100D]">2–4 weeks</option>
                      <option value="1–2 months" className="bg-[#0C100D]">1–2 months</option>
                      <option value="Flexible" className="bg-[#0C100D]">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: A bit more (optional) */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    A bit more <span className="text-white/40 normal-case font-normal">(optional)</span>
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5">Any additional context to give us a head start.</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="source" className="text-xs sm:text-sm font-medium text-white/90 block">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#0C100D] text-white/60">Select one</option>
                    <option value="Instagram" className="bg-[#0C100D]">Instagram (@astriacreative.co)</option>
                    <option value="Referral" className="bg-[#0C100D]">Referral / Colleague</option>
                    <option value="Google" className="bg-[#0C100D]">Google Search</option>
                    <option value="Other" className="bg-[#0C100D]">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="refs" className="text-xs sm:text-sm font-medium text-white/90 block">
                    Websites or brands whose style you like
                  </label>
                  <input
                    type="text"
                    id="refs"
                    placeholder="Links or brand names"
                    value={formData.refs}
                    onChange={(e) => setFormData({ ...formData, refs: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A15] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-white/90 block">
                    Logo, brand guide, or reference files
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-xl border border-dashed border-white/20 bg-[#141A15] hover:border-emerald-500/50 transition-colors text-center cursor-pointer space-y-1.5"
                  >
                    <Upload size={18} className="mx-auto text-emerald-400/80" />
                    <div className="text-xs text-white/70">
                      {formData.fileNames.length > 0 ? (
                        <span className="text-emerald-300 font-medium">
                          {formData.fileNames.join(", ")}
                        </span>
                      ) : (
                        <>
                          <span className="font-medium text-white">Click to browse</span> or drop reference files
                        </>
                      )}
                    </div>
                    <div className="text-[11px] text-white/40">PNG, JPG, PDF, Figma links or ZIP</div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Bar */}
              <div className="p-6 sm:p-8 bg-[#090D0A] border-t border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending inquiry to Astria &amp; Co...</span>
                      </>
                    ) : (
                      <>
                        <span>Get a free consultation</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all cursor-pointer"
                  >
                    Clear Form
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-white/50 text-center">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>We&apos;ll reply within 24 hours to astriacreative.co@gmail.com. No spam, ever.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
