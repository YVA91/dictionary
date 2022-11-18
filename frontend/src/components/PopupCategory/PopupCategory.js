import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'
import * as MainApi from '../../utils/MainApi';
import EditorCollection from '../EditorCollection/EditorCollection'



import { useState, useEffect } from 'react';

function PopupCategory({ isPopupCategory, closePopup, onSubmit, setIsPopupCategory, onDeleteCollection }) {
  const [changeCategory, setChangeCategory] = useState(false);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [allCollection, setAllCollection] = useState([]);
  const [editorBlok, setEditorBlok] = useState(false);


  useEffect(() => {
    MainApi.getWordCollecton()
      .then((data) => {
        setAllCollection(data)

      })
      .catch((err) => {
        console.log(err);
      })
  }, [isAllCategory, isPopupCategory])


  useEffect(() => {
    function closeByEscapeAndOverlay(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
      if (evt.target.classList.contains('popupCategory')) {
        closePopup()
      }
    }
    if (isPopupCategory) {
      document.addEventListener('keydown', closeByEscapeAndOverlay);
      document.addEventListener("mousedown", closeByEscapeAndOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscapeAndOverlay);
        document.removeEventListener("mousedown", closeByEscapeAndOverlay);
      }
    }
  })

  function closePopup() {
    setIsPopupCategory(false);
    setTimeout(closeEditorBlok, 500);
  }


  function openEditorBlok() {
    setIsAllCategory(false)
    setEditorBlok(true)
  }

  function closeEditorBlok() {
    setIsAllCategory(true)
    setEditorBlok(false)
  }








  return (
    <section className={`popupCategory ${isPopupCategory && 'popupCategory_visible'}`}>

      {isAllCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closePopup}></button>
          <h1 className="popupCategory__title">Все категории</h1>
          <div className="popupCategory__title1">
            <div className="popupCategory__container-card">

              {allCollection.map((collection) => {
                return (
                  <CardCategory
                    key={collection._id}
                    collection={collection}
                    onDeleteCollection={onDeleteCollection}
                    setAllCollection={setAllCollection}
                  />)
              })
              }

            </div>
          </div>
          <button className="popupCategory__button" type="button" onClick={openEditorBlok}>
            <img className="popupCategory__button-img" alt="добавить" src={add} />
          </button>
        </div>
      }


      {editorBlok &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closeEditorBlok}></button>
          <EditorCollection
            onSubmit={onSubmit}
            closeEditorBlok={closeEditorBlok} />
        </div>
      }


      {changeCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closeEditorBlok}></button>
          <EditorCollection
            onSubmit={onSubmit}
            closeEditorBlok={closeEditorBlok} />
        </div>
      }





    </section>



  )
}
export default PopupCategory;