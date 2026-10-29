import { projects } from '@config';
import { renderOgImage } from '@/lib/og';
import { getProject } from '@/lib/projects';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: RouteContext<'/projects/[slug]/og.png'>) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response('Not found', { status: 404 });
  return renderOgImage({ eyebrow: 'Case study', title: project.title, description: project.summary });
}
