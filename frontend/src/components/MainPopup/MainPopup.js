import './MainPopup.css';
import buttonOk from '../../images/mainOk.svg';
import buttonNo from '../../images/mainNo.svg'
import { useState, useEffect } from 'react';


function MainPopup({ isMainPopup, closeMainPopup }) {
const words = JSON.parse(localStorage.getItem('collection'));

const [isWord, setIsWord] = useState(words.word[Math.floor(Math.random() * words.word.length)])








console.log(isWord)

/*
  const nextWord = document.querySelector(".dictionary__battom-ok");
  const wordVisibility = document.querySelector(".dictionary__battom-no");
  const word = document.querySelector(".dictionary__title-english");
  const wordTranslation = document.querySelector(".dictionary__title_translation");
  const wordTranslationVisibility = document.querySelector(".dictionary__title_visibility");
  
  nextWord.addEventListener('click', function () {
      const randWord= Array[Math.floor(Math.random() * Array.length)];
      word.textContent = randWord.word
      wordTranslation.textContent = randWord.translation
      wordTranslation.classList.add("dictionary__title_visibility");
    });
  
    wordVisibility.addEventListener('click', function () {
      wordTranslation.classList.remove("dictionary__title_visibility");
    });
*/






  return (

    <section className={`mainPopup ${isMainPopup && 'mainPopup_visible'}`}>

      <div className="mainPopup__container">


        <button className="mainPopup__close" type="reset" aria-label="закрыть" onClick={closeMainPopup}></button>
        <h1 className="mainPopup__title"></h1>
        
        <div className="mainPopup__blok-container">


          <div className="mainPopup__blok">
            <h2 className="mainPopup__title mainPopup__title-english">{isWord.wordEn}</h2>
          </div>
          <div className="mainPopup__blok mainPopup__blok_translation">
            <h2 className="mainPopup__title mainPopup__title_translation mainPopup__title_visibility ">{isWord.wordRu}</h2>
          </div>
        </div>

        <div className="mainPopup_battom-container">
          <button className="mainPopup__battom mainPopup__battom-ok" type="button">
            <img className="mainPopup__battom-img" alt="знаю" src={buttonOk }/>
          </button>
          <button className="mainPopup__battom-no mainPopup__battom" type="button">
          <img className="mainPopup__battom-img" alt="не знаю" src={buttonNo}/>
          </button>
        </div>


      </div>




    </section>



  )
}
export default MainPopup;