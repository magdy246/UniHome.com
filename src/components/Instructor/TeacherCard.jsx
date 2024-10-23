import React from "react";
import { HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";
const TeacherCard = ({ Session }) => {
  let teacherId = Session.teacher.id;
  let dataTeacher = Session.teacher;

  let dataSession = Session.status;

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Student</title>
        <meta
          name="description"
          content={t('description')}
        />
      </Helmet>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl mb-5 bg-gray-100 rounded-3xl">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-3">
                {t('teacher')}
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                {t('rating')}
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                {t('booked')}
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                {t('Cancelled')}
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                {t('action')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex flex-col sm:flex-row items-center px-3 sm:px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl mb-2 sm:mb-0"
                  src={dataTeacher.image}
                  alt="Profile"
                />
                <div className="text-center sm:text-left sm:ps-3">
                  <div className="text-base font-semibold">
                    {dataTeacher.firstname}
                  </div>
                  <div className="font-normal text-gray-500">
                    {dataTeacher.country}
                  </div>
                </div>
              </th>
              <td className="px-3 sm:px-6 py-4">
                <div className="flex justify-center items-center gap-1">
                  <span>
                    <HiStar className="text-yellow-300 text-lg" />
                  </span>
                  <span>5</span>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4">
                <h3>{dataSession === "Cancelled" ? dataSession === "0" : "1"}</h3>
              </td>
              <td className="px-3 sm:px-6 py-4">
                <h3>{dataSession === "Booked" ? dataSession === "0" : "1"}</h3>
              </td>
              <td className="px-3 sm:px-6 py-4">
                <Link
                  to={`/chat?id=${teacherId}`}
                  className="p-2 sm:p-3 text-white bg-orange-500 rounded-3xl"
                >
                  {t('message')}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherCard;
