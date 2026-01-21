import { AuthForm } from '@/components/auth/auth-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthForm
          mode="login"
          title="Sign in to your account"
          description="Enter your email and password to access your dashboard"
        />
      </div>
    </div>
  )
}