import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'
import * as MainApi from '../../utils/MainApi';
import EditorCollection from '../EditorCollection/EditorCollection'
import buttonClose from '../../images/close.svg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPopupCategories, setEditorBlok, setChangeCategory } from '../../store/statePopup'

function PopupCategory({ onSubmit, onSubmitPatchCollection }) {

  const [allCollection, setAllCollection] = useState([]);
  const [isChangeCategory, setIsChangeCategory] = useState({});

  const statePopupCategories = useSelector(state => state.statePopup.statePopupCategories);
  const stateIsAllCategory = useSelector(state => state.statePopup.stateIsAllCategory);
  const editorBlok = useSelector(state => state.statePopup.stateEditorBlok);
  const changeCategory = useSelector(state => state.statePopup.stateChangeCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    MainApi.getWordCollecton()
      .then((data) => {
        setAllCollection(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [stateIsAllCategory, statePopupCategories])

  function deleteWordCollection(collectionId) {
    MainApi.deleteWordCollection(collectionId)
      .then((data) => {
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
    dispatch(setPopupCategories());
  }

  function openEditorBlok() {
    dispatch(setEditorBlok())
  }

  function closeEditorBlok() {
    dispatch(setEditorBlok())
  }

  function openEditWord(collection) {
    dispatch(setChangeCategory())
    setIsChangeCategory(collection)
  }

  function closeChangeCategory() {
    dispatch(setChangeCategory())
    setIsChangeCategory('')
  }

  return (
    <section className={`popupCategory ${statePopupCategories && 'popupCategory_visible'}`}>

      {stateIsAllCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closePopup}>
            <img className="popupCategory__close-img" alt="закрыть" src={buttonClose} />
          </button>
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
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closeEditorBlok}>
            <img className="popupCategory__close-img" alt="закрыть" src={buttonClose} />
          </button>
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
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closeChangeCategory}>
            <img className="popupCategory__close-img" alt="закрыть" src={buttonClose} />
          </button>
          <EditorCollection
            isChangeCategory={isChangeCategory}
            changeCategory={changeCategory}
            onSubmitPatchCollection={onSubmitPatchCollection}
          />
        </div>
      }
    </section>
  )
}
export default PopupCategory;