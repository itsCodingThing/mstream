import page from "@/styles/Page.module.css";

function Page({ children }) {
    return <div className={page.page}>{children}</div>;
}

export default Page;
