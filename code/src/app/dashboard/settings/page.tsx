"use client";

import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/services/auth.service";
import { motion, AnimatePresence } from "motion/react";

type UserProfile = {
  id: string;
  display_name: string | null;
  email: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  avatar_url: string | null;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "socials">("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const userData = localStorage.getItem("cedar:auth-user");
      if (!userData) return;
      
      const { uid } = JSON.parse(userData);
      const { data, error } = await getUserProfile(uid);
      
      if (data) {
        setProfile(data);
        const [fName, ...lNames] = (data.display_name || "").split(" ");
        setFirstName(fName || "");
        setLastName(lNames.join(" ") || "");
        setBio(data.bio || "");
        setLocation(data.location || "");
        setWebsite(data.website || "");
        setLinkedin(data.linkedin || "");
        setGithub(data.github || "");
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setMessage(null);

    const displayName = `${firstName} ${lastName}`.trim();
    const updates = {
      display_name: displayName,
      bio,
      location,
      website,
      linkedin,
      github,
    };

    const { data, error } = await updateUserProfile(profile.id, updates);

    if (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setProfile(data);
      // Update local storage too
      const userData = localStorage.getItem("cedar:auth-user");
      if (userData) {
        const parsed = JSON.parse(userData);
        localStorage.setItem("cedar:auth-user", JSON.stringify({
          ...parsed,
          displayName,
        }));
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-cedar-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 py-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="font-headline text-4xl font-bold text-cedar-midnight mb-2">
          Settings
        </h2>
        <p className="text-cedar-slate text-lg font-medium">
          Personalize your professional sanctuary and manage your presence.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 p-1 bg-black/5 rounded-2xl md:bg-transparent md:p-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all ${
                activeTab === "profile"
                  ? "bg-white shadow-md text-cedar-forest md:bg-cedar-forest md:text-white md:shadow-lg md:-translate-y-0.5"
                  : "text-cedar-slate hover:bg-white/50 hover:text-cedar-midnight"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              Profile
            </button>
            <button
              onClick={() => setActiveTab("socials")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all ${
                activeTab === "socials"
                  ? "bg-white shadow-md text-cedar-forest md:bg-cedar-forest md:text-white md:shadow-lg md:-translate-y-0.5"
                  : "text-cedar-slate hover:bg-white/50 hover:text-cedar-midnight"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              Social Presence
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <form onSubmit={handleSave} className="space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm space-y-8"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-black/5">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-cedar-alabaster overflow-hidden border-2 border-black/5 shadow-inner">
                        <img
                          src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || "User"}&background=1B3022&color=fff`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white border border-black/5 shadow-md flex items-center justify-center text-cedar-forest hover:bg-cedar-forest hover:text-white transition-all">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cedar-midnight mb-1">Profile Picture</h3>
                      <p className="text-sm text-cedar-slate">Upload a professional headshot for your portfolio.</p>
                      <div className="flex gap-3 mt-4">
                        <button type="button" className="text-xs font-bold text-cedar-forest hover:underline">Change photo</button>
                        <button type="button" className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest px-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest px-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest px-1">Email Address</label>
                    <input
                      type="email"
                      value={profile?.email || ""}
                      readOnly
                      className="w-full p-4 rounded-2xl border border-black/10 bg-black/5 font-body text-base text-cedar-slate cursor-not-allowed outline-none"
                    />
                    <p className="text-[10px] text-cedar-slate px-1">Contact support to change your email address.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest px-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Nairobi, Kenya"
                      className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest px-1">Professional Bio</label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about your professional journey..."
                      className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "socials" && (
                <motion.div
                  key="socials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cedar-alabaster flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-cedar-forest">language</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest">Personal Website</label>
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cedar-alabaster flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#0077b5]">work</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cedar-alabaster flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#333]">code</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-cedar-midnight uppercase tracking-widest">GitHub Profile</label>
                        <input
                          type="url"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="https://github.com/username"
                          className="w-full p-4 rounded-2xl border border-black/10 bg-cedar-alabaster/30 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/5 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <div className="flex-1">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border ${
                      message.type === "success" 
                        ? "bg-green-50 border-green-200 text-green-700" 
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  className="flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold text-sm text-cedar-slate hover:bg-black/5 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-cedar-forest text-white font-bold text-sm shadow-lg shadow-cedar-forest/20 hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
