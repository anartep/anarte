import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './SelectedWorks.css';

export function SelectedWorks() {
  const { t } = useLang();

  return (
    <section className="works" id="works">
      <SectionHeader
        title={content.works.sectionTitle}
        description={content.works.sectionDesc}
      />

      <div className="works__grid">
        {content.works.projects.map((project) => (
          <article key={project.slug} className="works__card" data-reveal>
            <div className="works__card-img-wrap">
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                className="works__card-img"
                loading="lazy"
                draggable={false}
              />
              <div className="works__card-overlay">
                <span className="works__card-view">{t({ pt: 'Ver projeto', en: 'View project' })}</span>
              </div>
            </div>
            <div className="works__card-info">
              <h3 className="works__card-title">{project.title}</h3>
              <span className="works__card-meta">
                {t(project.category)}
                {project.client && ` — ${project.client}`}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
