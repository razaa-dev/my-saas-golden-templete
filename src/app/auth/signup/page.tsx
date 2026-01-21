import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthForm
          mode="signup"
          title="Create your account"
          description="Enter your details to create a new account and get started"
        />
      </div>
    </div>
  )
}