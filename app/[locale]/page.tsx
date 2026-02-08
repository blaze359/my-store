import AllProducts from "@/components/AllProducts";
import { getTranslations } from "next-intl/server";




export default async function HomePage() {
  const t = await getTranslations("Home");

  

  return (
    <main className="my-10">
      <h1 className="font-black text-4xl mb-4">{t("title")}</h1>
      <AllProducts />
    </main>
  );
}
