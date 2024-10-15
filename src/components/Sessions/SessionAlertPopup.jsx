import React from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SessionAlertPopup = ({ hasBookedSession }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showAlert = () => {
    const title = t("No Session Data Available")

    const text = t(`For your security, please press (Login again) to access your Sessions if you booked Sessions before, if you don't book before press (Close).`)

    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t("Login again"),
      cancelButtonText: t("Close"),
      cancelButtonColor: '#0006',
      confirmButtonColor: '#f97316',
      background: '#f0f0f0',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/login');
      }
    });
  };

  React.useEffect(() => {
    showAlert();
  }, []);

  return null; // This component does not render anything visible
};

export default SessionAlertPopup;
