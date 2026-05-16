import { useCallback, useEffect, useState } from "react";
import style from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import Karyawan from "../Karyawan/Karyawan";

function Admin() {
    const [sales, setSales] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [formData, setFormData] = useState({ service: "", price: "", date: "" });
    const [isEditing, setIsEditing] = useState(null);
    const navigate = useNavigate();

    // Filter untuk data Bulanan (dikirim ke backend)
    const [filter, setFilter] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // State untuk rekap Harian (kotak atas)
    const [filterDate, setFilterDate] = useState(todayString);

    // --- STATE BARU: Filter khusus untuk Tabel ---
    const [tableDateFilter, setTableDateFilter] = useState("");

    const fetchSales = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://backend.slimkey.my.id/api/sales?month=${filter.month}&year=${filter.year}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setSales(data);
                setSubtotal(data?.subtotal_dipilih || 0);
            } else {
                setSales([]);
                setSubtotal(0);
            }
        } catch (err) { console.error(err); }
    }, [filter.month, filter.year]);

    useEffect(() => { fetchSales(); }, [fetchSales]);

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`https://backend.slimkey.my.id/api/sales/${id}`, {
                    method: "DELETE",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchSales();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const startEdit = (item) => {
        setIsEditing(item.id);
        const formattedDate = item.date ? new Date(item.date).toISOString().slice(0, 16) : "";
        setFormData({
            service: item.service,
            price: item.price,
            date: formattedDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = isEditing
            ? `https://backend.slimkey.my.id/api/sales/${isEditing}`
            : "https://backend.slimkey.my.id/api/sales";

        const method = isEditing ? "PUT" : "POST";

        try {
            await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            setFormData({ service: "", price: "", date: "" });
            setIsEditing(null);
            fetchSales();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isSameDay = (dbDateStr, selectedDateStr) => {
        const dbDate = new Date(dbDateStr);
        const year = dbDate.getFullYear();
        const month = String(dbDate.getMonth() + 1).padStart(2, '0');
        const day = String(dbDate.getDate()).padStart(2, '0');
        const formattedDbDate = `${year}-${month}-${day}`;
        return formattedDbDate === selectedDateStr;
    };

    const pendapatanHarian = sales
        .filter(item => isSameDay(item.date, filterDate))
        .reduce((sum, item) => sum + Number(item.price), 0);

    // --- LOGIKA FILTER TABEL ---
    const filteredSales = tableDateFilter
        ? sales.filter(item => isSameDay(item.date, tableDateFilter))
        : sales;

    return (
        <div className={style.container}>
            <h1 className={style.header}>SlimKey Admin Dashboard</h1>
            <h1 className={style.subHeader}>Form Penjualan</h1>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className={style.subTotal} style={{ flex: 1, minWidth: '250px' }}>
                    <h3>Pendapatan Harian</h3>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        style={{ marginBottom: '10px', padding: '5px' }}
                    />
                    <p>Rp {Number(pendapatanHarian).toLocaleString('id-ID')}</p>
                </div>
                <div className={style.subTotal} style={{ flex: 1, minWidth: '250px' }}>
                    <h3>Subtotal Penjualan (Bulan Ini)</h3>
                    <p>Rp {Number(subtotal).toLocaleString('id-ID')}</p>
                </div>
            </div>

            <div className={style.filterContainer}>
                <div className={style.filterGroup}>
                    <label>Pilih Bulan: </label>
                    <select value={filter.month} onChange={(e) => setFilter({ ...filter, month: e.target.value })}>
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>
                <div className={style.filterGroup}>
                    <label>Tahun: </label>
                    <select value={filter.year} onChange={(e) => setFilter({ ...filter, year: e.target.value })}>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>
                </div>
            </div>

            <section className={style.formSection}>
                <h2>{isEditing ? "Edit Data Penjualan" : "Buat Data Baru"}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Input form sama seperti sebelumnya */}
                    <div className={style.inputGroup}>
                        <label>Layanan Kunci</label>
                        <input
                            type="text"
                            placeholder="contoh : Duplikat Kunci Motor"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Harga (IDR)</label>
                        <input
                            type="number"
                            placeholder="contoh : 50000"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Tanggal & Waktu</label>
                        <input
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.btn}>
                        <button type="submit" className={style.btnSubmit}>{isEditing ? "Update Data" : "Simpan Transaksi"}</button>
                        {
                            isEditing &&
                            <button
                                type="button"
                                className={style.btnCancel}
                                onClick={() => {
                                    setIsEditing(null);
                                    setFormData({ service: "", price: "", date: "" })
                                }}>
                                Batal</button>
                        }
                        <button onClick={handleLogout} className={style.btnLogout}>Logout</button>
                    </div>
                </form>
            </section>

            <section>
                {/* --- HEADER TABEL DENGAN FILTER --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <h2>History Penjualan</h2>
                    <div>
                        <label style={{ marginRight: '10px' }}>Filter Tabel per Tanggal: </label>
                        <input
                            type="date"
                            value={tableDateFilter}
                            onChange={(e) => setTableDateFilter(e.target.value)}
                            style={{ padding: '5px' }}
                        />
                        <button
                            onClick={() => setTableDateFilter("")}
                            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Layanan</th>
                            <th>Harga</th>
                            <th>Waktu & Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ganti map ke filteredSales */}
                        {filteredSales.length > 0 ? (
                            filteredSales.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.service}</td>
                                    <td>Rp {Number(item.price).toLocaleString('id-ID')}</td>
                                    <td>
                                        {new Date(item.date).toLocaleString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td>
                                        <button onClick={() => startEdit(item)} className={style.btnEdit}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className={style.btnDelete}>Hapus</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>Tidak ada data pada tanggal tersebut.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            <Karyawan />
        </div>
    );
}

export default Admin;