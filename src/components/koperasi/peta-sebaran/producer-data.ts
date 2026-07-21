export type ProducerCategory = "pertanian" | "kelautan" | "hub";

export type ProducerPin = {
  id: string;
  nama: string;
  kategori: ProducerCategory;
  komoditas: string;
  lokasi: string;
  status: "Tersedia" | "Segera Panen";
  lat: number;
  lng: number;
};

export const PRODUCER_PINS: ProducerPin[] = [
  {
    id: "1",
    nama: "Kelompok Tani Makmur",
    kategori: "pertanian",
    komoditas: "Jagung",
    lokasi: "Bitung, Sulawesi Utara",
    status: "Tersedia",
    lat: 1.4452,
    lng: 125.1897,
  },
  {
    id: "2",
    nama: "Nelayan Bahari Likupang",
    kategori: "kelautan",
    komoditas: "Ikan Tuna",
    lokasi: "Likupang, Sulawesi Utara",
    status: "Tersedia",
    lat: 1.6667,
    lng: 125.05,
  },
  {
    id: "3",
    nama: "Koperasi Gorontalo Jaya",
    kategori: "pertanian",
    komoditas: "Jagung Kering",
    lokasi: "Gorontalo",
    status: "Segera Panen",
    lat: 0.5435,
    lng: 123.0568,
  },
];
