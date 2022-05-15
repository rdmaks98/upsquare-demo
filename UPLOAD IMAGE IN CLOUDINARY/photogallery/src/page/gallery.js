import React, { useEffect} from 'react';
import { CardGroup, Card,Badge,Img,ImgOverlay,Title,Text } from 'react-bootstrap';

const Gallery = () => {
    const [Images,setImages] = React.useState([]);

    console.log(Images)

    useEffect(() => {
        async function getImages() {
            const response = await fetch(`http://localhost:2020/image-upload/`);
            const Images = await response.json();
            setImages(Images);
        }
        return getImages();
    },);
  return <div>
      <h4 style={{ marginTop: "20px" }}>
          Photo gallery <Badge bg="secondary">New</Badge>
      </h4>
      <CardGroup style={{ marginTop: "20px" }}>
          {Images && Images.map((img, i) => (
              <Card>
                  <Card.Img variant="top" src="https://picsum.photos/20/20" />
                  <Card.Body>
                      <Card.Title>Added by:{img.name} </Card.Title>
                  </Card.Body>
                  {/* <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>*/ }
              </Card>
          ))}
      </CardGroup>
  </div>;
};

export default Gallery;
