/*
Turns any text into a URL-friendly slug: lowercase letters, digits and single dashes.
"30 Min Meeting!"   -> "30-min-meeting"
"  Café  Chat  "    -> "cafe-chat"
"!!!"               -> ""   (nothing usable left; the caller picks a fallback)
*/
export function slugify(text: string): string {
    return text
        .normalize("NFKD")                // split accented letters: "é" -> "e" + accent mark
        .replace(/[̀-ͯ]/g, "")  // drop the accent marks
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")      // every run of other characters becomes one dash
        .replace(/^-+|-+$/g, "")          // no dash at the start or end
}

// The shape a valid slug must have. Used by the DTO to check slugs that clients send.
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
