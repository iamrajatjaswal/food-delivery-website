import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/src/graphql/actions/login.action";

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [login, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Forgot your password?</h1>
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
        <br />
        <br />
        <input
          type="submit"
          value="Submit"
          disabled={isSubmitting}
          className={`${styles.button} mt-3`}
        />

        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Or go back to
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default ForgotPassword;
