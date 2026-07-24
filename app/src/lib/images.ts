// Cover-image resolution for a band.
//
// The assignment says "id 001 -> im001.png", but the real asset set is
// im001, im002, im003, im005, im008, im0010, im0012 — i.e. the filename is
// `im00` + the integer value of the id, NOT the zero-padded id string.
// So 010 -> im0010.png and 012 -> im0012.png (a naive `im${id}.png` breaks these).
// Anything without a matching file falls back to default.png (handled in the UI
// via the <img> onError, with this resolver choosing the intended path).

export const DEFAULT_COVER = '/sources/default.png'

/** Resolve the cover image URL for a band id (e.g. "010" -> "/sources/im0010.png"). */
export function coverImageUrl(id: string): string {
  const n = Number.parseInt(id, 10)
  if (Number.isNaN(n)) return DEFAULT_COVER
  return `/sources/im00${n}.png`
}
