import type { T } from '../../data/content';
import { useLang } from '../../context/LanguageContext';

interface Props {
  title: T;
  description?: T;
  className?: string;
}

export function SectionHeader({ title, description, className = '' }: Props) {
  const { t } = useLang();
  return (
    <header className={`section-header ${className}`}>
      <svg className="section-header__ornament" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12,0 L13.2,9.2 L24,12 L13.2,14.8 L12,24 L10.8,14.8 L0,12 L10.8,9.2 Z" />
      </svg>
      <h2 className="section-header__title">{t(title)}</h2>
      {description && (
        <p className="section-header__desc">{t(description)}</p>
      )}
      <hr className="section-header__line" />
    </header>
  );
}
