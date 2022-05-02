import React from "react"; 
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import foto1 from './Imagenes/foto1.png';
import foto2 from './Imagenes/foto2.jpg';
import foto3 from './Imagenes/foto3.jpg';
import "./styles.css";




function HomeAdmin() {

  return (
    <div style={{ display: 'center', width:1000, padding: 30 }}>
      <h4>React-Bootstrap Carousel Component</h4>
      <Carousel>
        <Carousel.Item interval={15000}>
          <div>
            
            <img
            className="d-block w-100"
            src={foto1}
            alt="Image One"
           />
          </div>
          
          <Carousel.Caption>
          <button className="buttons">Progreso</button>
            <p className="text">Aqui puedes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={15000}>
          <img
            className="d-block w-100"
            src={foto2}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Reportes</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={15000}>
          <img
            className="d-block w-100"
            src={foto3}
            alt="Image three"
          />
          <Carousel.Caption>
            <h3>Perfil</h3>
            <p>Sample Text for Image Three</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default HomeAdmin;