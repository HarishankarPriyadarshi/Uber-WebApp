import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token');
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // 🔐 prevent duplicate calls

  useEffect(() => {
    const performLogout = async () => {
      if (hasLoggedOut.current) return;
      hasLoggedOut.current = true;

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('captain-token');

          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out as a captain',
            icon: 'success',
            confirmButtonColor: '#10b461',
            timer: 1500
          });

          navigate('/captain-login');
        }
      } catch (error) {
        console.error('Captain logout error:', error);

        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to logout. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });

        navigate('/captain-login');
      }
    };

    performLogout();
  }, [navigate, token]);

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
