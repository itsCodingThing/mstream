import { useRouter } from "next/router";
import { Col, Container, Row } from "reactstrap";
import Header from "../components/Header";

export default function SongPage() {
  const router = useRouter();
  const songID = router.query.songID;

  return (
    <Container>
      <Row className="mb-3 text-center">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <audio src={`/api/music/stream/${songID}`} controls></audio>
        </Col>
      </Row>
    </Container>
  );
}
