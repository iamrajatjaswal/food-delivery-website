import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be atleast 8 characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <br />
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
            type="password"
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-red-500 block mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="w-full mt-5">
          <span
            className={`${styles.label} py-2 text-[#4740ca] block text-right cursor-pointer`}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account?
        </h5>
      </form>
    </div>
  );
};

export default Login;
