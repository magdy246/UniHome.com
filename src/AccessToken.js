// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie"; // مكتبة الكوكيز
// import axios from "axios"; // فرضًا أنك تستخدم Axios للتحقق من التوكن

// export function AccessToken() {
//   const navigate = useNavigate();
//   const [tokenValid, setTokenValid] = useState(null);

//   const token = localStorage.getItem("accessToken"); // استخراج التوكن من الكوكيز
//   useEffect(() => {

//     if (!token) {
//       // إذا لم يكن هناك توكن، توجيه المستخدم إلى صفحة تسجيل الدخول
//       // navigate("/", { replace: true });
//     } else {
//       // تحقق من صلاحية التوكن من خلال طلب API
//       axios
//         .post("/api/verify-token", { token })
//         .then((response) => {
//           if (response.data.valid) {
//             setTokenValid(true); // التوكن صالح
//           } else {
//             setTokenValid(false); // التوكن غير صالح
//             navigate("/", { replace: true });

//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying token:", error);
//           setTokenValid(false);
//           navigate("/", { replace: true });

//         });
//     }
//   }, []);

//   if (tokenValid === null) {
//     // عرض عنصر تحميل أثناء التحقق من التوكن
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {/* بقية المحتوى إذا كان التوكن صالح */}
//       {tokenValid && <p>Welcome, your token is valid!</p>}
//     </div>
//   );
// }


