import React from "react";
import empikLogo from "../../assets/img/empik.png";
import taniaksiazkaLogo from "../../assets/img/tania.jpeg";
import KomputronikLogo from "../../assets/img/komputronik.png";
import MediaMarktLogo from "../../assets/img/mediamarkt.png";
import RTVEuroAGDLogo from "../../assets/img/rtveuroagd.png";
import SwiatGSMLogo from "../../assets/img/swiatgsm.png";

function Partners() {
  const partners = [
    {
      name: "Empik",
      url: "https://www.empik.com/salony-empik-promocje",
      img: empikLogo,
    },
    {
      name: "Tania Książka",
      url: "https://www.taniaksiazka.pl/nowosci",
      img: taniaksiazkaLogo,
    },
    {
      name: "Komputronik",
      url: "https://www.komputronik.pl",
      img: KomputronikLogo,
    },
    {
      name: "MediaMarkt",
      url: "https://mediamarkt.pl",
      img: MediaMarktLogo,
    },
    {
      name: "RTVEuroAGD",
      url: "https://www.euro.com.pl",
      img: RTVEuroAGDLogo,
    },
    {
      name: "SwiatGSM",
      url: "https://swiatgsm.com",
      img: SwiatGSMLogo,
    },
  ];

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center text-[#DE1772] mb-6">
        Collaborators & Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-[#DE1772] text-xl flex flex-col items-center hover:text-[#b81563] transition-colors"
          >
            <div className="rounded-full overflow-hidden w-64 h-64 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 bg-white">
              <img
                src={partner.img}
                alt={partner.name}
                className="object-contain w-full h-full p-4"
              />
            </div>
            <p className="mt-4 font-medium">{partner.name}</p>
            
          </a>
        ))}
      </div>
    </div>
  );
}

export default Partners;
