import { useRouter } from "next/router";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";

import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";
import Player from "@/components/Player";
import { url } from "@/utils/url";

const PlayerBox = styled.div`
    padding-top: 1rem;
`;

function SongPage() {
    const router = useRouter();
    const { id } = router.query;

    // id can be undefined on first render
    if (!id) return <div></div>;

    return (
        <Page>
            <NavigationBar />
            <Container>
                <Row>
                    <Col>
                        <PlayerBox>
                            <Player url={`${url}/stream/${id}`} />
                        </PlayerBox>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
}

export default SongPage;
