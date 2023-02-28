import { type NextPage } from "next";
import Head from "next/head";
import Sidebar from "~/Components/Sidebar";
import ViewPort from "~/Components/ViewPort";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="h-screen w-screen bg-primary text-custom1">
      <Head>
        <title>Example Application</title>
      </Head>
      <div className="grid grid-cols-[1fr_5fr]">
        <Sidebar />
        <div className="h-full">
          <ViewPort />
        </div>
      </div>
    </div>
  );
};

export default Home;
