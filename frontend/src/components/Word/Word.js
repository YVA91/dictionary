import './Word.css';
import Category from '../Category/Category';
import MainButton from '../MainButton/MainButton';

function Word({openPopupCategories}) {

  return (

    <section className="word">
      <Category 
        openPopupCategories={openPopupCategories}/>
      <MainButton />
    </section>

  )
}
export default Word;