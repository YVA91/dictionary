import './MainPopup.css';
import buttonOk from '../../images/mainOk.svg';
import buttonNo from '../../images/mainNo.svg';
import buttonClose from '../../images/close.svg'
import { useState, useEffect } from 'react';


function MainPopup({ isMainPopup, closeMainPopup, isWord, mainTitle, setIsWord }) {

  const [wordVisibility, setWordVisibility] = useState(true)



  function handleKnowOk() {
    console.log("fh gf")
    setIsWord(JSON.parse(localStorage.getItem('collection')).word[Math.floor(Math.random() * JSON.parse(localStorage.getItem('collection')).word.length)])
    setWordVisibility(true);

  }

  function handleKnowNo() {
    setWordVisibility(false);
  }

  return (

    <section className={`mainPopup ${isMainPopup && 'mainPopup_visible'}`}>

      <div className="mainPopup__container">


        <button className="mainPopup__close" type="reset" aria-label="закрыть" onClick={closeMainPopup}>
          <img className="mainPopup__close-img" alt="закрыть" src={buttonClose}/>
        </button>
        <h1 className="mainPopup__title">{mainTitle.name}</h1>

        <div className="mainPopup__blok-container">
          <div className="mainPopup__blok">
            <h2 className="mainPopup__title mainPopup__title-english">{isWord.wordEn}</h2>
          </div>
          <div className="mainPopup__blok mainPopup__blok_translation">
            <h2 className={`mainPopup__title ${wordVisibility && 'mainPopup__title_visibility'}`}>{isWord.wordRu}</h2>
          </div>
        </div>

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