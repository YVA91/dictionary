import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'
import * as MainApi from '../../utils/MainApi';
import EditorCollection from '../EditorCollection/EditorCollection'



import { useState, useEffect } from 'react';

function PopupCategory({ isPopupCategory, onSubmit, setIsPopupCategory, onSubmitPatchCollection }) {
  const [changeCategory, setChangeCategory] = useState(false);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [allCollection, setAllCollection] = useState([]);
  const [editorBlok, setEditorBlok] = useState(false);
  const [isChangeCategory, setIsChangeCategory] = useState({});

  useEffect(() => {
    MainApi.getWordCollecton()
      .then((data) => {
        setAllCollection(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isAllCategory, isPopupCategory])


  function deleteWordCollection(collectionId) {
    MainApi.deleteWordCollection(collectionId)
      .then((data) => {
        console.log(data.WordId)
        setAllCollection((state) => state.filter((c) => c._id !== data._id));
        if (data.WordId._id == JSON.parse(localStorage.getItem('collection'))._id) {
          localStorage.removeItem('collection')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }




  function closePopup() {
    setIsPopupCategory(false);
    setTimeout(closeEditorBlok, 500);
    setTimeout(closeChangeCategory, 500);
  }


  function openEditorBlok() {
    setIsAllCategory(false)
    setEditorBlok(true)
  }

  function closeEditorBlok() {
    setIsAllCategory(true)
    setEditorBlok(false)
  }



  function openEditWord(collection) {
    setChangeCategory(true)
    setIsAllCategory(false)
    setIsChangeCategory(collection)
  }

  function closeChangeCategory() {
    setIsAllCategory(true)
    setChangeCategory(false)
    setIsChangeCategory('')
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
                    onDeleteCollection={deleteWordCollection}
                    setAllCollection={setAllCollection}
                    onOpenEditWord={openEditWord}
                    closePopup={closePopup}
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
            closeEditorBlok={closeEditorBlok}
            editorBlok={editorBlok}
            isChangeCategory={isChangeCategory}
          />
        </div>
      }


      {changeCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closeChangeCategory}></button>
          <EditorCollection
            isChangeCategory={isChangeCategory}
            changeCategory={changeCategory}
            closeChangeCategory={closeChangeCategory}
            onSubmitPatchCollection={onSubmitPatchCollection}


          />
        </div>
      }





    </section>



  )
}
export default PopupCategory;