import { Bike, Car, Home, Smartphone } from "lucide-react";
import style from "./Service.module.css"

function Service() {
    const services = [
        { icon: Home, title: "Kunci Rumah", desc: "Pembuatan & duplikasi kunci pintu rumah, gembok, dan kunci lemari." },
        { icon: Bike, title: "Kunci Motor", desc: "Buat kunci motor hilang, duplikasi remote, dan service kunci kontak." },
        { icon: Car, title: "Kunci Mobil", desc: "Pembuatan kunci mobil immobilizer untuk semua merk dengan presisi." },
        { icon: Smartphone, title: "Smart Key", desc: "Pemrograman smart key & remote keyless entry kendaraan modern." },
    ];

    return (
        <div className={style.container} id="layanan">
            <div className={style.parent}>
                <div className={style.header}>
                    <span className={style.eyebrow}>
                        Layanan Kami
                    </span>
                    <h2 className={style.title}>
                        Semua kebutuhan kunci <span className={style.italic}>dalam satu tempat.</span>
                    </h2>
                </div>

                <div className={style.grid}>
                    {
                        services.map((service, icon) =>
                            <article
                                key={service.title}
                                className={style.card}
                                style={{ animationDelay: `${icon * 100}ms` }}
                            >
                                <div className={style.iconWrap}>
                                    <service.icon style={{ width: "1.5rem", heigth: "1.5rem" }} />
                                </div>
                                <h3 className={style.cardTitle}>{service.title}</h3>
                                <p className={style.cardDesc}>{service.desc}</p>
                                <div className={style.bar} />
                            </article>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Service;