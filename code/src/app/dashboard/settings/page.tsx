"use client";

import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/services/auth.service";
import { uploadFile, getPublicUrl, saveMediaAsset } from "@/services/media.service";
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
  profile_picture_url: string | null;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "socials">("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Show an instant local preview before the upload finishes
    const objectUrl = URL.createObjectURL(file);
    setLocalAvatarUrl(objectUrl);
    setUploading(true);
    setMessage(null);

    try {
      const path = await uploadFile(file, profile.id);
      const publicUrl = getPublicUrl(path);

      const { data, error } = await updateUserProfile(profile.id, {
        profile_picture_url: path,
        avatar_url: publicUrl,
      });

      if (error) throw error;

      // Save to media_assets as well for history/dashboard
      await saveMediaAsset(profile.id, null, {
        path,
        type: file.type,
        name: file.name,
        size: file.size,
      });

      // Switch from local blob to the real remote URL (with cache-bust)
      const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;
      setLocalAvatarUrl(null);
      URL.revokeObjectURL(objectUrl);

      if (data) {
        setProfile({ ...data, avatar_url: cacheBustedUrl });
      } else {
        // Fallback: keep existing profile data but update avatar_url
        setProfile((prev) => prev ? { ...prev, avatar_url: cacheBustedUrl } : prev);
      }

      setMessage({ type: "success", text: "Profile picture updated!" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      console.error("Upload failed:", err);
      setLocalAvatarUrl(null);
      URL.revokeObjectURL(objectUrl);
      setMessage({ type: "error", text: msg });
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected after an error
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-cedar-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 py-6 md:py-10 max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-cedar-midnight mb-2">
          Settings
        </h2>
        <p className="text-cedar-slate text-base md:text-lg font-medium">
          Personalize your professional sanctuary and manage your presence.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 md:gap-2 p-1.5 bg-black/5 rounded-2xl md:bg-transparent md:p-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-all ${
                activeTab === "profile"
                  ? "bg-white shadow-md text-cedar-forest md:bg-cedar-forest md:text-white md:shadow-lg md:-translate-y-0.5"
                  : "text-cedar-slate hover:bg-white/50 hover:text-cedar-midnight"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">person</span>
              Profile
            </button>
            <button
              onClick={() => setActiveTab("socials")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-all ${
                activeTab === "socials"
                  ? "bg-white shadow-md text-cedar-forest md:bg-cedar-forest md:text-white md:shadow-lg md:-translate-y-0.5"
                  : "text-cedar-slate hover:bg-white/50 hover:text-cedar-midnight"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">share</span>
              Socials
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
                  className="bg-white rounded-3xl md:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-black/5 shadow-sm space-y-8"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 pb-8 border-b border-black/5 text-center md:text-left">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-cedar-alabaster overflow-hidden border-2 border-black/5 shadow-inner flex items-center justify-center">
                        {uploading ? (
                          <div className="w-8 h-8 border-3 border-cedar-forest border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <img
                            src={localAvatarUrl || profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.display_name || "User"}&background=1B3022&color=fff`}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white border border-black/5 shadow-md flex items-center justify-center text-cedar-forest hover:bg-cedar-forest hover:text-white transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleProfilePictureUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-cedar-midnight mb-1">Profile Picture</h3>
                      <p className="text-sm text-cedar-slate">Upload a professional headshot for your portfolio.</p>
                      <div className="flex justify-center md:justify-start gap-4 mt-4">
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="text-xs font-bold text-cedar-forest hover:underline disabled:opacity-50"
                        >
                          {uploading ? "Uploading..." : "Change photo"}
                        </button>
                        <button 
                          type="button" 
                          className="text-xs font-bold text-red-500 hover:underline"
                          onClick={async () => {
                            if (!profile) return;
                            if (confirm("Are you sure you want to remove your profile picture?")) {
                              const { data, error } = await updateUserProfile(profile.id, {
                                profile_picture_url: "",
                                avatar_url: ""
                              });
                              if (!error) setProfile(data);
                            }
                          }}
                        >
                          Remove
                        </button>
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
                  className="bg-white rounded-3xl md:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-black/5 shadow-sm space-y-8"
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

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-4">
              <div className="w-full md:flex-1">
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
              <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 w-full md:w-auto">
                <button
                  type="button"
                  className="w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-cedar-slate hover:bg-black/5 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-cedar-forest text-white font-bold text-sm shadow-lg shadow-cedar-forest/20 hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
