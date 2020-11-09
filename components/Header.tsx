import homeStyles from "../styles/Home.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <Link href="/">
      <span className={`${homeStyles.header} display-4`}>mstream</span>
    </Link>
  );
}
