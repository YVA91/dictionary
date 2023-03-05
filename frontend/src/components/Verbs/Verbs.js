import './Verbs.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';




function Verbs() {


  return (
    <section className="verbs">
      <Link to="/word" className="verbs__button_left">
        <img src={arrowLeft} className="verbs__arrow" />
      </Link>
      <Link to="/word" className="verbs__button_right">
        <img src={arrowRight} className="verbs__arrow" />
      </Link>





    </section>

  )
}
export default Verbs;