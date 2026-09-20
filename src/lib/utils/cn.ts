/** Klassennamen zusammenfügen, falsy-Werte fallen weg. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
