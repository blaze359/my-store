import { getTranslations } from "next-intl/server";
import { getCategories } from "../actions/api";

interface Category {
  _id: number;
  name: string;
  description: string;
  parentId?: number
}

export default async function HomePage() {
  const t = await getTranslations("Home");

  const cats: Category[] = await getCategories()

  return (
    <main>
      <h1>{t("title")}</h1>
      <ul>
        {cats.map((category: Category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </main>
  );
}
