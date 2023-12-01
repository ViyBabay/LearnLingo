import Header from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import Modal from "@/components/Modal/Modal";
import { Statistics } from "@/components/Statistics/Statistics";
import { statuses } from "@/utils/themaApi";

interface HomeProps {
  searchParams: any;
}

export default async function Home({ searchParams }: HomeProps) {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  const showLogin = searchParams?.login;
  const showRegistration = searchParams?.registration;

  return (
    <>
      <Header status={status} />
      <main className="flex min-h-screen max-w-[1440px] mx-auto flex-col items-center justify-between px-5">
        <Hero status={status} />
        <Statistics status={status} />
        {showLogin && <Modal>modal login</Modal>}
        {showRegistration && <Modal>modal Register</Modal>}
      </main>
    </>
  );
}
