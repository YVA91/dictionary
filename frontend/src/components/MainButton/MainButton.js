import './MainButton.css';

function MainButton({openMainPopup}) {
  
function Start() {
  openMainPopup()
}



  return (
    
    <section className="mainButton">
      <button type="button" className="mainButton__button" onClick={Start}>Start</button>
    </section>
  
  )
}
export default MainButton;