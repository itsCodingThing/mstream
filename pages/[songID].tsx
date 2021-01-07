import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "reactstrap";
import { Howl } from "howler";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";

import musicStyles from "@/styles/Music.module.css";

import { url } from "@/utils/url";

function SongPage() {
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
        <Page>
            <NavigationBar />
            <Container>
                <Row className="mb-3 text-center">
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={musicStyles.container}>
                            <Image src="/music-headphone.svg" alt="thumbnail" width={150} height={150} />
                            <Button className="mt-3" color="primary" onClick={onClickPlay}>
                                Play
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
}

export default SongPage;
