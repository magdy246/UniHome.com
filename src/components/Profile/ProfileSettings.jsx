// import { useState } from 'react'
// import { Link, Outlet } from 'react-router-dom'

// export default function ProfileSettings() {
//     const [select, setSelect] = useState("Edit Account")

//     return <>
//         <section className="profileSettings mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl">
//             <div class="border-b border-gray-200 dark:border-gray-700">
//                 <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
//                     <li class="me-2">
//                         <Link to={""} onClick={() => { setSelect("Edit Account") }} class={`${select == 'Edit Account' ? "border-b-4" : ""} border-orange-500 inline-flex items-center justify-center p-4 rounded-t-lg hover:text-orange-500  dark:hover:text-orange-500 group`}>
//                             <svg class="w-4 h-4 me-2 text-orange-500 group-hover:text-orange-500 dark:text-orange-500 dark:group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
//                             </svg>Edit Account
//                         </Link>
//                     </li>

//                     <li class="me-2 d-none">
//                         <Link to={"edit_password"} onClick={() => { setSelect("Edit Password") }} class={`${select == 'Edit Password' ? "border-b-4" : ""} border-orange-500 inline-flex items-center justify-center p-4 rounded-t-lg hover:text-orange-500  dark:hover:text-orange-500 group`}>
//                             <svg class="w-4 h-4 me-2 text-orange-500 group-hover:text-orange-500 dark:text-orange-500 dark:group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
//                             </svg>Edit Password
//                         </Link >
//                     </li>
//                 </ul>
//             </div>
//             <div className="">
//                 <Outlet></Outlet>
//             </div>
//         </section>
//     </>
// }
