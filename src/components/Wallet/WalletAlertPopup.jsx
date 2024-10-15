import React from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const WalletAlertPopup = ({ navigate }) => {
  const { t } = useTranslation();

  const showAlert = () => {
    Swal.fire({
      title: t("No Wallet Data Available"),
      text: t("For your security, please log in to access your wallet and view transactions."),
      icon: 'warning',
      confirmButtonText: t("Login again"),
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

  return null;
};

export default WalletAlertPopup;
