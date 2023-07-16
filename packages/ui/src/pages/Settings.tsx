import DynamicGrid from "@/components/Grid/DynamicGrid";

const Settings = () => {
  return (
    <>
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-5 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Settings
            </h2>
            <DynamicGrid />
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
