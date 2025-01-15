"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  PhoneNum: z.string().min(10).max(15),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      PhoneNum: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value);
  }

  return (
    <div className="w-full bg-white p-3 rounded-sm">
      <div className="bg-zinc-800 rounded-t-lg p-2 flex justify-center mb-4">
        <p className="text-md text-white">Edit Profile</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  *Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PhoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Hp</FormLabel>
                <FormControl>
                  <Input placeholder="08xx-xxxx-xxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PhoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder="08xx-xxxx-xxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* space */}
      <div className="bg-zinc-800 rounded-t-lg p-2 flex justify-center my-4">
        <p className="text-md text-white">Edit Profile</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  *Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PhoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Hp</FormLabel>
                <FormControl>
                  <Input placeholder="08xx-xxxx-xxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PhoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder="08xx-xxxx-xxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Nama baru dapat diubah kembali setelah 30 hari.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
