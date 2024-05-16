'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false })
      toast({
        title: 'Magic link sent',
        description: 'Check your e-mail for the magic link to login'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occured. Please try again.'
      })
    }
  })

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sign in with a magic link</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email address below and we&apos;ll send you a magic link to sign in.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
            </div>
            <Button className="w-full" type="submit">
              Send magic link
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}