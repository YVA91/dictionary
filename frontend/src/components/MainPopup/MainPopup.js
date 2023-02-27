import './MainPopup.css';
import buttonOk from '../../images/mainOk.svg';
import buttonNo from '../../images/mainNo.svg';
import buttonClose from '../../images/close.svg';
import buttonSound from '../../images/buttonSound.svg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterWord } from '../../store/todoSlice'
import { replayFilterWord } from '../../store/todoSlice'
import { closeMainPopup } from '../../store/todoSlice'

function MainPopup() {


  const dispatch = useDispatch();

  const [wordVisibility, setWordVisibility] = useState(false)

  const isMainPopup = useSelector(state => state.todos.isMainPopup);
  const isCollection = useSelector(state => state.todos.isCollection);
  const isWord = useSelector(state => state.todos.isWord);
  const isFilter = useSelector(state => state.todos.isFilter);

  function handleKnowOk() {
    setWordVisibility(false);
    if ((isFilter.length) !== 0) {
      dispatch(filterWord())
    } else {
      dispatch(replayFilterWord())
      dispatch(filterWord())
    }

  }

  function handleKnowNo() {
    setWordVisibility(true);
  }


  function closePopup() {
    dispatch(closeMainPopup())
    setWordVisibility(false);
  }

  function handleSound() {

    const voices = window.speechSynthesis.getVoices();
    const lastVoice = voices[voices.length - 3];
    const utterance = new SpeechSynthesisUtterance(isWord.wordEn);
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
            <h2 className="mainPopup__title mainPopup__title-english">{isWord.wordEn}</h2>
          </div>
          <div className="mainPopup__blok mainPopup__blok_translation">
            <h2 className={`mainPopup__title ${wordVisibility ? '' : 'mainPopup__title_visibility'}`}>{isWord.wordRu}</h2>
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