import { useAuthContext } from '@/context/AuthContext';
import { useAdminLogin } from '@/lib/Auth/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiLock, FiLogIn } from 'react-icons/fi';
import { LuEyeOff } from 'react-icons/lu';
import { z } from 'zod';
import { Newspaper } from 'lucide-react';
import { signInSchema } from '@/lib/Auth/auth';

type SignInFormValues = z.infer<typeof signInSchema>;

interface DecodedToken extends JwtPayload {
  role: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: signIn, isError, isPending } = useAdminLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const { setUser, setIsAuthenticated, setToken } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res = await signIn({
        phoneNumber: values.phoneNumber,
        password: values.password,
      });

      setUser(jwtDecode(res.data.token.accessToken || ''));
      setToken(res.data?.token);
      setIsAuthenticated(true);

      const decoded = jwtDecode<DecodedToken>(res.data.token.accessToken || '');
      const role = decoded.role;

      if (role === 'ADMIN') {
        window.location.href = '/dashboard';
      }
      if (role === 'CUSTOMER') {
        window.location.href = '/customer/dashboard';
      }
    } catch {
      // error shown via isError
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto w-full max-w-md px-4 py-8">
        <div
          className={`w-full transform transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
              Sign In
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Sign in to your account
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <div className="group/input relative">
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    {...register('phoneNumber')}
                    className={`w-full rounded-lg border bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 ${
                      errors.phoneNumber
                        ? 'border-red-300 focus:border-red-500 focus:bg-white'
                        : 'border-slate-200 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="group/input relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={`w-full rounded-lg border bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 ${
                      errors.password
                        ? 'border-red-300 focus:border-red-500 focus:bg-white'
                        : 'border-slate-200 focus:border-blue-500 focus:bg-white'
                    } pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-600">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {isError && (
                <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                  <p className="text-center text-sm font-medium text-red-600">
                    Invalid phone number or password. Please try again.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending || isSubmitting}
                className="relative w-full transform overflow-hidden rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  {isPending || isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <FiLogIn size={18} />
                      <span>Sign In</span>
                    </>
                  )}
                </span>
              </button>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 NewsPortal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;