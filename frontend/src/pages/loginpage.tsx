import { LoginForm } from "@/components/login-form"
import Footer from "@/components/footerComponent"
import { NavbarComponent } from "@/components/navbarComponent"
export default function LoginPage() {
  return (
    <>
    <NavbarComponent />
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* <div className="w-full max-w-sm"> */}
        <LoginForm />
      {/* </div> */}
    </div>
    <Footer />
    </>
  )
}
