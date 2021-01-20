import { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter, Progress } from "reactstrap";
import styled from "styled-components";
import Image from "next/image";
import ReactPlayer from "react-player";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

interface IPlayerProps {
    url: string;
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;

const PlayerProgressBar = styled(Progress)`
    height: 0.3rem;
    border-radius: 0;
`;

const PlayerCard = styled(Card)`
    width: 100%;
`;

const PlayerCardBody = styled(CardBody)`
    display: flex;
    justify-content: center;
`;

const PlayerCardFooter = styled(CardFooter)`
    width: 100%;
`;

const PlayerPlayBtn = styled(BsPlayFill)`
    width: 4rem;
    height: 4rem;
`;

const PlayerPauseBtn = styled(BsPauseFill)`
    width: 4rem;
    height: 4rem;
`;

const HidddenAudioElement = styled.div`
    display: none;
`;

const PlayerBtnContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(235, 223, 223);
`;

const LoadingOverlayInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
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

interface ITimer {
    played: number;
    loaded: number;
    remain: number;
    totalTime: number;
    buffered: number;
}

const initialTime: ITimer = { played: 0, loaded: 0, remain: 100, totalTime: 0, buffered: 0 };

function Player(props: IPlayerProps) {
    const { url } = props;
    const ref = useRef<ReactPlayer>(null);

    // All the boolean state for the playing, loading, spinning
    const [state, setState] = useState({ playing: false, loading: true, spinning: false });

    // Initial Timer for Progress bar
    const [time, setTime] = useState(initialTime);

    const onReady = () => {
        if (ref.current) {
            // Get total duration time of audio
            console.log("ready to play");

            if (Number.isFinite(ref.current.getDuration())) {
                const secs = Math.floor(ref.current.getDuration());
                console.log(`Secs: ${ref.current.getDuration()}`);

                setTime({ ...time, totalTime: secs });
            }
            setState({ ...state, loading: false });
        }
    };

    const onEnd = () => {
        setState({ ...state, spinning: false });
        setTime(initialTime);
    };

    const onProgress = (value: { playedSeconds: number; loadedSeconds: number }) => {
        if (time.totalTime !== 0) {
            const played = Math.floor((Math.floor(value.playedSeconds) / time.totalTime) * 100);
            const loaded = Math.floor((Math.floor(value.loadedSeconds) / time.totalTime) * 100);
            const buffered = loaded - played;
            const remain = 100 - (played + buffered);

            setTime({ ...time, played, loaded, remain, buffered });
        }
    };

    const onCickToggle = () => {
        setState({ ...state, playing: !state.playing, spinning: !state.spinning });
    };

    const ImageWidth = 200;

    return (
        <PlayerContainer>
            <HidddenAudioElement>
                <ReactPlayer
                    ref={ref}
                    playing={state.playing}
                    onReady={onReady}
                    onProgress={onProgress}
                    onEnded={onEnd}
                    file="forceHLS"
                    url={url}
                />
            </HidddenAudioElement>
            <PlayerCard>
                {state.loading && (
                    <LoadingOverlay>
                        <LoadingOverlayInner>
                            <h3 className="mb-3 text-center display-4">Please Wait...</h3>
                        </LoadingOverlayInner>
                    </LoadingOverlay>
                )}
                <PlayerCardBody>
                    <RotateImage
                        toggle={state.spinning ? "running" : "paused"}
                        src="/music-headphone.svg"
                        alt="headphone img"
                        height={ImageWidth}
                        width={ImageWidth}
                    />
                </PlayerCardBody>
                <PlayerProgressBar multi>
                    <Progress bar color="success" value={time.played} />
                    <Progress bar color="info" value={time.buffered} />
                    <Progress bar color="warning" value={time.remain} />
                </PlayerProgressBar>
                <PlayerCardFooter>
                    <PlayerBtnContainer>
                        {state.playing ? (
                            <PlayerPauseBtn onClick={onCickToggle} />
                        ) : (
                            <PlayerPlayBtn onClick={onCickToggle} />
                        )}
                    </PlayerBtnContainer>
                </PlayerCardFooter>
            </PlayerCard>
        </PlayerContainer>
    );
}

export default Player;
