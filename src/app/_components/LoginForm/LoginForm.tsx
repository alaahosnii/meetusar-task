"use client"
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Id, toast } from 'react-toastify';
import { loginUser, resetLoginError } from '@/app/_redux/slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/_redux/store';
import { FormError, LoginData } from '@/app/_types/productTypes';
import Image from 'next/image';


function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const { loginError, isLoginLoading , isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [id, setId] = useState<Id>();
  if (isLoginLoading) {
    console.log("loading");
  }

  useEffect(() => {
    dispatch(resetLoginError());

  }, [dispatch])
  useEffect(() => {
    if (isLoginLoading) {
      const idd: Id = toast.loading("Loading...");
      setId(idd);
    }
  }, [isLoginLoading, dispatch]);

  useEffect(() => {
    if (loginError) {
      console.log("loginError", loginError.message);

      toast.update(
        id!,
        {
          render: loginError.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      )
    }


  }, [loginError]);
  useEffect(() => {
    if (isLoggedIn && id) {
      toast.dismiss(id);
      toast.success("Login successful, redirecting to dashboard...", {
        autoClose: 3000,
        onClose: () => {
          navigate.replace("/");
        }
      });
    }
  }, [isLoggedIn, navigate, id]);
  const loginData: LoginData = {
    email: "",
    password: ""
  }
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-1 w-[60%] items-center'>
        <h2 className='lg:text-[51px] text-3xl font-[400]'>Welcome back</h2>
        <div className='w-[100%]'>
          <p className='text-[18px] font-[400] text-[rgba(98,98,107,1)] text-center'>Step into our shopping metaverse for an unforgettable shopping experience</p>
        </div>
        <Formik
          initialValues={loginData}
          validate={values => {
            const errors: FormError = {};

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required'
            } else if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters long'
            }

            return errors;
          }}
          onSubmit={(values) => {
            dispatch(loginUser(values));
            values.email = "";
            values.password = "";
          }}
          validateOnChange={false}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldError,
            /* and other goodies */
          }) => (
            <form className='flex flex-col w-full' onSubmit={handleSubmit}>
              <div className='mt-3 flex flex-col gap-3'>
                <TextField
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  name="email"
                  disabled={isLoginLoading}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.email) {
                      setFieldError('email', undefined);
                    }
                    if (loginError) {
                      dispatch(resetLoginError());
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid white',
                        borderRadius: '10px',
                        helperText: 'Email is required',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src="/email_icon.png"
                          alt="email"
                          width={24}
                          height={24}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  disabled={isLoginLoading}
                  value={values.password}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.password) {
                      setFieldError('password', undefined);
                    }
                    if (loginError) {
                      dispatch(resetLoginError());
                    }
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid white',
                        borderRadius: '10px',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src="/password_icon.png"
                          alt="password"
                          width={24}
                          height={24}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {loginError && <p className='text-red-500 mb-3 mt-3'> {loginError.message} </p>}
              <button
                type='submit'
                disabled={!values.email || !values.password || isLoginLoading}
                className={`${!loginError && 'mt-5'} hover:opacity-90 active:opacity-100 transition-opacity bg-[#9414FF] text-white rounded-lg h-[43px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>

    </div>
  );
}

export default LoginForm