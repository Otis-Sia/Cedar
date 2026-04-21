function getCurrentUserUid() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem("cedar:auth-user");
  if (!rawUser) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawUser) as { uid?: unknown };
    return typeof parsed.uid === "string" && parsed.uid.trim() ? parsed.uid : null;
  } catch {
    return null;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers ?? {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const uid = getCurrentUserUid();
  if (uid) {
    headers.set("Authorization", `Bearer ${uid}`);
  }

  return fetch(`/api${path}`, {
    ...options,
    headers,
  });
}
