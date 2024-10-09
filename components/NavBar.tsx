import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenTab } from "@/redux/reducers/openTabSlice";
import { RootState } from "@/redux/store";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';

export default function NavBar({
  setOpenTopSearchBar,
}: {
  setOpenTopSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentAirports, setCurrentAirports] = useState<Airport[]>([]);
  const [scheduleDates, setScheduleDates] = useState<string[]>([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const flightInput = useSelector((state: RootState) => state.flightInput);

  useEffect(() => {
    function getCurrentAirports() {
      setCurrentAirports([flightInput.fromAirport, flightInput.toAirport]);
    }

    function getScheduleDates() {
      const start = extractDateAndMonthName(flightInput.departureDate);
      const end = extractDateAndMonthName(flightInput.returnDate);
      setScheduleDates([
        start.monthName + " " + start.date,
        end.monthName + " " + end.date,
      ]);
    }
    getCurrentAirports();
    getScheduleDates();
  }, [
    flightInput.fromAirport,
    flightInput.toAirport,
    flightInput.departureDate,
    flightInput.returnDate,
  ]);

  function openTabSet() {
    setOpenTopSearchBar(true);
    dispatch(setOpenTab(true));
  }

  return (
    <>
      {currentAirports.length > 0 && (
        <nav className="flex items-center w-full justify-between h-24 fixed px-56 bg-white z-10 border-b border-gray-200">
          <div className="border border-gray-200 rounded-full py-2 flex items-center flex-wrap">
            <div className="border-r border-gray-200 px-4 overflow-hidden whitespace-nowrap text-ellipsis w-[15rem] ml-2">
              <span className="font-semibold">{currentAirports[0].code} </span>
              <span className="text-gray-500">{currentAirports[0].name}</span>
            </div>
            <div className="border-r border-gray-200 px-4 overflow-hidden whitespace-nowrap text-ellipsis w-[15rem]">
              <span className="font-semibold">{currentAirports[1].code} </span>
              <span className="text-gray-500">{currentAirports[1].name}</span>
            </div>

            <div className="flex pr-6 border-r border-gray-200 px-4">
              <span className="font-semibold">
                {scheduleDates[0]}
                {" - "}
                {scheduleDates[1]}
              </span>
            </div>

            <button
              type="button"
              className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-300 mr-2 ml-4"
              onClick={openTabSet}
            >
              <IoSearchOutline className="text-[18px]" />
            </button>
          </div>
          <div>
            <button
              type="button"
              className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-300"
              onClick={()=> router.push('/')}
            >
              <RxCross2 />
            </button>
          </div>
        </nav>
      )}
    </>
  );
}

function extractDateAndMonthName(dateString: string): {
  date: number;
  monthName: string;
} {
  const dateObject = new Date(dateString);

  const date = dateObject.getDate();

  const monthName = dateObject.toLocaleString("default", { month: "short" });

  return { date, monthName };
}
