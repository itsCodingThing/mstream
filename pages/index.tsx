import { useRouter } from "next/router";

function Root() {
    const router = useRouter();

    router.replace("/home");
    return <div></div>;
}

export default Root;
