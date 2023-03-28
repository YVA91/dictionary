import './IrregularVerbs.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';
import IrrerularVerbs from '../../vendor/array/irregularVerbs'

function IrregularVerbs() {
  console.log(IrrerularVerbs)

  
  function handleSound() {
    const voices = window.speechSynthesis.getVoices();
    const lastVoice = voices[voices.length - 3];
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "en-US"
    utterance.voice = lastVoice;
    utterance.pitch = 0.8;  // пониже
    utterance.rate = 1.2;   // побыстрее
    utterance.volume = 1; // потише
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className="verbs">
      <h1 className="verbs__title">Неправильные глаголы</h1>
      <ul className="verbs__list">
        {IrrerularVerbs.map((item, index) => (
          <li key={index} className="#">
            <article className="verbs__list-item">
            <span >{ item.Infinitive }</span>
            </article>
            <article className="verbs__list-item">
            <span >{ item.PS }</span>
            </article>
            <article className="verbs__list-item">
            <span >{ item.PP }</span>
            </article>
            <article className="verbs__list-item verbs__list-item_translation">
            <span>{ item.translation }</span>
            </article>
          </li>
        ))}
      </ul>
      <Link to="/word" className="verbs__button_left">
        <img src={arrowLeft} className="verbs__arrow" />
      </Link>
      <Link to="/word" className="verbs__button_right">
        <img src={arrowRight} className="verbs__arrow" />
      </Link>





    </section>

  )
}
export default IrregularVerbs;