"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InputGroup } from "@/components/ui/input-group";
import { loginAction } from "../actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      redirect("/");
    }
  }, [state?.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 shadow-sm rounded-xl p-8 mx-auto w-full max-w-sm"
    >
      <div className="space-y-2 text-center text-sm md:text-base">
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Masuk untuk mengakses akun.</p>
      </div>

      {state?.message && !state.success && (
        <span className="bg-danger-secondary text-danger-primary border-l-4 border-danger-primary p-4 rounded-md text-sm md:text-base">
          {state.message}
        </span>
      )}

      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" id="email" placeholder="Your email" />
        {!state?.success && state?.errors?.email && (
          <span className="text-danger-primary text-xs">
            {state.errors.email?.errors[0]}
          </span>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
        />
        {!state?.success && state?.errors?.password && (
          <span className="text-danger-primary text-xs">
            {state.errors.password?.errors[0]}
          </span>
        )}
      </InputGroup>

      <div className="text-right text-sm">
        <Link href="/coming-soon" className="text-link font-medium">
          Lupa password?
        </Link>
      </div>

      <Button
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={pending}
      >
        Login
      </Button>

      <div className="text-center text-sm">
        <p>
          Belum punya akun?{" "}
          <Link href="/register" className="text-link font-medium">
            Daftar di sini
          </Link>
        </p>
      </div>
    </form>
  );
}
