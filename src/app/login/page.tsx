"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="container-page py-12 max-w-md">
      <h1 className="heading-serif text-2xl mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit(async (values) => {
          await signIn("credentials", { email: values.email as string, password: values.password as string, callbackUrl: "/account" });
        })}
        className="space-y-4"
      >
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" type="email" {...register("email")} />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" type="password" {...register("password")} />
        </div>
        <button className="w-full rounded-full bg-foreground text-background py-3">Sign In</button>
      </form>
    </div>
  );
}


