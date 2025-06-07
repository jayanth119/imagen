import { RegisterForm } from "@/components/register-form"
import Footer from "@/components/footerComponent"
import { NavbarComponent } from "@/components/navbarComponent"

export default function RegisterPage() {
  return (
    <>
    <NavbarComponent />
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
    <Footer />
    </>
  )
}



