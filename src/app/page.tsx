import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full text-center">
      <div className="flex flex-col p-5 bg-accent shadow-md shadow-accent rounded-lg border border-primary w-full max-w-[400px]">
        <span className="font-bold text-[23px] text-primary">Hello, Congratulations ! 🥳 </span>
        <span className="text-[13px]">If you see this, your app is working.</span>
        <div className="flex mt-5 mb-2">
          <Button variant={"default"} className="text-[13px] h-8 mx-auto">Sign In Here</Button>
        </div>
      </div>
    </div>
  )
}

export default Home