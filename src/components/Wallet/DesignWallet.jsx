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
  let nameUser = JSON.parse(localStorage.getItem("user"));

  const walletData = dataUse && dataUse.length > 0 ? dataUse[0] : { balance: 0 };

  return (
    <>
      <Helmet>
        <title>Wallet - UniHome</title>
        <meta name="description" content="Manage your UniHome transactions effortlessly. View your balance, transaction history, and handle payments securely." />
        <meta name="keywords" content="UniHome, wallet, transactions, balance, payment management, financial overview, secure payments" />
        <meta name="author" content="UniHome" />
        <meta property="og:title" content="Wallet - UniHome" />
        <meta property="og:description" content="Easily manage your transactions and balance with UniHome's wallet. Secure, user-friendly, and efficient." />
        <meta property="og:image" content="/src/components/Assets/images/UniHome.png" />
        <meta property="og:url" content="https://unih0me.com/wallet" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wallet - UniHome" />
        <meta name="twitter:description" content="Manage your UniHome transactions and view your balance securely." />
        <meta name="twitter:image" content="/src/components/Assets/images/UniHome.png" />
        <link rel="canonical" href="https://unih0me.com/wallet" />
      </Helmet>

      <h1 className="text-center text-6xl font-bold text-white my-6 relative">
        <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Wallet")}</span>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
      </h1>
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
                <span className="text-orange-500 text-2xl">{t("Hi")} </span>
                {nameUser?.firstname?.split(' ')[0]}
                <span>
                  <MdWavingHand className="text-yellow-300" />
                </span>
              </div>
            </div>

            <div className="flex select-none flex-col md:flex-row justify-between items-end">
              <p className="text-gray-600 text-sm mb-3 md:mb-0 w-full md:w-1/2">
                {t("To ensure accuracy, the number of sessions is converted into the price by appending zeros to the count (e.g., 32 sessions = 3200 EGP). Conversely, the actual number of sessions can be determined by removing the zeros from the price. For full security, it is recommended to regularly review the wallet, including checking balances, transaction records, and data accuracy. Any discrepancies should be addressed immediately, and information should be updated as needed to maintain full control over the account.")}
              </p>
              <div className="flex flex-col items-end w-full md:w-1/2">
                <div className="text-4xl font-bold text-green-500">
                  {t("EGP")} {walletData.balance || "00.0"}{" "}
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
                  {/* <th scope="col" className="px-6 py-3">
                    {t("Balance")}
                  </th> */}
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
                    {e.type === "credit" ? (
                      <td className="px-2 py-4 font-bold text-blue-500">EGP {e?.amount}</td>
                    ) : (
                      <td className="px-2 py-4 font-bold text-blue-500">EGP 00.0</td>
                    )}

                    {e.type === "debit" ? (
                      <td className="px-2 py-4 font-bold text-red-500">
                        EGP {e?.amount}
                      </td>
                    ) : (
                      <td className="px-2 py-4 font-bold text-red-500">EGP 00.0</td>
                    )}

                    {/* <td className="px-2 py-4 font-bold text-blue-500">
                      EGP {e.balance}
                    </td> */}
                    <td className="px-6 py-4 font-bold">{e.description === "<br>" ? "No Comment" : e.description || "No Comment"}</td>
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
