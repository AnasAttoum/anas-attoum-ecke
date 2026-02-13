import { getTranslations } from "next-intl/server"

export default async function Footer() {

  const t = await getTranslations();

  return (
    <div className="flex justify-center items-center text-white bg-secondary dark:bg-primary h-20 shadow dark:shadow-black">
      {t("code-by")} &nbsp;
      <a
        href={process.env.NEXT_PUBLIC_ANAS_ATTOUM_PORTFOLIO}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold"
      >
        Anas Attoum
      </a>
    </div>
  )
}
