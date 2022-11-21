import './MainPopup.css';

import { useState, useEffect } from 'react';

function MainPopup({ isMainPopup }) {

  return (

    <section className={`mainPopup ${isMainPopup && 'mainPopup_visible'}`}>

      <div className="mainPopup__container">
        <button className="mainPopup__close" type="reset" aria-label="закрыть"></button>
        <h1 className="mainPopup__title">Все категории</h1>
        
        <div>
          <div class="dictionary__blok">
            <h2 class="dictionary__title dictionary__title-english">1</h2>
          </div>
          <div class="dictionary__blok dictionary__blok_translation">
            <h2 class="dictionary__title dictionary__title_translation dictionary__title_visibility ">1</h2>
          </div>
        </div>
        <div class="dictionary_battom-container">
          <battom class="dictionary__battom dictionary__battom-ok">
            <p class="dictionary__battom-text">&#128504;</p>
          </battom>
          <battom class="dictionary__battom-no dictionary__battom">
            <p class="dictionary__battom-text dictionary__battom-text_no ">&cross;</p>
          </battom>
        </div>



      </div>




    </section>



  )
}
export default MainPopup;