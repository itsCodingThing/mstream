import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";
import { Howl, Howler } from "howler";
import musicStyles from "../styles/Music.module.css";
import { url } from "../utils/url";

export default function SongPage() {
  const router = useRouter();
  const { songID } = router.query;
  const sound = new Howl({
    src: `${url}/stream/${songID}`,
    format: ["mp3"],
  });

  useEffect(() => {
    return () => {
      sound.unload();
    };
  });

  const onClickPlay = () => {
    console.log("play button is clicked");
    sound.play();
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
          <Link href="/">
            <Button color="primary">Back</Button>
          </Link>
          <div className={musicStyles.container}>
            <Image src="/Music-thumbnail.svg" alt="thumbnail" width="200" height="200" />
            <Button className="mt-3" color="primary" onClick={onClickPlay}>
              Play
            </Button>
            {/* <audio className={musicStyles.audio} controls>
              <source src={`http://localhost:3000/stream/${songID}`} />
            </audio> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
