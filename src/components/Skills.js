import ninety from "../assets/img/ninety-percent.svg";
import eighty from "../assets/img/eighty-percent.svg";
import seventy from "../assets/img/seventy-percent.svg";
import sixty from "../assets/img/sixty-percent.svg";
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"
import flask from "../assets/img/flask.png"
import docker from "../assets/img/docker.png"
import postgres from "../assets/img/postgres.png"
import django from "../assets/img/django.png"
import nodejs from "../assets/img/nodejs.png"
import reactjs from "../assets/img/reactjs.png"


export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={flask} alt="Image" />
                                <h5>Flask</h5>
                                <img src={ninety} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                            <div className="item">
                                <img src={django} alt="Image" />
                                <h5>Django</h5>
                                <img src={eighty} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                            <div className="item">
                                <img src={nodejs} alt="Image" />
                                <h5>NodeJS</h5>
                                <img src={seventy} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                            <div className="item">
                                <img src={reactjs} alt="Image" />
                                <h5>ReactJS</h5>
                                <img src={seventy} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                            <div className="item">
                                <img src={postgres} alt="Image" />
                                <h5>Postgresql</h5>
                                <img src={seventy} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                            <div className="item">
                                <img src={docker} alt="Image" />
                                <h5>Docker</h5>
                                <img src={sixty} style={{ paddingLeft: '15px' }} alt="Image" />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
