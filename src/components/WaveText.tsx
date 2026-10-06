/**
 * Splits a title into letters for the hover "wave" + hand-drawn underline.
 * Use inside an element with the `wave-title` class (and an aria-label with the full text).
 */
export function WaveText({ text }: { text: string }) {
  let l = 0;
  const words = text.split(' ');
  return (
    <>
      <span className="wt" aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="wt-word">
              {Array.from(word).map((ch, ci) => (
                <span key={ci} className="wt-ch" style={{ ['--l' as string]: l++ }}>{ch}</span>
              ))}
            </span>
            {wi < words.length - 1 && (l++, ' ')}
          </span>
        ))}
      </span>
      <svg className="wt-scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 13 C 40 6, 80 16, 120 10 S 200 4, 240 11 S 285 15, 297 7" />
      </svg>
    </>
  );
}
