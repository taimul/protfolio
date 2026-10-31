/** Renders text where **double asterisks** mark bold. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))}
    </>
  );
}
