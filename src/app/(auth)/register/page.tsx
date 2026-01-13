"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InputGroup } from "@/components/ui/input-group";
import { registerAction } from "../actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if (state?.success) {
      redirect("/login");
    }
  }, [state?.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 shadow-sm rounded-xl p-8 mx-auto w-full max-w-sm"
    >
      <div className="space-y-2 text-center text-sm md:text-base">
        <h1 className="text-3xl font-bold">Register</h1>
        <p>Buat akun untuk posting.</p>
      </div>

      {state?.message && !state.success && (
        <span className="bg-danger-secondary text-danger-primary border-l-4 border-danger-primary p-4 rounded-md text-sm md:text-base">
          {state.message}
        </span>
      )}

      <InputGroup>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Your name" />
        {!state?.success && state?.errors?.name && (
          <span className="text-danger-primary text-xs">
            {typeof state.errors.name === "string"
              ? state.errors.name
              : state.errors.name.errors[0]}
          </span>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          type="username"
          name="username"
          id="username"
          placeholder="Your username"
        />
        {!state?.success && state?.errors?.username && (
          <span className="text-danger-primary text-xs">
            {typeof state.errors.username === "string"
              ? state.errors.username
              : state.errors.username.errors[0]}
          </span>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Your email" />
        {!state?.success && state?.errors?.email && (
          <span className="text-danger-primary text-xs">
            {typeof state.errors.email === "string"
              ? state.errors.email
              : state.errors.email.errors[0]}
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
            {typeof state.errors.password === "string"
              ? state.errors.password
              : state.errors.password.errors[0]}
          </span>
        )}
      </InputGroup>

      <Button
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={pending}
      >
        Register
      </Button>

      <div className="text-center text-sm">
        <p>
          Sudah punya akun?{" "}
          <Link href="/login" className="text-link font-medium">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
