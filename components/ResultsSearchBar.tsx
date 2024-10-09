"use client";
import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setFromAirport,
  setToAirport,
  setDepartureDate,
  setReturnDate,
} from "@/redux/reducers/flightInputSlice";
import { setOpenTab } from "@/redux/reducers/openTabSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePickerDemo } from "./ui/datePicker";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

export default function ResultsSearchBar({
  openTopSearchBar,
  setOpenTopSearchBar,
}: {
  openTopSearchBar: boolean;
  setOpenTopSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [airports, setAirports] = useState<Airport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [from, setFromLocation] = useState<string | null>(null);
  const [to, setToLocation] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const dispatch = useDispatch();

  const flightInput = useSelector((state: RootState) => state.flightInput);

  function handleAirportSwap() {
    if (from && to) {
      setFromLocation(to);
      setToLocation(from);
    } else if (from) {
      setToLocation(from);
      setFromLocation(null);
    } else if (to) {
      setFromLocation(to);
      setToLocation(null);
    }
  }

  function checkIfSame(from: string | null, to: string | null, startDate: Date | undefined, endDate: Date | undefined) {
    if(from == flightInput.fromAirport.code && to == flightInput.toAirport.code && startDate?.toISOString() == flightInput.departureDate && endDate?.toISOString() == flightInput.returnDate) {
      return true;
    }
    return false;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if(checkIfSame(from, to, startDate, endDate)) {
      openTabSet();
      return;
    }

    if (!from || !to || !startDate || !endDate) {
      toast.warning("Please fill in all the fields");
      return;
    }
    if (from === to) {
      toast.warning("Please select different airports");
      return;
    }
    if (startDate < new Date()) {
      toast.warning("Start date should be greater than today");
      return;
    }

    if (startDate > endDate) {
      toast.warning("End date should be greater than start date");
      return;
    }

    const saveFrom = airports?.find((airport) => airport.code === from);
    const saveTo = airports?.find((airport) => airport.code === to);

    if (!saveFrom || !saveTo) {
      toast.warning("Selected airports not found");
      return;
    }

    dispatch(setFromAirport(saveFrom));
    dispatch(setToAirport(saveTo));

    dispatch(setDepartureDate(startDate.toISOString()));
    dispatch(setReturnDate(endDate.toISOString()));

    openTabSet();
  }

  useEffect(() => {
    async function fetchAirports() {
      setLoading(true);
      try {
        const response = await fetch("/api/airports");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch airports");
        }

        setAirports(data.data);
      } catch (error) {
        toast.error("Server error! Please try again later.");
        console.error(`Error fetching airports: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchAirports();
  }, []);

  function openTabSet() {
    setOpenTopSearchBar(false);
    dispatch(setOpenTab(false));
  }

  useEffect(() => {
    async function setPrevDetails() {
      setFromLocation(flightInput.fromAirport.code);
      setToLocation(flightInput.toAirport.code);
      setStartDate(new Date(flightInput.departureDate));
      setEndDate(new Date(flightInput.returnDate));
    }
    setPrevDetails();
  }, [airports, flightInput]);

  return (
    <div
      className={`${
        openTopSearchBar ? "top-0" : "-top-52"
      }  bg-white w-screen z-20 flex items-center justify-center h-[200px] fixed ease-in-out duration-300`}
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex gap-3 items-center flex-wrap">
          <Select value={from ?? ""} onValueChange={setFromLocation}>
            <SelectTrigger className="w-[220px] h-12">
              <SelectValue placeholder="Where from?" />
            </SelectTrigger>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) :  (
                airports &&
                airports.map((airport: Airport, index: number) => (
                  <SelectItem key={index} value={airport.code}>
                    <span className="font-semibold">{airport.code}</span>,{" "}
                    <span>{airport.name}</span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <button
            type="button"
            className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-100"
            onClick={handleAirportSwap}
          >
            <LiaExchangeAltSolid />
          </button>

          <Select value={to ?? ""} onValueChange={setToLocation}>
            <SelectTrigger className="w-[220px] h-12">
              <SelectValue placeholder="Where To?" />
            </SelectTrigger>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) :  (
                airports &&
                airports.map((airport: Airport, index: number) => (
                  <SelectItem key={index} value={airport.code}>
                    <span className="font-semibold">{airport.code}</span>,{" "}
                    <span>{airport.name}</span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <DatePickerDemo
            date={startDate}
            setDate={setStartDate}
            title={"Departure"}
          />
          <DatePickerDemo
            date={endDate}
            setDate={setEndDate}
            title={"Return"}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="bg-green-p flex items-center gap-4 px-10 hover:bg-green-950"
            type="submit"
          >
            <IoSearchOutline className="text-[14px]" />
            <span>Search flights</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
