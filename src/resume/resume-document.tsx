import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { PortfolioContent } from '@/types/content';
import { formatRange, formatYearMonth } from '@/lib/format';

/**
 * One- to two-page resume generated from the same config as the website.
 * The layout is deliberately plain and single-column so applicant tracking systems can parse it:
 * real text (no images of text), standard section names and no tables.
 * Built-in PDF fonts (Helvetica) keep the file small and render the same everywhere.
 */

// Keep words whole. The default hyphenation splits technology names mid-word.
Font.registerHyphenationCallback((word) => [word]);

/** The built-in PDF fonts only cover Latin-1, so map the few common symbols outside it. */
const PDF_REPLACEMENTS: [RegExp, string][] = [
  [/\u2212/g, '-'], // minus sign
  [/\u2192/g, 'to'], // right arrow
  [/\u2190/g, 'from'],
  [/[\u2009\u202f]/g, ' '], // thin spaces
];

export function pdfSafe(text: string): string {
  return PDF_REPLACEMENTS.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

const ink = '#16140f';
const muted = '#5a554d';
const rule = '#d9d3c7';

const styles = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 48, paddingHorizontal: 50, fontFamily: 'Helvetica', fontSize: 9.5, color: ink, lineHeight: 1.45 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, letterSpacing: -0.3, lineHeight: 1.15 },
  role: { fontSize: 11.5, color: muted, marginTop: 4 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, color: muted, fontSize: 9 },
  contactItem: { marginRight: 12 },
  link: { color: ink, textDecoration: 'none' },
  section: { marginTop: 16 },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: muted,
    borderBottomWidth: 0.75,
    borderBottomColor: rule,
    paddingBottom: 3,
    marginBottom: 7,
  },
  entry: { marginBottom: 9 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10.5 },
  entryMeta: { color: muted, fontSize: 9 },
  bulletRow: { flexDirection: 'row', marginTop: 2 },
  bullet: { width: 10, color: muted },
  bulletText: { flex: 1 },
  skillsRow: { flexDirection: 'row', marginBottom: 3 },
  skillsLabel: { width: 110, fontFamily: 'Helvetica-Bold' },
  skillsList: { flex: 1 },
  footer: { position: 'absolute', bottom: 24, left: 50, right: 50, fontSize: 8, color: muted, textAlign: 'right' },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumeDocument({ content, siteUrl }: { content: PortfolioContent; siteUrl: string }) {
  const { profile, experience, projects, skills, credentials, site } = content;
  const links = profile.socials.filter((social) => social.href.startsWith('http'));
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <Document title={`${profile.name} · Resume`} author={profile.name} subject={profile.role} language={site.language}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          <View style={styles.contact}>
            <Text style={styles.contactItem}>{profile.location}</Text>
            <Link src={`mailto:${profile.email}`} style={[styles.contactItem, styles.link]}>
              {profile.email}
            </Link>
            <Link src={siteUrl} style={[styles.contactItem, styles.link]}>
              {siteUrl.replace(/^https?:\/\//, '')}
            </Link>
            {links.map((social) => (
              <Link key={social.href} src={social.href} style={[styles.contactItem, styles.link]}>
                {social.handle ?? social.href.replace(/^https?:\/\/(www\.)?/, '')}
              </Link>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text>{pdfSafe(profile.intro)}</Text>
        </View>

        {experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {experience.map((job) => (
              <View key={`${job.company}-${job.start}`} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {job.role}, {job.company}
                  </Text>
                  <Text style={styles.entryMeta}>{formatRange(job.start, job.end)}</Text>
                </View>
                <Text style={styles.entryMeta}>
                  {job.employment} · {job.location}
                </Text>
                {job.achievements.map((achievement) => (
                  <Bullet key={achievement}>{pdfSafe(achievement)}</Bullet>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {featured.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.heading}>Selected projects</Text>
            {featured.map((project) => (
              <View key={project.slug} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Link src={`${siteUrl}/projects/${project.slug}`} style={[styles.entryTitle, styles.link]}>
                    {project.title}
                  </Link>
                  <Text style={styles.entryMeta}>{project.period}</Text>
                </View>
                <Text>{pdfSafe(project.summary)}</Text>
                {project.caseStudy.outcomes.length > 0 ? (
                  <Text style={styles.entryMeta}>
                    {pdfSafe(project.caseStudy.outcomes.map((outcome) => `${outcome.value} ${outcome.label}`).join(' · '))}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Skills</Text>
            {skills.map((group) => (
              <View key={group.name} style={styles.skillsRow}>
                <Text style={styles.skillsLabel}>{group.name}</Text>
                <Text style={styles.skillsList}>{group.skills.map((skill) => skill.name).join(', ')}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {credentials.education.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Education</Text>
            {credentials.education.map((item) => (
              <View key={item.institution} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {item.qualification}, {item.institution}
                  </Text>
                  <Text style={styles.entryMeta}>{formatRange(item.start, item.end)}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {credentials.certifications.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Certifications</Text>
            {credentials.certifications.map((cert) => (
              <Text key={cert.name}>
                {cert.name}, {cert.issuer} ({formatYearMonth(cert.issued)})
              </Text>
            ))}
          </View>
        ) : null}

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${profile.name} · ${pageNumber} / ${totalPages}` : '')}
        />
      </Page>
    </Document>
  );
}
