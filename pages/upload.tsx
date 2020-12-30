import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";

export default function Upload() {
  const onClickUpload = async () => {
    try {
      // @ts-ignore
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        const completed = Math.floor((e.loaded / e.total) * 100);
        console.log(completed);
      };

      xhr.onloadend = (e) => {
        if (xhr.status === 200) {
          console.log("successful");
        } else {
          console.log("problem");
        }
      };

      xhr.onerror = (e) => {
        console.log(e);
      };

      xhr.open("POST", `https://mstream-node.herokuapp.com/upload/${file.name}`);
      xhr.send(file);
    } catch (error) {
      console.log("nothing is selected !!");
    }
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={onClickUpload}>
            Select File
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
