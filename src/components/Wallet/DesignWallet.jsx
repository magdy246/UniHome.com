import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { MdWavingHand } from "react-icons/md";
import { apiWallet } from "../../App";
import { Helmet } from 'react-helmet';
import { t } from "i18next";
const DesignWallet = () => {

  const savedLang = localStorage.getItem("lang") || 'en';
  const [Lang, setLang] = useState(savedLang);

  useEffect(() => {
    try {
      const parsedLang = JSON.parse(savedLang);
      setLang(parsedLang);
    } catch (error) {
      console.error('Failed to parse language from localStorage', error);
    }
  }, [savedLang]);

  const { dataUse } = useContext(apiWallet);
  let nameUser = JSON.parse(sessionStorage.getItem("user"));

  if (!dataUse || dataUse.length === 0) {
    return <div>Ned Amount or Loading wallet data...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Wallet</title>
        <meta name="description" content="قم بإدارة أموالك بسهولة وأمان مع محفظتنا الإلكترونية. تتبع نفقاتك، قم بتحويل الأموال، وادفع الفواتير بكل سهولة عبر الإنترنت." />
      </Helmet>
      <section className="py-6" dir={Lang === "ar" ? "rtl" : "ltr"} >
        <div className="w-full max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          {/* Wallet Info Section */}
          <div className="bg-white select-none p-6 rounded-lg shadow mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-3 md:mb-0">
                <GiWallet className="text-4xl text-orange-500 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {t("My Wallet")}
                </h1>
              </div>
              <div className="text-xl font-bold text-gray-500 flex justify-center gap-2 items-center">
                <span className="text-orange-500 text-2xl">Hi </span>
                {nameUser.firstname}
                <span>
                  <MdWavingHand className="text-yellow-300" />
                </span>
              </div>
            </div>

            <div className="flex select-none flex-col md:flex-row justify-between items-end">
              <p className="text-gray-600 text-sm mb-3 md:mb-0 w-full md:w-1/2">
                {t("To ensure accuracy and security, regularly review your wallet details by verifying transaction histories, checking balances, and confirming the authenticity of each entry.Stay vigilant for any discrepancies and update your information as needed to maintain full control over your account.")}
              </p>
              <div className="flex flex-col items-end w-full md:w-1/2">
                <div className="text-4xl font-bold text-green-500">
                  EGP {dataUse[0].totalAmount}{" "}
                </div>
                <div className="text-sm font-semibold text-orange-500">
                  {t("Your Wallet Balance.")}
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white rounded-lg shadow overflow-scroll">
            <table className="w-full text-sm text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {t("Id")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Date")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Credit")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Debit")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Balance")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Comments")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Transaction Rows */}
                {dataUse.map((e, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{e.id}</td>
                    <td className="px-1 py-4">{e.date}</td>
                    {e.type === "Credit" ? (
                      <td className="px-2 py-4 font-bold">EGP {e?.amount}</td>
                    ) : (
                      <td></td>
                    )}

                    {e.type === "Debit" ? (
                      <td className="px-2 py-4 font-bold text-red-500">
                        {e?.amount}
                      </td>
                    ) : (
                      <td></td>
                    )}

                    <td className="px-2 py-4 font-bold text-blue-500">
                      EGP {e.totalAmount}
                    </td>
                    <td className="px-6 py-4">{e.description}</td>
                    <td className="px-6 py-4 flex justify-center items-center">
                      {e.status === 1 ? (
                        <div className="bg-green-500 flex justify-center items-center gap-2 py-1 px-3 rounded-3xl w-fit">
                          <span className="text-white">
                            <FaCheckCircle />
                          </span>
                          <span className="text-white">{t("Success")}</span>
                        </div>
                      ) : (
                        <div className="bg-red-500 flex justify-center items-center gap-2 py-1 px-3 rounded-3xl w-fit">
                          <span className="text-white">
                            <FaCircleXmark />
                          </span>
                          <span className="text-white">{t("Failed")}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignWallet;
