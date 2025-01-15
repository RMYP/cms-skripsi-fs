"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { updatePassword } from "../action";
import SuccessUpdate from "./success";
import FailUpdate from "./fail";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    validatePassword: z.string().min(8),
  })
  .superRefine(({ validatePassword, password }, ctx) => {
    if (validatePassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["validatePassword"],
      });
    }
  });

interface Account {
  id: string;
  email: string;
  user: string;
  token: string;
}

export default function AccountForm({ user }: { user: Account }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const [isError, setIsError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      validatePassword: "",
    },
  });

  useEffect(() => {
    const submitForm = async () => {
      if (isSubmitted) {
        const data = form.getValues();

        const values = {
          params: user.id,
          password: data.password,
          token: user.token,
        };

        try {
          const response = await updatePassword(values);
          if (response.status == "200") {
            setIsSuccess(response.message);
            
          } else {
            setIsError(response.message);
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setIsError(err.message);
          }
          console.error(err);
        }
      }
    };

    submitForm();
  }, [isSubmitted, form, user]);

  const onSubmit = async () => {
    const isValid = await form.trigger(); 
    if (isValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-white p-3 rounded-sm">
      <div className="bg-zinc-800 rounded-t-lg p-2 flex justify-center my-4">
        <p className="text-md text-white">Reset Password</p>
      </div>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  *Masukan password baru.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validatePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  *Konfirmasi password baru.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={onSubmit}>
            Submit
          </Button>
        </form>
      </Form>
      {isSuccess && <SuccessUpdate message={isSuccess} />}
      {isError && <FailUpdate message={isError} />}
    </div>
  );
}
