import './Preload.css'

function Preload({isPreload}) {

  return (
    <>
      <div className={`preloader ${isPreload && 'preloader_visible'}`}>
        <div className='preloader__container'>
          <span className="preloader__ball"></span>
          <span className="preloader__ball2"></span>
          <ul className="preloader__list">
            <li className="preloader__li"></li>
            <li className="preloader__li"></li>
            <li className="preloader__li"></li>
            <li className="preloader__li"></li>
            <li className="preloader__li"></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Preload;