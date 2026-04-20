import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thể lệ - SAA 2025',
  description: 'Thể lệ Sun* Annual Awards 2025',
};

export default function TheLePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-montserrat-alternates text-4xl font-bold text-[var(--color-text-gold)]">
        Thể lệ
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-primary)] opacity-60">
        Coming soon
      </p>
    </div>
  );
}
