import { createLazyFileRoute } from "@tanstack/react-router";
import "../index.css";
import bgImage from "/image/home-bg1.png";
import { useNavigate } from "@tanstack/react-router";
import wavyGroup from "/image/wavy-group3.png";
import profile1 from "/image/review-siswa1-block.png"; 
import profile2 from "/image/review-siswa2-block.png"; 
import StatistikBar from "../components/StatisticBar";
import { getAchievements } from "../service/achievement";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);

  const { data: achievementData, isSuccess: isAchievementsSuccess } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
  });

  useEffect(() => {
    if (isAchievementsSuccess && achievementData) {
      setAchievements(achievementData);
    }
  }, [achievementData, isAchievementsSuccess]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Hero */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start overflow-x-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full flex justify-center mb-6 px-4 pt-26 hidden md:flex">
          {/* hidden md:flex */}
          <StatistikBar />
        </div>
        <div className="w-full flex justify-start ml-4 md:ml-[280px]">
          <div className="p-4 md:p-8 max-w-xl text-left">
            <h3
              className="text-2xl font-light text-white pt-20 italic"
              style={{ fontFamily: "Sofia Pro Light, sans-serif" }}
            >
              Sistem Rekap Prestasi SMAN 1 Waru
            </h3>
            <p className="mt-2 text-white font-semibold text-4xl">SIPRESMARU</p>

            <button
              onClick={() => navigate({ to: "/prestasi" })}
              href="/prestasi"
              className="mt-4 px-3 py-1 rounded text-white "
              style={{
                background: "linear-gradient(to right, #EA526F, #842E3F)",
              }}
            >
              Lihat Prestasi
            </button>
          </div>
        </div>
      </div>

      {/* Sambutan Kepala Sekolah */}
      <section
        className="min-h-screen bg-[#eeeeee] flex flex-col items-center justify-center py-16 px-4 md:px-12 e overflow-x-hidden"
        style={{
          backgroundImage: "url('/image/wavy.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "contain",
        }}
      >
        {/* Judul section */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 md:mt-10">
          Sambutan Kepala Sekolah
        </h1>

        {/* Konten dua kolom */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 md:mt-5 gap-8 items-start">
          {/* Kiri: Foto dan nama */}
          <div className="flex flex-col items-center md:items-center">
            <img
              src="/image/foto-kepsek.png"
              alt="Kepala Sekolah"
              className="w-64 h-auto rounded shadow-lg"
            />
            <p className="mt-4 font-semibold text-lg text-gray-800">
              Laila Mufida, S.Pd., M.Pd.
            </p>
            <p className="text-sm text-gray-600">
              Kepala Sekolah SMA Negeri 1 Waru
            </p>
          </div>

          {/* Kanan: Sambutan */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat datang di SIPRESMARU!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Saya menyambut baik hadirnya Sipresmaru (Sistem Rekap Prestasi
              Siswa SMAN 1 Waru) sebagai langkah positif dalam mendokumentasikan
              dan menampilkan prestasi siswa secara digital. Sistem ini
              diharapkan dapat menjadi motivasi bagi seluruh peserta didik untuk
              terus berprestasi, serta menjadi wadah apresiasi bagi setiap usaha
              dan pencapaian yang diraih oleh siswa SMAN 1 Waru.
            </p>
            <button
              onClick={() => navigate({ to: "/tentangKami" })}
              className="mt-2 px-4 py-2 text-white rounded "
              style={{
                background: "linear-gradient(to right, #009140, #23D772)",
              }}
            >
              Lebih tentang kami!
            </button>
          </div>
        </div>
        {/* <div className="flex justify-end items-end w-full mt-8">
          <img
            src="/image/wavy.png"
            alt=""
            className="w-100 h-100 md:w-60 md:h-60  rotate-350"
          />
        </div> */}
      </section>

      {/* Prestasi Terbaru */}
      <div className="flex flex-col md:flex-row items-stretch w-full bg-[#eeeeee] relative">
        <div
          className="md:w-3/5 w-full px-4 md:px-20 bg-no-repeat bg-cover text-white p-6 md:p-10 z-10 relative"
          style={{
            backgroundImage: "url('/image/bg-new-update.png')",
          }}
        >
          <h2 className="text-lg md:text-xl font-bold mb-4">
            PRESTASI TERBARU
          </h2>
          <div className="space-y-4 text-xs md:text-sm font-medium mr-15 py-7">
            {achievements
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
              .map((item) => (
                <div key={item.id}>
                  <p
                    className="text-gray-200"
                    style={{ fontFamily: "Sofia Pro Light, sans-serif" }}
                  >
                    {formatDate(item.date)}
                  </p>
                  <p>
                    {item.students?.full_name} meraih {item.title} yang
                    diselenggarakan oleh {item.organizer_name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Foto LDKS */}
        <div className="md:w-1/2 w-full -ml-6 md:-ml-33 z-0 hidden md:flex">
          <img
            src="/image/ldks.png"
            alt="Foto LDKS"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hear What They Said */}
      <section
        className="relative w-full bg-no-repeat bg-cover bg-center overflow-hidden h-[1400px] md:h-[1200px]"
        style={{
          backgroundImage: `url(${wavyGroup})`,
        }}
      >
        <div
          className="absolute w-full h-full z-0"
          style={{
            background:
              "linear-gradient(to top, #0066DD 0%, rgba(0, 102, 221, 0) 40%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-4 h-full flex flex-col  text-gray-800 mt-[-60px]">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10 md:mb-20 mt-20">
            Hear What They Said!
          </h2>

          {/* Baris 1 - Muhammad Adeva */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-20">
            {/* Text */}
            <p className="md:w-1/2 text-center md:text-left text-sm md:text-base leading-relaxed">
              "Manusia adalah makhluk yang obsesif. Sesuatu yang menarik akan
              memunculkan energi untuk melakukan hal yang serupa. Dengan adanya
              display orang seperti ini, kita jadi termotivasi secara alami
              untuk bisa meraih suatu prestasi"
            </p>
            {/* Foto dan Nama */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start mt-6 md:mt-0 md:pl-40">
{/*               
              <img
                src={profile1}
                alt="Muhammad Adeva"
                className="w-70 h-70 object-cover rounded-xl mb-2"
              />
               */}
                <div className="text-pink-600 font-semibold text-lg">
                  Muhammad Adeva
                </div>
                <div className="text-xs text-gray-700">
                  Ketua OSIS SMAN 1 Waru 2023/2024
                </div>
            </div>
          </div>

          {/* Baris 2 - Naila Jinan */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-center">
            {/* Text */}
            <p className="md:w-1/2 text-center md:text-left text-sm md:text-base leading-relaxed">
              "Manusia adalah makhluk yang obsesif. Sesuatu yang menarik akan
              memunculkan energi untuk melakukan hal yang serupa. Dengan adanya
              display orang seperti ini, kita jadi termotivasi secara alami
              untuk bisa meraih suatu prestasi"
            </p>
            {/* Foto dan Nama */}
            <div className="md:w-1/2 flex flex-col items-center md:items-end mt-6 md:mt-0 md:pr-50">
              {/* <img
                src={profile2}
                alt="Naila Jinan Gaisani"
                className="w-70 h-70 object-cover rounded-xl mb-2"
              /> */}
              <div className="text-pink-600 font-semibold text-lg ">
                Naila Jinan Gaisani
              </div>
              <div className="text-xs text-gray-700">
                Lomba Tingkat Nasional POSI PROV 2023
              </div>
            </div>
          </div>

          {/* CTA */}
          <h3 className="mt-25 text-center text-xl md:text-4xl font-bold text-blue-700">
            Udah Siap Liat Prestasi Siswa SMAN 1 Waru?
          </h3>
        </div>
      </section>
    </>
  );
}
