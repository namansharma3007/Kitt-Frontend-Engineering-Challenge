import LoadingCard from "./LoadingCard";

export default function FlightsShadowList() {
  return (
    <div className="w-full mt-32  px-24 flex flex-col items-center gap-4">
      <SkeletonLoadingFlightsTab />
      <SkeletonLoadingFlightsTab />
      <SkeletonLoadingFlightsTab />
      <LoadingCard/>
    </div>
  );
}

function SkeletonLoadingFlightsTab() {
  return (
    <div className="border border-gray-100 w-4/5 h-44 rounded-lg py-4 px-10 flex flex-col justify-between">
      <div className="flex gap-10 items-center">
        <div className="rounded-lg bg-gray-100 h-12 w-12 animate-pulse"></div>
        <div className="flex gap-4 w-full flex-col">
          <div className="w-3/5 h-3 rounded-lg bg-gray-100 animate-pulse"></div>
          <div className="w-4/5 h-3 rounded-lg bg-gray-100 animate-pulse"></div>
        </div>
      </div>

      <div className="flex gap-10 items-center">
        <div className="rounded-lg bg-gray-100 h-12 w-12 animate-pulse"></div>
        <div className="flex gap-4 w-full flex-col">
          <div className="w-3/5 h-3 rounded-lg bg-gray-100 animate-pulse"></div>
          <div className="w-4/5 h-3 rounded-lg bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
