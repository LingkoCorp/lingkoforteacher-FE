import Link from "next/link";

export default function Logo() {
  return (
    <a href="/" aria-label="Go to home" className="inline-block">
      <div className="text-left cursor-pointer">
        <h2 className="text-2xl font-bold text-primary">lingko</h2>
      </div>
    </a>
  );
}