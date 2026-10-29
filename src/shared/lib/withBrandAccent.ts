/** Turn legacy rose hex highlights into weight-only emphasis (same colour as the text); strip emoji for the pixel theme. */
export function withBrandAccent(html: string) {
  return html
    .replace(/text-\[#EF5A6F\]/gi, 'text-brand')
    .replace(/font-bold/g, 'font-medium')
    .replace(
      /class="font-medium text-brand"/g,
      'class="relative inline-block origin-bottom font-semibold will-change-transform" data-gsap-accent'
    )
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,
      ''
    )
    .replace(/\s{2,}/g, ' ')
    .trim()
}
