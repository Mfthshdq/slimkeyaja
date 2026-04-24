import { useEffect, useState } from "react";
import style from "./Karyawan.module.css";

function Karyawan() {
    const [expenses, setExpenses] = useState([]);
    const [totalBulanIni, setTotalBulanIni] = useState(0);
    const [isEditing, setIsEditing] = useState(null);
    const [filter, setFilter] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: ""
    });

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8000/api/expenses", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setExpenses(data);
                setTotalBulanIni(data?.total_sebulan || 0);
            }
        } catch (err) {
            console.error("Gagal load pengeluaran", err);
        }
    };

    useEffect(() => { fetchExpenses(); }, []);

    const startEdit = (item) => {
        setIsEditing(item.id);
        const formattedDate = item.date ? new Date(item.date).toISOString().slice(0, 16) : "";
        setFormData({
            title: item.title,
            amount: item.amount,
            date: formattedDate
        });
    };

    const cancelEdit = () => {
        setIsEditing(null);
        setFormData({ title: "", amount: "", date: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = isEditing
            ? `http://localhost:8000/api/expenses/${isEditing}`
            : "http://localhost:8000/api/expenses";
        const method = isEditing ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                cancelEdit();
                fetchExpenses();
                alert(isEditing ? "Data diperbarui!" : "Data disimpan!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={style.container}>
            <header className={style.header}>
                <h1>SlimKey Karyawan</h1>
                <p>Halo, <strong>{localStorage.getItem('username')}</strong>!</p>
            </header>

            <div className={style.rekapCard}>
                <h3>Total Pengeluaran Bulan Ini</h3>
                <p>Rp {Number(totalBulanIni).toLocaleString('id-ID')}</p>
            </div>

            <div className={style.filterContainer}>
                <div className={style.filterGroup}>
                    <label>Pilih Bulan: </label>
                    <select
                        value={filter.month}
                        onChange={(e) => setFilter({ ...filter, month: e.target.value })}
                    >
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
                    <select
                        value={filter.year}
                        onChange={(e) => setFilter({ ...filter, year: e.target.value })}
                    >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>
                </div>
            </div>

            <section className={style.formCard}>
                <h3>{isEditing ? "Edit Catatan" : "Catat Pengeluaran Baru"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className={style.inputGroup}>
                        <label>Keterangan</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="contoh: makan siang"
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Nominal (Rp)</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="contoh: 20000"
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

                    <button type="submit" className={style.btnSubmit}>
                        {isEditing ? "Perbarui" : "Simpan"}
                    </button>

                    {isEditing && (
                        <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px', background: '#ccc', border: 'none', padding: '10px', borderRadius: '5px' }}>
                            Batal
                        </button>
                    )}
                </form>
            </section>

            <section>
                <h3>Daftar Pengeluaran Terakhir</h3>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Waktu & Tanggal</th>
                            <th>Keterangan</th>
                            <th>Jumlah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {new Date(item.date).toLocaleString('id-ID', {
                                        day: 'numeric', month: 'short', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                                <td>{item.title}</td>
                                <td>Rp {Number(item.amount).toLocaleString('id-ID')}</td>
                                <td>
                                    <button
                                        onClick={() => startEdit(item)}
                                        style={{ padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Karyawan;