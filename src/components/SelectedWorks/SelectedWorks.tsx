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

      <div className="works__gallery">
        {content.works.projects.map((project, i) => (
          <article
            key={project.slug}
            className={`works__piece works__piece--${i === 0 ? 'featured' : 'standard'}`}
            data-reveal
          >
            <div className="works__piece-img-wrap">
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                className="works__piece-img"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="works__piece-caption">
              <h3 className="works__piece-title">{project.title}</h3>
              <span className="works__piece-meta">
                {t(project.category)}
                {project.client && <> &mdash; {project.client}</>}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
