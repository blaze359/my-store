
import { getLocale } from "next-intl/server";

export default async function Search() {
  const locale = await getLocale();
  return (
    <form method="get" action={`/${locale}/search`}>
      <input
        type="text"
        name="q"
        placeholder="Search products..."
        className="border border-gray-300 rounded-md px-2 py-1 mr-2"
      />
      <button
        type="submit"
        className="bg-primary text-white rounded-md px-4 py-1"
      >
        Search
      </button>
    </form>
  );
}