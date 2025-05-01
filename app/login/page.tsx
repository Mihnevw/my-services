"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"

type View = "login" | "register" | "forgot-password"

export default function LoginPage() {
  const [view, setView] = useState<View>("login")

  const renderForm = () => {
    switch (view) {
      case "register":
        return <RegisterForm onLoginClick={() => setView("login")} />
      case "forgot-password":
        return <ForgotPasswordForm onBackToLogin={() => setView("login")} />
      default:
        return (
          <LoginForm 
            onRegisterClick={() => setView("register")} 
            onForgotPasswordClick={() => setView("forgot-password")}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {renderForm()}
      </div>
    </div>
  )
} 