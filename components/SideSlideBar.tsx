import { FaArrowLeft, FaRegCircle } from "react-icons/fa6";
import { LuClock9 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { setOpenTab } from "@/redux/reducers/openTabSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function SideSlideBar({
  setOpenSideBar,
  openSideBar,
}: {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  openSideBar: boolean;
}) {
  const flightInput = useSelector((state: RootState) => state.flightInput);
  const [currDate, setCurrDate] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const date = formatDate(flightInput.departureDate);
    setCurrDate(date);
  }, [flightInput.departureDate]);

  function openTabSet() {
    setOpenSideBar(false);
    dispatch(setOpenTab(false));
  }

  return (
    <div
      className={`${
        openSideBar ? "right-0" : "-right-[50rem]"
      } w-1/2 h-full bg-transparent fixed top-0 z-20 py-4 px-4 ease-in-out duration-500`}
    >
      <div className="w-full h-full bg-white rounded-lg flex flex-col py-4 px-6 shadow-md overflow-hidden">
        <div>
          <button
            type="button"
            className="h-8 w-8 text-sm rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            onClick={openTabSet}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="py-6 border-b border-gray-200">
          <p className="font-semibold text-xl">Flight details</p>
        </div>

        <div className="w-full flex flex-col mt-6">
          <div className="flex items-center text-gray-400 text-[12px] gap-2">
            <FaRegCircle />
            <p>
              {currDate}
              {" . "}
              {"2:15"}
            </p>
          </div>
        </div>

        <div className="flex justify-between ml-1.5 my-1 border-l-2 border-black">
          <div className="font-semibold text-sm">
            <p className="ml-3">DXB. Dubai International Airport</p>
          </div>
          <div className="flex w-[225px] gap-1">
            <div>
              <Image
                src="/lufthansa.png"
                alt="Lufthansa"
                width={30}
                height={30}
                className="inline"
              />
            </div>
            <div className="text-gray-400 text-sm">
              <p>Saudi Arabian Airlines.Sv553</p>
              <p>Economy.A330</p>
              <p>Flight time 3h 45m</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex items-center text-gray-400 text-[12px] gap-2">
            <FaRegCircle />
            <p>
              {currDate}
              {" . "}
              {"2:15"}
            </p>
          </div>
        </div>

        <div className="my-1 flex justify-between h-[150px] ml-1.5 border-l-2 border-gray-500 border-dashed">
          <div className="w-[250px] flex flex-col">
            <div>
              <p className="ml-3 font-semibold text-sm">
                RHU.King Khalid International Airport
              </p>
            </div>
            <div className="flex items-center justify-center h-full text-gray-400 text-[12px] gap-2">
              <LuClock9 />
              <p>Layover 2h 25m</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex items-center text-gray-400 text-[12px] gap-2">
            <FaRegCircle />
            <p>
              {currDate}
              {" . "}
              {"2:15"}
            </p>
          </div>
        </div>

        <div className="flex justify-between ml-1.5 my-1 border-l-2 border-black">
          <div className="font-semibold w-[250px] text-sm">
            <p className="ml-3">RHU.King Khalid International Airport</p>
          </div>
          <div className="flex w-[225px] gap-1">
            <div>
              <Image
                src="/lufthansa.png"
                alt="Lufthansa"
                width={30}
                height={30}
                className="inline"
              />
            </div>
            <div className="text-gray-400 text-sm">
              <p>Saudi Arabian Airlines.Sv553</p>
              <p>Economy.A330</p>
              <p>Flight time 3h 45m</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex items-center text-gray-400 text-[12px] gap-2">
            <FaRegCircle />
            <p>
              {currDate}
              {" . "}
              {"2:15"}
            </p>
          </div>
        </div>

        <div className="flex justify-between ml-1.5 my-1">
          <div className="font-semibold w-[250px] text-sm">
            <p className="ml-3">RHU.King Khalid International Airport</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();

  return `${dayOfWeek} ${day} ${month}`;
}
