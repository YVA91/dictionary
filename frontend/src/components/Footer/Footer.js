import './Footer.css';

function Footer() {

  return (
    <>
      <footer className="footer">
      <h2 className="footer__title">
            by Vladimir Iakhnev
          </h2>
          <p className='footer__copyright'>© {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default Footer;
