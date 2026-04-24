import style from "./Navbar.module.css";
import { Key } from "lucide-react";

function Navbar() {
    const links = [
        { href: "#home", label: "Home" },
        { href: "#layanan", label: "Layanan" },
        { href: "#keunggulan", label: "Keunggulan" },
        { href: "#tentang", label: "Tentang" },
        { href: "#kontak", label: "Kontak" },
    ];

    return (
        <div className={style.container}>
            <div className={style.navbar}>
                <h1 className={style.brand}>
                    <span className={style.brandIcon}>
                        <Key style={{ width: "1.25rem", height: "1.25rem" }} />
                    </span>
                    <span className={style.brandText}>
                        Slim<span className={style.highlight}>Key</span>
                    </span>
                </h1>

                <ul className={style.menu}>
                    {links.map((link) => (
                        <li key={link.href}>
                            {/* Tambahkan class dari CSS module jika ada styling khusus link */}
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>

                <a href="#kontak" className={style.cta}>
                    Hubungi Kami
                </a>
            </div>
        </div>
    );
}

export default Navbar;