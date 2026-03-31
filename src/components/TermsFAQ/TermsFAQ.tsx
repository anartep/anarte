import { useState, useCallback } from 'react';
import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './TermsFAQ.css';

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
      <button className="faq__question" type="button" onClick={onToggle}>
        <span>{question}</span>
        <svg className="faq__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="faq__answer-wrap">
        <p className="faq__answer">{answer}</p>
      </div>
    </div>
  );
}

export function TermsFAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="faq" id="faq">
      <SectionHeader title={content.faq.sectionTitle} />

      <p className="faq__intro">{t(content.faq.termsIntro)}</p>

      <div className="faq__list" data-reveal>
        {content.faq.items.map((item, i) => (
          <AccordionItem
            key={i}
            question={t(item.question)}
            answer={t(item.answer)}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
