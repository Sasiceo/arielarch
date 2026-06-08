import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

/**
 * Shared section header: gold kicker + hairline, serif display title,
 * optional lead paragraph. Used by Portfolio, About and Contact so the
 * rhythm stays identical across the page.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = 'start',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${centered ? 'text-center' : 'text-start'} ${className}`}
    >
      <div className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}>
        {centered && <span className="hairline w-12" />}
        <span className="kicker">{label}</span>
        <span className="hairline w-12" />
      </div>

      <h2 className="mb-6">{title}</h2>

      {description && (
        <p className={`text-ink-soft ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`} style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
