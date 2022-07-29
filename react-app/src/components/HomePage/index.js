import './HomePage.css'
import { AiFillGithub } from 'react-icons/ai'

function HomePage() {
    return (
        <>
        <h1 className="home-title">Welcome to Polagram!</h1>
            {/* <a className="github" href="https://github.com/john0123456789" size="25px">
                <AiFillGithub />
            </a>
            <a className="github" href="https://github.com/MonkeyToji" size="25px">
                <AiFillGithub />
            </a>
            <a className="github" href="https://github.com/jackmtran" size="25px">
                <AiFillGithub />
            </a>
            <a className="github" href="https://github.com/Christian-AC" size="25px">
                <AiFillGithub />
            </a> */}
            <div className="github">
                <a href="https://github.com/john0123456789">
                    John
                </a>
                <a href="https://github.com/MonkeyToji">
                    Matty
                </a>
                <a href="https://github.com/jackmtran">
                    Jack
                </a>
                <a href="https://github.com/Christian-AC">
                    Christian
                </a>
            </div>
            <ul className="home-scene">
                <img className="home-img" src="https://i.imgur.com/iSvJUEL.jpg"/>
            </ul>
        </>
    )
}


export default HomePage;
