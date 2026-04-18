import style from "./Navbar.module.css"
import { Key } from "lucide-react";

function Navbar() {
    const links = [
        { href: "#layanan", label: "Layanan" },
        { href: "#keunggulan", label: "Keunggulan" },
        { href: "#tentang", label: "Tentang" },
        { href: "#kontak", label: "Kontak" },
    ];

    return (
        <div className={style.container}>
            <div className={style.navbar}>
                <a href="#" className={style.brand}>
                    <span className={style.brandIcon}>
                        <Key style={{ width: "1.25rem", height: "1.25rem" }} />
                    </span>
                    <span className={style.brandText}>
                        Slim<span className={style.highlight}>Key</span>
                    </span>
                </a>
                <ul className={style.menu}>
                    {
                        links.map((link) => (
                            <li key={link.href}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))
                    }
                </ul>
                <a href="#kontak" className={style.cta}>
                    Hubungi Kami
                </a>
            </div >
        </div >
    )
}

export default Navbar;