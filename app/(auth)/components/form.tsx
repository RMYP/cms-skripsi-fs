"use client";

import { useState } from "react";
import { login, register } from "../action/index";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, registerSchema } from "../schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ErrorForm from "../components/errorForm";

import * as z from "zod";

export function TestLoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginSchema>) => {
    try {
      const data = await login(value);
      if (data.success == false) {
        setError(data.message);
        return;
      }
      setCookie("_token", data.data._token, {
        maxAge: 60 * 60 * 24,
      });

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }else{
        setError("Unexpected Error, please try again")
        console.log(err)
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="py-4 w-full">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </form>
      {error && <ErrorForm message={error} />}
    </Form>
  );
}

export function TestRegisterForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof registerSchema>) => {
    try {
      const data = await register(value);
      if (data.status == "404") {
        setError(data.message);
        return;
      }

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }else{
        setError("Unexpected Error, please try again")
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pb-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="username" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="py-4 w-full">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </form>
      {error && <ErrorForm message={error} />}
    </Form>
  );
}
