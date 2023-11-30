import { Hero } from "@/components/Hero/Hero";
import { Statistics } from "@/components/Statistics/Statistics";
import { statuses } from "@/utils/themaApi";

export default async function Home() {
  const randomIndex = Math.floor(Math.random() * statuses.length);

  return (
    <main className="flex min-h-screen max-w-[1440px] mx-auto flex-col items-center justify-between px-5">
      <Hero status={statuses[randomIndex]} />
      <Statistics status={statuses[randomIndex]} />
    </main>
  );
}
