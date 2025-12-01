import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, userSignOut } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    // interceptor response
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);

        const status = error.status
        
        if (status === 401 || status === 403) {
          userSignOut()
            .then(() => { 
            navigate('/login')
           })
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, userSignOut, navigate]);

  return instance;
};

export default useAxiosSecure;
