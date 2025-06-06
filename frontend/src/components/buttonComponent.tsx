import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';


interface CustomButtonProps {
  url?: string;
  onClick?: () => void;
}
export function CustomButton(props : CustomButtonProps) {

  return (
    
    <div className="flex flex-wrap items-center gap-2 md:flex-row justify-center">
      <Button variant={"destructive"}> 


        <Link to={props.url ?? "/main"} >
           Get Started 
          </Link>
       
         </Button>
    </div>
  )
}
