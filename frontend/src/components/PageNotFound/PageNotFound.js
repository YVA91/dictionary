import './PageNotFound.css'
import { Link } from 'react-router-dom';

function PageNotFound() {

function backClick() {
  window.history.back();
}

  return (
    <section className='pageNotFound'>
      <h2 className='pageNotFound__title'>404</h2>
      <p className='pageNotFound__subtitle'>Страница не найдена</p>
      <button className='pageNotFound__exit' onClick={backClick} type="button">Назад</button>
    </section>
  );
}

export default PageNotFound;