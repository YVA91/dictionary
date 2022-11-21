import './Word.css';
import Category from '../Category/Category';
import MainButton from '../MainButton/MainButton';
import { useState, useEffect } from 'react';

function Word({openPopupCategories, openMainPopup}) {
  
  


  return (

    <section className="word">
      <Category 
        openPopupCategories={openPopupCategories}/>
      <MainButton 
      openMainPopup={openMainPopup}/>
    </section>

  )
}
export default Word;