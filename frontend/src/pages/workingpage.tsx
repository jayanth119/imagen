import { NavbarComponent } from '@/components/navbarComponent';
import { SkeletonCard
    
 } from '@/components/skeletonComponent';
 import { InputComponent } from '@/components/inputComponent';
function WorkingPage() {
  

  return (
    <>

    {/* <ScrollTriggered />
    <MainApp /> */}
    {/* <DisplayImagesPage /> */}
    {/* <LoginPage />
    <RegisterPage /> */}
   <NavbarComponent />
      <SkeletonCard />
   <InputComponent />


    </>
  );
}

export default WorkingPage
