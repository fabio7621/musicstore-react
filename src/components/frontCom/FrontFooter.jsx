export default function FrontFooter() {
  return (
    <>
      <footer className="main-footer d-flex justify-content-center align-items-center">
        <div className="footer-profile-lists">
          <a
            href="https://line.me/ti/p/K77LSheFNU"
            className="footer-profile-item"
          >
            <img
              src="@/../../../../public/icon/line-logo 1.png"
              alt="footerline"
            />
          </a>
          <a
            href="https://github.com/fabio7621"
            className="footer-profile-item"
          >
            <img
              src="@/../../../../public/icon/Github.png"
              alt="footergithub"
            />
          </a>
          <a
            href="https://www.cake.me/d6200121a"
            className="footer-profile-item cake"
          >
            <img
              src="@/../../../../public/icon/cakelogo.png"
              alt="footercake"
            />
          </a>
        </div>
      </footer>
    </>
  );
}
