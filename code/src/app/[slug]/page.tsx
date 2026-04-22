import { notFound } from "next/navigation";
import { getMediaAssets } from "@/services/media.service";
import {
  getPortfolioProjects,
  getPublicPortfolioBySlug,
} from "@/services/portfolio.service";
import { getSections } from "@/services/section.service";

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicPortfolioPage({ params }: PortfolioPageProps) {
  const { slug } = await params;

  const { data: portfolio, error: portfolioError } =
    await getPublicPortfolioBySlug(slug);

  if (portfolioError || !portfolio) {
    notFound();
  }

  if (!portfolio.is_published) {
    notFound();
  }

  const [sectionsResult, projectsResult, mediaResult] = await Promise.all([
    getSections(portfolio.id),
    getPortfolioProjects(portfolio.id),
    getMediaAssets(portfolio.id),
  ]);

  return (
    <main className="min-h-screen bg-cedar-alabaster px-4 py-12 sm:px-8 md:px-12">
      <section className="mx-auto max-w-5xl rounded-3xl border border-black/5 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cedar-bronze">
          Cedar Portfolio
        </p>
        <h1 className="mt-3 font-headline text-4xl font-bold text-cedar-midnight">
          {portfolio.title || "Untitled Portfolio"}
        </h1>
        <p className="mt-3 text-sm text-cedar-slate">
          Slug: {portfolio.slug}
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-xl font-bold text-cedar-midnight">Sections</h2>
          <p className="mt-2 text-sm text-cedar-slate">{sectionsResult.data.length} entries</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-xl font-bold text-cedar-midnight">Projects</h2>
          <p className="mt-2 text-sm text-cedar-slate">{projectsResult.data.length} entries</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-xl font-bold text-cedar-midnight">Media</h2>
          <p className="mt-2 text-sm text-cedar-slate">{mediaResult.data.length} assets</p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-5xl rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        <h2 className="font-headline text-2xl font-bold text-cedar-midnight">Sections</h2>
        <div className="mt-4 space-y-4">
          {sectionsResult.data.map((section: { id: string; type: string; content: unknown }) => (
            <article key={section.id} className="rounded-xl bg-cedar-alabaster p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cedar-bronze">
                {section.type}
              </p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-cedar-slate">
                {JSON.stringify(section.content, null, 2)}
              </pre>
            </article>
          ))}
          {sectionsResult.data.length === 0 && (
            <p className="text-sm text-cedar-slate">No sections have been added yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
