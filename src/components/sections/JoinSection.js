import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

const reasons = [
  "Kami telah bergerak dalam Buku Tahunan Sekolah Sejak 2019.",
  "Menyediakan harga terjangkau dengan value lebih bagi sekolah dan murid dibanding kompetitor vendor lain.",
  "Tim yang professional, kreatif, dan komunikatif.",
  "Mobile Studio, dengan pilihan background dan properti foto yang variatif layaknya studio foto professional tanpa biaya tambahan.",
  "Membuka ruang kreativitas bagi siswa–siswi tanpa batas.",
  "Proses pencetakan cepat dengan tetap mempertahankan kualitas kertas dan cetak.",
  "Buku yang telah dimodernisasi dengan mengikuti perkembangan teknologi sehingga bisa diakses kapanpun dan dimanapun.",
];

export default function JoinSection() {
  return (
    <section
      id="Join-Us"
      className={`w-[1440px] h-[900px] mx-auto flex flex-col justify-center items-center ${poppins.className}`}
    >
      <div className="flex flex-col justify-center items-center h-full w-full px-4">
        <div className="bg-[#2B258C]/90 rounded-3xl p-10 w-full max-w-full md:w-[900px] md:h-[600px] mx-auto shadow-xl flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl font-bold mb-6 text-left">WHY CREADIFF ?</h2>
          <ol className="list-decimal list-inside text-white text-lg font-light space-y-2 text-left">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
} 