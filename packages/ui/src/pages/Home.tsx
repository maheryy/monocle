import Grid from "@/components/Grid/Grid";
import Card from "@/components/Cards/CardStat";

const Home = () => {
  return (
    <>
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-5 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Dashboard
            </h2>
            <Card
              views={12}
              title="Guide Views"
              percentage={25}
              darkMode={false}
            />
            <Grid />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
