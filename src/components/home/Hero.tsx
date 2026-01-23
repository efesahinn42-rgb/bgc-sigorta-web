"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Aracınız BGC Güvencesinde",
    desc: "Yola çıkarken aklınız aracınızda kalmasın. En kapsamlı kasko ve trafik sigortası çözümleri.",
    // Kasko: Lüks Araç
    imageSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop",
    buttonText: "Kasko Fiyatı Al",
  },
  {
    id: 2,
    title: "Sağlığınız Bize Emanet",
    desc: "Siz ve sevdikleriniz için en iyi hastanelerde geçerli tamamlayıcı ve özel sağlık sigortaları.",
    // Sağlık: Doktor ve Hasta Güveni
    imageSrc:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Sağlık Teklifi Al",
  },
  {
    id: 3,
    title: "Yuvanızın Gerçek Güvencesi",
    desc: "Evinizi ve içindeki değerli anıları yangın, deprem ve hırsızlığa karşı koruma altına alın.",
    // Konut: Modern Ev
    imageSrc:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Konut Paketi İncele",
  },
  {
    id: 4,
    title: "İşyeriniz İçin Tam Koruma",
    desc: "Ticari geleceğinizi riske atmayın. İşyerinizi ve emeğinizi tüm risklere karşı sigortalayın.",
    // İşyeri: Plaza / Ofis
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    buttonText: "İşyeri Teklifi Al",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Yazı Animasyonu
  const textAnimationClass = "animate-[fadeInUp_0.7s_ease-out]";

  return (
    // DEĞİŞİKLİK BURADA: h-[600px] yerine h-screen (Tam Ekran) yaptık.
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-gray-900">
      {/* SLIDER GÖRSELLERİ */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Arka Plan Resmi */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[2000ms] ease-out"
            style={{ backgroundImage: `url(${slide.imageSrc})` }}
          />

          {/* Gradyan Katmanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
      ))}

      {/* İÇERİK METİNLERİ */}
      <div className="relative z-20 w-full h-full flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-16 pt-20">
        {" "}
        {/* pt-20 ekledim ki yazılar biraz aşağı insin, menüyle çakışmasın */}
        <div
          key={current}
          className={`text-center lg:text-left max-w-4xl ${textAnimationClass}`}
        >
          <span className="inline-flex items-center gap-2 py-2 px-4 mb-6 rounded-full bg-red-600/20 text-red-400 text-sm font-bold tracking-wider uppercase border border-red-600/30 backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt="BGC Sigorta"
              width={96}
              height={96}
              className="object-contain"
            />
            Güvencesiyle
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-12 leading-relaxed font-medium drop-shadow-lg max-w-2xl mx-auto lg:mx-0">
            {slides[current].desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-red-600/40 hover:-translate-y-1 flex items-center justify-center">
              {slides[current].buttonText}
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
              Detaylı Bilgi
            </button>
          </div>
        </div>
      </div>

      {/* OKLAR */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 lg:p-4 rounded-full transition backdrop-blur-md z-30 border border-white/10 group"
      >
        <ChevronLeft
          size={32}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 lg:p-4 rounded-full transition backdrop-blur-md z-30 border border-white/10 group"
      >
        <ChevronRight
          size={32}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </button>

      {/* ALT NOKTALAR */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              current === index
                ? "bg-red-600 w-12"
                : "bg-white/40 w-2.5 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
