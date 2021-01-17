import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

function Root() {
    const router = useRouter();

    useLayoutEffect(() => {
        router.replace("/home");
    }, []);

    return <div></div>;
}

export default Root;
