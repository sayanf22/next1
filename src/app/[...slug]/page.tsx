import Link from "next/link";
import { notFound } from "next/navigation";
import { navigationData, type NavItemData, type SubItem } from "@/data/navigationData";

type MenuDestination = {
  item: SubItem;
  audience: string;
  section: string;
};

function collectDestinations(): MenuDestination[] {
  const destinations: MenuDestination[] = [];
  const addItem = (item: SubItem, audience: string, section: string) => {
    destinations.push({ item, audience, section });
    item.children?.forEach((child) => destinations.push({ item: child, audience, section: item.title }));
  };

  navigationData.forEach((group: NavItemData) => {
    group.categories?.forEach((category) =>
      category.items.forEach((item) => addItem(item, group.label, category.categoryTitle)),
    );
    group.items?.forEach((item) => addItem(item, group.label, group.label));
  });

  return destinations;
}

const destinations = collectDestinations();

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map(({ item }) => ({
    slug: item.href.split("/").filter(Boolean),
  }));
}

export default async function MenuDestinationPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/${slug.join("/")}`;
  const destination = destinations.find(({ item }) => item.href === href);

  if (!destination) notFound();

  const { item, audience, section } = destination;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white px-5 py-10 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0056d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40">
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0056d2]">
            {audience} <span className="px-1 text-slate-300">/</span> {section}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{item.title}</h1>
          {item.categoryTag && <p className="mt-2 text-base font-medium text-slate-600">{item.categoryTag}</p>}
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{item.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/lets-talk?service=${encodeURIComponent(item.title)}`} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#0056d2] px-5 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40 focus-visible:ring-offset-2">
              Talk to an advisor
              <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40">
              Explore other options
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}