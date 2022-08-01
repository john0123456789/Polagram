import './footer.css';
import { AiFillGithub } from 'react-icons/ai'


const Footer = () => {

  return (
    <div id="footer">

      <div id='footer-container'>
            <div className="each">
                <a className="feet"href="https://github.com/john0123456789" >
                    John Pham <AiFillGithub className="githubby" href="https://github.com/john0123456789" />
                </a>
            </div>
            <div className="each">
                <a className="feet" href="https://github.com/MonkeyToji">
                    Matty Dickerson <AiFillGithub className="githubby" href="https://github.com/MonkeyToji"/>
                </a>
            </div>
            <div className="each">
                <a className="feet" href="https://github.com/jackmtran">
                    Jack Tran <AiFillGithub className="githubby" href="https://github.com/jackmtran" />
                </a>
            </div>
            <div className="each">
                <a className="feet" href="https://github.com/Christian-AC">
                    Christian Alcantara <AiFillGithub className="githubby" href="https://github.com/Christian-AC" />
                </a>
            </div>
      </div>
   </div>
  );
}

export default Footer;
