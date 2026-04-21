import { randomUUID } from "node:crypto";

type ProjectStatus = "draft" | "published";

type UploadStatus =
  | "pending_upload"
  | "uploaded_file_received"
  | "uploaded"
  | "processing"
  | "complete";

export interface ProjectRecord {
  id: string;
  title: string;
  templateId: string;
  userId: string;
  status: ProjectStatus;
  settings: {
    isPublic: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UploadRecord {
  id: string;
  userId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  status: UploadStatus;
  uploadedBytes: number;
  parsedData: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

interface DataStoreState {
  projects: Map<string, ProjectRecord>;
  uploads: Map<string, UploadRecord>;
  sessions: Map<string, SessionUser>;
}

interface SessionUser {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}

declare global {
  var __cedarDataStore: DataStoreState | undefined;
}

function getState(): DataStoreState {
  // Temporary local store used after Firebase removal; data resets on server restart.
  // TODO(v2.0.0): Replace with a persistent database (for example PostgreSQL) and schema migrations for production usage.
  if (!globalThis.__cedarDataStore) {
    globalThis.__cedarDataStore = {
      projects: new Map<string, ProjectRecord>(),
      uploads: new Map<string, UploadRecord>(),
      sessions: new Map<string, SessionUser>(),
    };
  }

  return globalThis.__cedarDataStore;
}

function now() {
  return new Date().toISOString();
}

export function createProject(input: {
  title: string;
  templateId: string;
  userId: string;
}) {
  const id = randomUUID();
  const timestamp = now();

  const project: ProjectRecord = {
    id,
    title: input.title,
    templateId: input.templateId,
    userId: input.userId,
    status: "draft",
    settings: {
      isPublic: false,
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  getState().projects.set(id, project);
  return project;
}

export function getProject(id: string) {
  return getState().projects.get(id) ?? null;
}

export function updateProjectStatus(id: string, status: ProjectStatus) {
  const project = getState().projects.get(id);
  if (!project) {
    return null;
  }

  const updatedProject: ProjectRecord = {
    ...project,
    status,
    settings: {
      ...project.settings,
      isPublic: status === "published",
    },
    updatedAt: now(),
  };

  getState().projects.set(id, updatedProject);
  return updatedProject;
}

export function createUpload(input: {
  userId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
}) {
  const id = randomUUID();
  const timestamp = now();

  const upload: UploadRecord = {
    id,
    userId: input.userId,
    fileName: input.fileName,
    mimeType: input.mimeType,
    sizeBytes: input.sizeBytes,
    storagePath: input.storagePath,
    status: "pending_upload",
    uploadedBytes: 0,
    parsedData: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  getState().uploads.set(id, upload);
  return upload;
}

export function getUpload(id: string) {
  return getState().uploads.get(id) ?? null;
}

export function updateUpload(id: string, updates: Partial<UploadRecord>) {
  const upload = getState().uploads.get(id);
  if (!upload) {
    return null;
  }

  const updatedUpload: UploadRecord = {
    ...upload,
    ...updates,
    updatedAt: now(),
  };

  getState().uploads.set(id, updatedUpload);
  return updatedUpload;
}

export function createSession(user: SessionUser) {
  const token = randomUUID();
  getState().sessions.set(token, user);
  return token;
}

export function getSessionUser(token: string) {
  return getState().sessions.get(token) ?? null;
}

export function deleteSession(token: string) {
  getState().sessions.delete(token);
}
