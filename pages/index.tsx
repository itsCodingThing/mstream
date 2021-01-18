import { useRouter } from "next/router";
import { useEffect } from "react";

function Root() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home");
    }, []);

    return <div></div>;
}

export default Root;
