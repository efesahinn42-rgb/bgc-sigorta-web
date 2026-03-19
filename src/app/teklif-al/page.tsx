import { Suspense } from "react";
import TeklifAlPageClient from "@/app/teklif-al/TeklifAlPageClient";

function TeklifAlPageFallback() {
  return <div className="min-h-screen bg-slate-50" />;
}

export default function TeklifAlPage() {
  return (
    <Suspense fallback={<TeklifAlPageFallback />}>
      <TeklifAlPageClient />
    </Suspense>
  );
}
