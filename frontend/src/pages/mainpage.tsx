
import ScatterText from "@/components/splitTextScatterComponent"
import { CustomButton } from "@/components/buttonComponent"
function MainApp() {
  

  return (
    <>
   <div className="flex flex-col items-center justify-center h-screen">
   
  
     <ScatterText />
  
   <div className='m-10 p-10'>

      <CustomButton /> 
       </div>
      </div>
    </>
  )
}

export default MainApp
