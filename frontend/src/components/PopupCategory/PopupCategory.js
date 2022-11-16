import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'
import * as MainApi from '../../utils/MainApi';
import EditorCollection from '../EditorCollection/EditorCollection'



import { useState, useEffect } from 'react';

function PopupCategory({ isPopupCategory, closePopup }) {
  const [isAllCategory, setIsAllCategory] = useState(false);
  const [AllCategory, setAllCategory] = useState(false);
  const [allCollection, setAllCollection] = useState([]);
  const [editorBlok, setEditorBlok] = useState(true);


  useEffect(() => {
    MainApi.getWordCollecton()
      .then((data) => {
        setAllCollection(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])




  function handleEdit() {
    setIsAllCategory(true);
    setAllCategory(false);
  }


  return (
    <section className={`popupCategory ${isPopupCategory && 'popupCategory_visible'}`}>

      {AllCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closePopup}></button>
          <h1 className="popupCategory__title">Все категории</h1>
          <div className="popupCategory__title1">
            <div className="popupCategory__container-card">

              {allCollection.map((collection) => {
                return (
                  <CardCategory
                    onEdit={handleEdit}
                    key={collection._id}
                    collection={collection}
                  />)
              })
              }

            </div>
          </div>
          <button className="popupCategory__button">
            <img className="popupCategory__button-img" alt="добавить" src={add} />
          </button>
        </div>
      }

      {isAllCategory &&
        <div className="popupCategory__container">
          <button className="popupCategory__close" type="reset" aria-label="закрыть" onClick={closePopup}></button>
          <h1 className="popupCategory__title">gfgfdbdffdfd</h1>
          <div className="popupCategory__title1">
            <div className="popupCategory__container-card">
              <CardCategory
                onEdit={handleEdit} />
              <CardCategory
                onEdit={handleEdit} />
              <CardCategory
                onEdit={handleEdit} />
              <CardCategory
                onEdit={handleEdit} />
              <CardCategory
                onEdit={handleEdit} />

            </div>
          </div>
          <button className="popupCategory__button" type="button">
            <img className="popupCategory__button-img" alt="добавить" src={add} />
          </button>
        </div>
      }


      {editorBlok &&
        <div className="popupCategory__container">
          <EditorCollection />
        </div>
      }

    </section>



  )
}
export default PopupCategory;