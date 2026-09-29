import { Fragment, type CSSProperties } from "react";

/**
 * Splits a heading into words that rise into place one after another.
 * Plain text stays in the DOM, so screen readers read it normally.
 */
export default function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <span className="words" style={{ "--wd": `${delay}ms` } as CSSProperties}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="w">
            <span style={{ "--wi": index } as CSSProperties}>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
