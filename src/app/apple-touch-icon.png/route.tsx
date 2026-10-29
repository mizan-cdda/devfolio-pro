import { ImageResponse } from 'next/og';
import { profile, site } from '@config';
import { initials } from '@/lib/format';
import { getTheme } from '@/lib/theme';

export const dynamic = 'force-static';

export function GET() {
  const { dark } = getTheme(site.theme.default).chrome;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark,
          color: '#ffffff',
          fontSize: 76,
          letterSpacing: -2,
        }}
      >
        {initials(profile.name)}
      </div>
    ),
    { width: 180, height: 180 },
  );
}
