import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";

import musicStyles from "../styles/Music.module.css";

export default function SongPage() {
  const router = useRouter();
  const songID = router.query.songId;

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
            <audio className={musicStyles.audio} controls>
              <source src={`https://mstream-node.herokuapp.com/stream/${songID}`} />
            </audio>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
