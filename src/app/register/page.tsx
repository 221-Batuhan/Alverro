"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="container-page py-12 max-w-md">
      <h1 className="heading-serif text-2xl mb-6">Create Account</h1>
      <form
        onSubmit={handleSubmit(async (values) => {
          setOk(null); setErr(null);
          const res = await fetch("/api/register", { method: "POST", body: JSON.stringify(values) });
          if (!res.ok) { setErr("Failed to register"); return; }
          setOk("Account created. You can sign in now.");
        })}
        className="space-y-4"
      >
        <div>
          <label className="text-sm">Name</label>
          <input className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600 mt-1">{String(errors.name.message)}</p>}
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-600 mt-1">{String(errors.email.message)}</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" type="password" {...register("password")} />
          {errors.password && <p className="text-xs text-red-600 mt-1">{String(errors.password.message)}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full rounded-full bg-foreground text-background py-3">Create</button>
        {ok && <p className="text-green-700 text-sm">{ok}</p>}
        {err && <p className="text-red-700 text-sm">{err}</p>}
      </form>
    </div>
  );
}


