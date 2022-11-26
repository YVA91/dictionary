import './MainButton.css';

function MainButton({openMainPopup}) {
  
function Start() {
  openMainPopup()
}

JSON.parse(localStorage.getItem('collection'))




  return (
    
    <section className="mainButton">
      <button type="button" className="mainButton__button" disabled={(JSON.parse(localStorage.getItem('collection')) === null)} onClick={Start}>Start</button>
    </section>
  
  )
}
export default MainButton;