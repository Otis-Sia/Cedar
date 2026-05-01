import { apiFetch } from "@/lib/apiFetch";

interface CreateUploadInput {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

interface CreateUploadResponse {
  data: {
    /** Preferred local upload endpoint. */
    uploadUrl: string;
    /** @deprecated Will be removed in v2.0.0; use uploadUrl instead. */
    signedUploadUrl: string;
    upload: {
      id: string;
      status: string;
      storagePath: string;
    };
  };
}

interface UploadStatusResponse {
  upload: {
    id: string;
    status: string;
  };
}

export async function createCvUpload(input: CreateUploadInput) {
  const response = await apiFetch("/cv/upload", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to request signed upload URL.");
  }

  return (await response.json()) as CreateUploadResponse;
}

export async function uploadFileToSignedUrl(
  uploadUrl: string,
  file: File,
  mimeType: string
) {
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": mimeType },
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file to Storage.");
  }
}

export async function confirmCvUpload(uploadId: string) {
  const response = await apiFetch(`/cv/${uploadId}/confirm`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to confirm upload.");
  }
}



export async function getCvUploadStatus(uploadId: string) {
  const response = await apiFetch(`/cv/${uploadId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch upload status.");
  }

  return (await response.json()) as UploadStatusResponse;
}
