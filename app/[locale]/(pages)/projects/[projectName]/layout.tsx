import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/localization/routing';
import { setRequestLocale } from 'next-intl/server';
import prisma, { prismaConfig, prismaConfigFindProject } from '@/lib/prisma';
import { ProjectFindFirstArgs, ProjectFindManyArgs } from '@/app/generated/prisma/models';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; projectName: string }>;
};

export async function generateStaticParams() {
  const projects = await prisma.project.findMany(prismaConfig as ProjectFindManyArgs);

  return projects.map((project) => ({ projectName: project.name.toLowerCase().replaceAll(" ", "-") }));
}

export async function generateMetadata({ params }: { params: Props["params"] }) {
  const { projectName } = await params;
  const project = await prisma.project.findFirst(prismaConfigFindProject(projectName) as ProjectFindFirstArgs);

  return {
    title: project?.name,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return children;
}