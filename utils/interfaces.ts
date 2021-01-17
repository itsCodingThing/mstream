export interface IAudioResponse {
    songsList: [{ id: string; uploadAt: string; title: string; audioBlobID: string }];
}
