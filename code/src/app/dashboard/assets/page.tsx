"use client";

import React, { useState, useEffect } from "react";
import { getUserAssets, getPublicUrl } from "@/services/media.service";
import { motion } from "motion/react";

type MediaAsset = {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      const userData = localStorage.getItem("cedar:auth-user");
      if (!userData) return;

      const { uid } = JSON.parse(userData);
      const { data, error } = await getUserAssets(uid);

      if (data) {
        setAssets(data);
      }
      setLoading(false);
    };

    loadAssets();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "image";
    if (type.includes("pdf")) return "description";
    if (type.startsWith("video/")) return "movie";
    return "draft";
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 py-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="font-headline text-4xl font-bold text-cedar-midnight mb-2">
          Assets Library
        </h2>
        <p className="text-cedar-slate text-lg font-medium">
          Manage your portfolio media, documents, and professional assets.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-cedar-forest border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : assets.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-16 border border-black/5 shadow-sm text-center">
          <div className="w-20 h-20 bg-cedar-alabaster rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-cedar-slate text-4xl">folder_open</span>
          </div>
          <h3 className="text-xl font-bold text-cedar-midnight mb-2">No assets found</h3>
          <p className="text-cedar-slate max-w-md mx-auto">
            You haven't uploaded any files yet. Assets you upload while building your portfolio will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="aspect-video bg-cedar-alabaster relative overflow-hidden flex items-center justify-center">
                {asset.file_type.startsWith("image/") ? (
                  <img
                    src={getPublicUrl(asset.file_url)}
                    alt={asset.file_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="material-symbols-outlined text-cedar-slate text-5xl">
                    {getFileIcon(asset.file_type)}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a 
                    href={getPublicUrl(asset.file_url)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-cedar-forest shadow-lg hover:scale-110 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-cedar-midnight truncate mb-1" title={asset.file_name}>
                  {asset.file_name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cedar-slate uppercase tracking-wider">
                    {formatFileSize(asset.file_size)}
                  </span>
                  <span className="text-[10px] font-bold text-cedar-forest bg-cedar-forest/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {asset.file_type.split("/")[1]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
