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
      <h2 className="section-header__title">{t(title)}</h2>
      {description && (
        <p className="section-header__desc">{t(description)}</p>
      )}
      <hr className="section-header__line" />
    </header>
  );
}
