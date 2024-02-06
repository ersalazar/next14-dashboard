"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "demo@gmail.com",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const apiHost = process.env.api_host;
      const apiPort = process.env.api_port;
      const apiUrl = `http://${apiHost}:${apiPort}/login`; 
      // Send the request directly in the onSubmit function
      alert(apiUrl);
      const response = await axios.post(apiUrl, data);
      console.log('Login successful:', response.data);
      alert(response.data);
    } catch (error) {
      const e = error as AxiosError;
      console.error('Login failed:', e.message);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingrese su correo..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese su contraseña..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? "Cargando..." : "Ingesar"}
          </Button>
        </form>
      </Form>
    {/*
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    */}
    </>
  );
}
