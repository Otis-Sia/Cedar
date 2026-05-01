import { supabase, supabaseConfigError } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export type UploadType = "avatar" | "cv" | "certificate" | "project_file" | "project_image";

interface FileValidationRule {
  allowedMimeTypes: string[];
  maxSizeMB: number;
}

const UPLOAD_RULES: Record<UploadType, FileValidationRule> = {
  avatar: { allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"], maxSizeMB: 5 },
  cv: { allowedMimeTypes: ["application/pdf"], maxSizeMB: 10 },
  certificate: { allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"], maxSizeMB: 10 },
  project_file: { allowedMimeTypes: ["application/pdf", "application/zip", "text/plain"], maxSizeMB: 50 },
  project_image: { allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"], maxSizeMB: 10 },
};

const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
};

const generateFilePath = (
  userId: string,
  type: UploadType,
  fileId: string,
  extension: string,
  projectId?: string
): string => {
  const safeExt = extension.replace(/[^a-zA-Z0-9]/g, "");
  switch (type) {
    case "avatar":
      return `${userId}/avatar.${safeExt}`;
    case "cv":
      return `${userId}/cv/cv.${safeExt}`;
    case "certificate":
      return `${userId}/certificates/cert_${fileId}.${safeExt}`;
    case "project_file":
      if (!projectId) throw new Error("projectId is required for project_file");
      return `${userId}/projects/${projectId}/file_${fileId}.${safeExt}`;
    case "project_image":
      if (!projectId) throw new Error("projectId is required for project_image");
      return `${userId}/projects/${projectId}/images/img_${fileId}.${safeExt}`;
    default:
      throw new Error(`Invalid upload type: ${type}`);
  }
};

export const validateFile = (file: File, type: UploadType) => {
  const rule = UPLOAD_RULES[type];
  if (!rule) {
    throw new Error(`No validation rules found for type ${type}`);
  }

  if (!rule.allowedMimeTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed: ${rule.allowedMimeTypes.join(", ")}`);
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > rule.maxSizeMB) {
    throw new Error(`File is too large. Max size: ${rule.maxSizeMB}MB`);
  }
};

export const uploadSecureFile = async (
  userId: string,
  type: UploadType,
  file: File,
  projectId?: string
) => {
  if (!supabase) throw new Error(supabaseConfigError);

  // 1. Validate File
  validateFile(file, type);

  // 2. Generate Path
  const fileId = uuidv4();
  const extension = getFileExtension(file.name);
  const path = generateFilePath(userId, type, fileId, extension, projectId);

  const isUpsert = type === "avatar" || type === "cv";
  const bucket = "User_Uploads";

  // 3. Upload File
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: isUpsert,
    });

  if (uploadError) {
    if (uploadError.message.includes("Duplicate")) {
      throw new Error("File already exists. Duplicate upload rejected.");
    }
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 4. Store Metadata in the Correct Database Table
  const isProjectAsset = type === "project_file" || type === "project_image";

  if (isProjectAsset) {
    if (!projectId) throw new Error("projectId is required for project assets");
    
    const { data: dbData, error: dbError } = await supabase
      .from("project_assets")
      .insert({
        project_id: projectId,
        type: type,
        bucket: bucket,
        path: uploadData.path,
        file_name: file.name,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) throw new Error(`Project asset metadata storage failed: ${dbError.message}`);
    return dbData;
  } else {
    // Store in user_files
    const { data: dbData, error: dbError } = await supabase
      .from("user_files")
      .insert({
        user_id: userId,
        type: type,
        bucket: bucket,
        path: uploadData.path,
        file_name: file.name,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) throw new Error(`User file metadata storage failed: ${dbError.message}`);
    return dbData;
  }
};

export const getSecureFileUrl = async (path: string, bucket = "User_Uploads", expiry = 60) => {
  if (!supabase) throw new Error(supabaseConfigError);

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiry);

  if (error) {
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }

  return data.signedUrl;
};

// ----------------------------------------------------
// THE CORRECT WAY ✅ : Query Database -> Generate URLs
// ----------------------------------------------------

export const getProjectAssets = async (projectId: string) => {
  if (!supabase) throw new Error(supabaseConfigError);

  // 1. Query Database
  const { data: assets, error } = await supabase
    .from("project_assets")
    .select("*")
    .eq("project_id", projectId);

  if (error) throw new Error(`Failed to fetch project assets: ${error.message}`);

  // 2. Generate Signed URLs for the UI
  const assetsWithUrls = await Promise.all(
    assets.map(async (asset) => {
      const signedUrl = await getSecureFileUrl(asset.path, asset.bucket, 3600); // 1 hour expiry
      return {
        ...asset,
        url: signedUrl,
      };
    })
  );

  return assetsWithUrls;
};

export const getUserFiles = async (userId: string) => {
  if (!supabase) throw new Error(supabaseConfigError);

  // 1. Query Database
  const { data: files, error } = await supabase
    .from("user_files")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(`Failed to fetch user files: ${error.message}`);

  // 2. Generate Signed URLs for the UI
  const filesWithUrls = await Promise.all(
    files.map(async (file) => {
      const signedUrl = await getSecureFileUrl(file.path, file.bucket, 3600); // 1 hour expiry
      return {
        ...file,
        url: signedUrl,
      };
    })
  );

  return filesWithUrls;
};

export const deleteSecureFile = async (path: string, dbId: string, isProjectAsset: boolean, bucket = "User_Uploads") => {
  if (!supabase) throw new Error(supabaseConfigError);

  // 1. Remove from DB
  const table = isProjectAsset ? "project_assets" : "user_files";
  const { error: dbError } = await supabase
    .from(table)
    .delete()
    .eq("id", dbId);

  if (dbError) {
    throw new Error(`Failed to delete metadata from ${table}: ${dbError.message}`);
  }

  // 2. Remove from Storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (storageError) {
    throw new Error(`Failed to delete file from storage: ${storageError.message}`);
  }

  return true;
};
