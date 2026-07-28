import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    pertanyaan: "Bagaimana cara kerja Supply Matching?",
    jawaban:
      "Setelah Anda mengirim penawaran, sistem menghitung skor kecocokan dengan koperasi terdekat berdasarkan jarak, kesesuaian komoditas, dan volume. Penawaran akan muncul di antrean Supply Matching koperasi tersebut untuk ditinjau dan diterima secara manual oleh staf koperasi.",
  },
  {
    pertanyaan: "Dari mana harga rekomendasi dihitung?",
    jawaban:
      "Harga rekomendasi dihitung dari kombinasi 40% harga acuan pemerintah dan 60% rata-rata harga transaksi produsen lain di wilayah yang sama untuk komoditas tersebut. Semakin banyak penawaran yang tercatat, semakin akurat rekomendasinya.",
  },
  {
    pertanyaan: "Kenapa status penawaran saya masih \"Menunggu\"?",
    jawaban:
      "Status \"Menunggu\" berarti penawaran Anda sudah masuk sistem tapi belum diterima oleh koperasi mana pun. Status berubah jadi \"Dicocokkan\" saat koperasi menerima penawaran Anda, dan \"Terjual\" setelah surat jalan diterbitkan dan barang diterima secara fisik.",
  },
  {
    pertanyaan: "Apakah alamat operasional saya bisa diubah?",
    jawaban:
      "Alamat operasional diambil dari data lokasi saat pendaftaran dan belum bisa diubah langsung dari halaman Pengaturan. Hubungi koperasi setempat jika ada perubahan lokasi.",
  },
  {
    pertanyaan: "Bagaimana cara melihat riwayat transaksi saya?",
    jawaban:
      "Buka menu Riwayat untuk melihat seluruh penawaran dan status transaksinya, lengkap dengan filter tanggal, komoditas, dan status, serta opsi cetak laporan.",
  },
];

export default function BantuanPage() {
  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/produsen" className="text-body">
          Dashboard
        </Link>
        <ChevronRight className="size-3 text-body" strokeWidth={2} />
        <span className="font-medium text-brand-deep">Pusat Bantuan</span>
      </nav>

      <div className="flex items-center gap-3 pt-2">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
          <HelpCircle className="size-5 text-brand" strokeWidth={2} />
        </div>
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Pusat Bantuan
        </h1>
      </div>
      <p className="pb-6 text-base text-body">
        Pertanyaan yang sering ditanyakan seputar penggunaan Portal Produsen PASOK.
      </p>

      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.pertanyaan}
            className="flex flex-col gap-2 rounded-sm border border-border-soft bg-white p-6"
          >
            <h3 className="text-base font-semibold text-ink">{item.pertanyaan}</h3>
            <p className="text-sm leading-6 text-body">{item.jawaban}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
