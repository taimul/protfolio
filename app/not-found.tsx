import type { Metadata } from "next";
import NotFoundScene from "@/components/NotFoundScene";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    >
      <NotFoundScene />
    </main>
  );
}
