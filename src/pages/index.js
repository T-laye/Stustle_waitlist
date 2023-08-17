import Button from "@/components/Button";
import Layout from "@/layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToForm = () => {
    router.push("/form");
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div onClick={goToForm}>
          <Button />
        </div>
      </div>
    </Layout>
  );
}
