import { renderToBuffer } from '@react-pdf/renderer';
import { content } from '@config';
import { ResumeDocument } from '@/resume/resume-document';
import { siteUrl } from '@/lib/site-url';

// Built once at build time and served as /resume.pdf, so it always matches config/.
export const dynamic = 'force-static';

export async function GET() {
  const pdf = await renderToBuffer(<ResumeDocument content={content} siteUrl={siteUrl} />);
  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${content.site.resume.fileName}"`,
    },
  });
}
