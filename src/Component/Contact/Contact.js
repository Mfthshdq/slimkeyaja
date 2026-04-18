import { MapPin, MessageCircle, Phone } from "lucide-react";
import style from "./Contact.module.css"

function Contact() {
    return (
        <div className={style.container} id="kontak">
            <div className={style.parent}>
                <div className={style.card}>
                    <div className={style.glow} />
                    <div className={style.inner}>
                        <div>
                            <span className={style.eyebrow}>Hubungi Kami</span>
                            <h2 className={style.title}>
                                Butuh bantuan kunci? <span className={style.italic}>Kami siap.</span>
                            </h2>
                            <p className={style.lead}>
                                Hubungi tim SlimKey kapan saja - kami siap melayani 24 jam, setiap hari.
                            </p>
                            <a
                                href="https://wa.me/6285353721837"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.cta}
                            >
                                <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                                Chat WhatsApp Sekarang
                            </a>
                        </div>
                        <ul className={style.list}>
                            <li className={style.item}>
                                <Phone className={style.itemIcon} />
                                <div>
                                    <div className={style.itemLabel}>WhatsApp</div>
                                    <div className={style.itemValue}>
                                        +62 853-5372-1837
                                    </div>
                                </div>
                            </li>
                            <li className={style.item}>
                                <MapPin className={style.itemIcon} />
                                <div>
                                    <div className={style.itemLabel}>Alamat</div>
                                    <div className={style.itemValue}>
                                        deretan vermak levis, Jalan raya citayam, di sebrang, Gg. Asem.K, Kota Depok, Jawa Barat 16431
                                    </div>
                                </div>
                            </li>
                            <li className={style.item}>
                                <MessageCircle className={style.itemIcon} />
                                <div>
                                    <div className={style.itemLabel}>Jam Operasional</div>
                                    <div className={style.itemValue}>24 Jam - Setiap Hari</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;