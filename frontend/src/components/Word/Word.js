import './Word.css';
import Category from '../Category/Category';
import MainButton from '../MainButton/MainButton';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../../images/arrow-left.svg'
import arrowRight from '../../images/arrow-right.svg'


function Word({ openPopupCategories, openMainPopup }) {




  return (
    <section className="word">
      <Link to="/verbs" className="word__button_left">
        <img src={arrowLeft} className="word__arrow" />
      </Link>
      <Link to="/verbs" className="word__button_right">
        <img src={arrowRight} className="word__arrow" />
      </Link>
      <Category
        openPopupCategories={openPopupCategories} />
      <MainButton
        openMainPopup={openMainPopup} />
    </section>

  )
}
export default Word;