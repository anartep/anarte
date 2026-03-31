import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SocialLinks } from '../shared/SocialLinks';
import './Contact.css';

export function Contact() {
  const { t } = useLang();

  return (
    <section className="contact" id="contact">
      <div className="contact__inner" data-reveal>
        <h2 className="contact__headline">{t(content.contact.headline)}</h2>
        <hr className="contact__line" />

        <a
          href={content.social.whatsapp}
          className="contact__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(content.contact.cta)}
          <span className="contact__cta-arrow">→</span>
        </a>

        <SocialLinks className="contact__social" />
      </div>
    </section>
  );
}
