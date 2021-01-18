import { useLayoutEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import styled from "styled-components";
import Image from "next/image";

interface IPlayerProps {
    url: string;
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const HidddenAudioElement = styled.div`
    display: none;
`;

const ImgBtnContainer = styled.div`
    display: flex;
    justify-content: center;
`;

interface RotateImageProps {
    toggle: "running" | "paused";
}

const RotateImage = styled(Image)`
    border-radius: 100px;
    animation-name: rotator;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: ${(props: RotateImageProps) => props.toggle};

    @keyframes rotator {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

function Player(props: IPlayerProps) {
    const audioRef = useRef<HTMLMediaElement | null>(null);
    const { url } = props;
    const [toggle, setToggle] = useState(false);

    useLayoutEffect(() => {
        audioRef.current?.addEventListener(
            "loadedmetadata",
            () => {
                console.log("meta data is lodaded");
            },
            true
        );

        audioRef.current?.addEventListener(
            "canplay",
            () => {
                console.log("song can be played");
            },
            true
        );
    }, []);

    const onCickToggle = () => {
        if (!toggle) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
        setToggle(!toggle);
    };

    const ImageWidth = 200;
    const ImageBtnWidth = 60;

    return (
        <PlayerContainer>
            <HidddenAudioElement>
                <audio id="hiddenAudio" preload="metadata" ref={audioRef}>
                    <source src={url} type="audio/mp3" />
                </audio>
            </HidddenAudioElement>
            <Card>
                <CardBody>
                    <RotateImage
                        toggle={!toggle ? "paused" : "running"}
                        src="/music-headphone.svg"
                        alt="headphone img"
                        height={ImageWidth}
                        width={ImageWidth}
                    />
                </CardBody>
                <CardFooter>
                    <ImgBtnContainer>
                        {!toggle ? (
                            <img
                                onClick={onCickToggle}
                                src="/play-circle.svg"
                                alt="play img"
                                width={ImageBtnWidth}
                                height={ImageBtnWidth}
                            />
                        ) : (
                            <img
                                onClick={onCickToggle}
                                src="/pause-circle.svg"
                                alt="pause img"
                                width={ImageBtnWidth}
                                height={ImageBtnWidth}
                            />
                        )}
                    </ImgBtnContainer>
                </CardFooter>
            </Card>
        </PlayerContainer>
    );
}

export default Player;
