import CardAbout from "./CardAbout";
import { FaCheckCircle } from "react-icons/fa";
import Slider from "react-slick";
import hero from "./Assets/images/hero.png"
import { useTranslation } from "react-i18next";

export default function About() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    arrows: false,
    adaptiveHeight: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const { t } = useTranslation();
  return (
    <>
      <section className="flex flex-col md:flex-row m-auto text-2xl items-center justify-center w-full flex-nowrap p-5 md:p-10">
        <div className="p-5 md:w-1/2 lg:w-1/3">
          <img className="w-full md:w-96" src={hero} alt="hero" />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 px-5">
          <h3 className="mb-4 mt-6 text-2xl md:text-3xl text-center md:text-start font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {t('Why')}{" "}<span className="text-orange-500 font-bold">
              {t('UniAbout')}
              <span className="text-blue-600">{t('HomeAbout')}</span>
            </span>
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="flex items-start gap-3 text-gray-800 font-bold">
                <FaCheckCircle className="colorPAbout text-start text-3xl" />
                {t('UntraditionalInteractiveExplanation')}
              </h4>
              <p className="bgColorPAbout ps-5">
                {t('InteractiveLearningExperience')}
              </p>
            </div>
            <div>
              <h4 className="flex items-start gap-3 text-gray-800 font-bold">
                <FaCheckCircle className="colorPAbout text-start text-3xl" />
                {t('ExperiencedQualifiedProfessors')}
              </h4>
              <p className="bgColorPAbout ps-5">
                {t('HighQualityContent')}
              </p>
            </div>
            <div>
              <h4 className="flex items-start gap-3 text-gray-800 font-bold">
                <FaCheckCircle className="colorPAbout text-start text-3xl" />
                {t('InteractWithProfessors')}
              </h4>
              <p className="bgColorPAbout ps-5">
                {t('ProfessorsNeeds')}
              </p>
            </div>
            <div>
              <h4 className="flex items-start gap-3 text-gray-800 font-bold">
                <FaCheckCircle className="colorPAbout text-start text-3xl" />
                {t('QuestionsAnswersSection')}
              </h4>
              <p className="bgColorPAbout ps-5">
                {t('ParentsHelp')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="text-center mx-auto w-full max-w-4xl px-4">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
            {t('title')}<span className="text-orange-500 font-bold">
              {t('UniAbout')}
              <span className="text-blue-600">{t('HomeAbout')}</span>
            </span>

          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            {t('descriptionAbout')}
          </p>
        </div>
        <div className="slider-container mx-auto max-w-6xl px-4">
          <Slider {...settings} className="flex justify-between items-center">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="p-4 transition-transform duration-300 hover:scale-105"
                >
                  <div className="h-full bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden p-5">
                    <CardAbout />
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </section>

    </>
  );
}
