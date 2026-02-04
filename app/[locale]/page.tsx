import { getTranslations } from "next-intl/server";
import toDoList from "@/data/to-do.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleSolid, faCircleHalfStroke, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";

function renderStatusIcon(status: string) {
  switch (status) {
    case "open":
      return (
        <FontAwesomeIcon
          icon={faCircleRegular}
          className="h-6 w-6 text-red-500"
        />
      );
    case "started":
      return (
        <FontAwesomeIcon
          icon={faCircleHalfStroke}
          className="h-6 w-6 text-yellow-500"
        />
      );
    case "done":
      return (
        <FontAwesomeIcon
          icon={faCircleSolid}
          className="h-6 w-6 text-green-500"
        />
      );
    default:
      return null;
  }
}

export default async function HomePage() {
  const t = await getTranslations("Home");

  

  return (
    <main className="my-10">
      <h1 className="font-black text-4xl mb-4">{t("title")}</h1>
      <p>{t("description")}</p>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faListCheck} className="w-10 h-10" />
          <p>{t("toDoList")}:</p>
        </div>
        {toDoList.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            {renderStatusIcon(item.status)}
            <p>{item.task}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
