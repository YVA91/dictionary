import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'

function PopupCategory({isPopupCategory, closePopup}) {












  return (

    <section className={`popupCategory ${isPopupCategory && 'popupCategory_visible'}`}>
      <div className="popupCategory__container">
        <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closePopup}></button>
        <h1 className="popupCategory__title">Все категории</h1>
        <div className="popupCategory__title1">
        <div className="popupCategory__container-card">
          <CardCategory/>
          <CardCategory/>
    
        </div>
        </div>
        <button className="popupCategory__button">
          <img className="popupCategory__button-img" alt="добавить" src={add}/>
        </button>
      </div>
    </section>

  )
}
export default PopupCategory;