const KEY = 'tf_wishlist'

export function getWishlist(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export function isInWishlist(id: string): boolean {
  return getWishlist().includes(id)
}

/** Toggle an item; returns true if it is now in the wishlist */
export function toggleWishlist(id: string): boolean {
  const list = getWishlist()
  const exists = list.includes(id)
  const next = exists ? list.filter((x) => x !== id) : [...list, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('wishlist-change'))
  return !exists
}

export const WISHLIST_EVENT = 'wishlist-change'
