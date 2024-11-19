import Section from "@/components/common/Section";
import Quiz from "@/components/Quiz/Quiz";
import Header from "@/components/common/Layout/Header";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen ">
      <Header />
      <Section className="mx-auto w-full h-full flex items-center justify-center py-12 lg:py-20">
        <Quiz />
      </Section>
    </div>
  );
}
