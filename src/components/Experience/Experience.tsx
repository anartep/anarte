import { content } from '../../data/content';
import { SectionHeader } from '../shared/SectionHeader';
import './Experience.css';

export function Experience() {
  return (
    <section className="experience" id="experience">
      <SectionHeader title={content.experience.sectionTitle} />

      <div className="experience__grid">
        {content.experience.items.map((item) => (
          <div key={item.company} className="experience__card" data-reveal>
            <h3 className="experience__company">{item.company}</h3>
            <span className="experience__location">{item.location}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
