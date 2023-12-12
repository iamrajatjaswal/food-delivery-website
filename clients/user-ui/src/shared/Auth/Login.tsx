import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/src/graphql/actions/login.action";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be atleast 8 characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({
  setActiveState,
  setOpen,
}: {
  setActiveState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  const [login, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const response = await login({
        variables: loginData,
      });
      console.log(response, "======>response");

      if (response.data.login.user) {
        toast.success("Login successful!");
        Cookies.set("access_token", response.data.login.accessToken);
        Cookies.set("refresh_token", response.data.login.refreshToken);
        setOpen(false);
        reset();
        window.location.reload();
      } else {
        toast.error(response.data.login.error.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Login with Code Academy</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="email" className={`${styles.label}`}>
            Enter your Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="loginmail@gmail.com"
            className={`${styles.input}`}
          />
          {errors.email && (
            <span className="text-red-500 block mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your Password
          </label>
          <input
            {...register("password")}
            type={!show ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(!show)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(!show)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500 mt-1">{errors.password.message}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
            onClick={() => setActiveState("ForgotPassword")}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Signup")}
          >
            Sign Up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
