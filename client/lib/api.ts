const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token)
}

export function clearToken() {
  localStorage.removeItem('admin_token')
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => null)

  if (res.status === 401) {
    clearToken()
    if (
      typeof window !== 'undefined' &&
      !window.location.pathname.startsWith('/admin/login')
    ) {
      window.location.assign('/admin/login')
    }
    throw new Error('Session expired — please sign in again')
  }

  if (!res.ok) {
    const message =
      (data && (data.message as string)) || `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as T
}

// Uploads an image file to the backend (Supabase Storage) and returns its URL.
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData()
  form.append('image', file)

  const token = getToken()
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  })

  const data = await res.json().catch(() => null)

  if (res.status === 401) {
    clearToken()
    if (
      typeof window !== 'undefined' &&
      !window.location.pathname.startsWith('/admin/login')
    ) {
      window.location.assign('/admin/login')
    }
    throw new Error('Session expired — please sign in again')
  }

  if (!res.ok) {
    const message =
      (data && (data.message as string)) || `Upload failed (${res.status})`
    throw new Error(message)
  }

  return data.url as string
}
