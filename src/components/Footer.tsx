const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span>IN PLAIN SIGHT</span>
        </div>

        <div className="footer-links">
          <a href="#" className="https://www.youtube.com/@nplnsght">
            Youtube
          </a>
        </div>

        <div className="footer-copyright">© {new Date().getFullYear()} In Plain Sight. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
