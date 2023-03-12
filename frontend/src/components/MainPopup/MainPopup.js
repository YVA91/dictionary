import './MainPopup.css';
import buttonOk from '../../images/mainOk.svg';
import buttonNo from '../../images/mainNo.svg';
import buttonClose from '../../images/close.svg';
import buttonSound from '../../images/buttonSound.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterWord } from '../../store/mainPopupDictionary'
import { replayFilterWord } from '../../store/mainPopupDictionary'
import { closeMainPopup } from '../../store/mainPopupDictionary'

function MainPopup() {
  const [wordRuVisibility, setWordRuVisibility] = useState(false);
  const [wordEnVisibility, setWordEnVisibility] = useState(true);

  const dispatch = useDispatch();

  const isMainPopup = useSelector(state => state.WordReducer.isMainPopup);
  const isCollection = useSelector(state => state.WordReducer.isCollection);
  const isWord = useSelector(state => state.WordReducer.isWord);
  const isFilter = useSelector(state => state.WordReducer.isFilter);

  function handleKnowOk() {
    let booleanValue = Math.random() >= 0.5;
    setWordRuVisibility(booleanValue)
    setWordEnVisibility(!booleanValue)
    if ((isFilter.length) !== 0) {
      dispatch(filterWord())
    } else {
      dispatch(replayFilterWord())
      dispatch(filterWord())
    }
  }

  function handleKnowNo() {
    setWordRuVisibility(true)
    setWordEnVisibility(true)
  }

  function closePopup() {
    dispatch(closeMainPopup())
    setWordRuVisibility(false);
    setWordEnVisibility(true);
  }

  function handleSound() {
    const voices = window.speechSynthesis.getVoices();
    const lastVoice = voices[voices.length - 3];
    const utterance = new SpeechSynthesisUtterance(isWord.wordEn);
    /*utterance.lang = "en-US"
    utterance.lang = "es-Es"*/
    utterance.voice = lastVoice;
    utterance.pitch = 0.8;  // пониже
    utterance.rate = 1.2;   // побыстрее
    utterance.volume = 1; // потише
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className={`mainPopup ${isMainPopup && 'mainPopup_visible'}`}>
      <div className="mainPopup__container">
        <button className="mainPopup__close" type="reset" aria-label="закрыть" onClick={closePopup}>
          <img className="mainPopup__close-img" alt="закрыть" src={buttonClose} />
        </button>
        <h1 className="mainPopup__title">{isCollection.name}</h1>
        <div className="mainPopup__blok-container">

          <div className="mainPopup__blok">
            <h2 className={`mainPopup__title ${wordEnVisibility ? '' : 'mainPopup__title_visibility'}`}>{isWord.wordEn}</h2>
          </div>

          <div className="mainPopup__blok mainPopup__blok_translation">
            <h2 className={`mainPopup__title ${wordRuVisibility ? '' : 'mainPopup__title_visibility'}`}>{isWord.wordRu}</h2>
          </div>
        </div>
        <button className="mainPopup__buttonSound" type="button" onClick={handleSound}>
          <img className="mainPopup__battom-img" alt="озвучить" src={buttonSound} />
        </button>
        <div className="mainPopup_battom-container">
          <button className="mainPopup__battom mainPopup__battom-ok" type="button" onClick={handleKnowOk}>
            <img className="mainPopup__battom-img" alt="знаю" src={buttonOk} />
          </button>
          <button className="mainPopup__battom-no mainPopup__battom" type="button">
            <img className="mainPopup__battom-img" alt="не знаю" src={buttonNo} onClick={handleKnowNo} />
          </button>
        </div>
      </div>
    </section>
  )
}
export default MainPopup;