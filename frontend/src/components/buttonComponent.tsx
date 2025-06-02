import { Button } from "@/components/ui/button"

export function CustomButton() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row justify-center">
      <Button variant={"destructive"}> Get Started </Button>
    </div>
  )
}
