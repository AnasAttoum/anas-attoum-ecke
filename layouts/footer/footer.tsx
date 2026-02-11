import { Link } from "@/lib/localization/navigation";
import { getTranslations } from "next-intl/server"

export default async function Footer() {

  const t = await getTranslations();

  return (
    <div className="flex justify-center items-center text-white bg-secondary dark:bg-primary h-20 shadow dark:shadow-black">
      {t("code-by")} &nbsp; <Link href="/" className="font-bold">Anas Attoum</Link>
    </div>
  )
}
