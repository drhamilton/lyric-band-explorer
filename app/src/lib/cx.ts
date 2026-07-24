// Tiny class-name joiner: keeps conditional Tailwind classes readable without
// pulling in a dependency. Falsy values (false, null, undefined, '') are dropped
// so `cx('base', active && 'is-active')` reads cleanly.
export type ClassValue = string | false | null | undefined

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
