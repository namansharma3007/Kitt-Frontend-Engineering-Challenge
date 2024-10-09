import Image from "next/image";
import { Button } from "./ui/button";
import SideSlideBar from "./SideSlideBar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenTab } from "@/redux/reducers/openTabSlice";

export default function FlightListNames({
  flightsDetails,
  currentAirports,
}: {
  flightsDetails: FlightData[] | null;
  currentAirports: Airport[] | null;
}) {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const dispatch = useDispatch();

  
  function openTabSet() {
    setOpenSideBar(true);
    dispatch(setOpenTab(true));
  }

  return (
    <>
      {flightsDetails && currentAirports ? (
        <div className="w-full mt-32 px-24 flex flex-col items-center gap-4 relative mb-6">
          <div className="flex w-4/5">
            <p className="text-gray-400">Showing 356 of 767 results</p>
          </div>
          {flightsDetails.map((flight) => (
            <FlightsDetails
              key={flight.id}
              flight1={flight.flight1}
              flight2={flight.flight2}
              price={flight.price}
              currentAirports={currentAirports}
              openTabSet={openTabSet}
            />
          ))}

          <SideSlideBar
            setOpenSideBar={setOpenSideBar}
            openSideBar={openSideBar}
          />
        </div>
      ) : null}
    </>
  );
}

function FlightsDetails({
  flight1,
  flight2,
  price,
  currentAirports,
  openTabSet,
}: {
  flight1: any;
  flight2: any;
  price: string;
  currentAirports: Airport[];
  openTabSet: ()=>void;
}) {
  return (
    <div className="border bg-white border-gray-200 w-4/5 h-44 rounded-lg px-8 flex hover:bg-gray-100 ease-in-out">
      <div className="w-4/5 flex flex-col justify-between my-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Image
              src={flight1.image}
              alt="Flight Image"
              width={50}
              height={50}
            />
            <div className="flex flex-col justify-between">
              <p className="text-gray-400 text-sm">
                {flight1.airline}
                {" . "}
                {flight1.code}
              </p>
              <p className="text-lg font-semibold">{flight1.time}</p>
            </div>
          </div>

          <div className="mr-8 w-[240px]">
            <p className="text-gray-400">
              {currentAirports[0].code}
              {" - "}
              {currentAirports[1].code}
            </p>
            <div className="flex justify-between font-semibold leading">
              <p>{flight1.duration}</p>
              <div className="w-[70px]">
                <p>{flight1.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <Image
              src={flight2.image}
              alt="Flight Image"
              width={50}
              height={50}
            />
            <div className="flex flex-col justify-between">
              <p className="text-gray-400 text-sm">
                {flight2.airline}
                {" . "}
                {flight2.code}
              </p>
              <p className="text-lg font-semibold flex gap-2">
                {flight2.time}{" "}
                <span className="text-[10px] text-red-700">
                  {flight2.dayAddition}
                </span>{" "}
              </p>
            </div>
          </div>

          <div className="mr-8 w-[240px]">
            <p className="text-gray-400">
              {currentAirports[0].code}
              {" - "}
              {currentAirports[1].code}
            </p>
            <div className="flex justify-between font-semibold leading">
              <p>{flight2.duration}</p>
              <div className="w-[70px]">
                <p>{flight2.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* partition line */}
      <div className="w-[1px] bg-gray-200 h-full"></div>

      <div className="flex w-1/5">
        <div className="h-full w-full flex flex-col justify-end">
          <div className="ml-3 mb-3 flex flex-col">
            <p className="text-gray-400">from</p>
            <p className="text-xl font-semibold mb-2">{price}</p>
            <Button
              className="bg-green-p flex items-center gap-4 hover:bg-green-950"
              type="button"
              onClick={() => openTabSet()}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
