import FlightsShadowList from "./FlightsShadowList";
import FlightListNames from "./FlightListNames";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function FlightsList() {
  const [flightsDetails, setFlightsDetails] = useState<FlightData[] | null>(null);
  const [currentAirports, setCurrentAirports] = useState<Airport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const flightInput = useSelector((state: RootState) => state.flightInput);

  useEffect(() => {
    async function getFlightsDetails(){
      setLoading(true);
      try {
          const response = await fetch("/api/flights");
          const data = await response.json();


          if (!response.ok) {
            throw new Error("Failed to fetch flights");
          }

          setFlightsDetails(data.data);
      } catch (error) {
        toast.error("Server error. Please refresh page");
        console.error("Error while fetching flights details", error);
      } finally{
        setTimeout(()=>{
          setLoading(false);
        }, 3500)
      }
    }
    function getCurrentAirports(){
      setCurrentAirports([flightInput.fromAirport, flightInput.toAirport]);
    }
    getFlightsDetails();
    getCurrentAirports();

  }, [flightInput]);

  return <>{loading ? <FlightsShadowList /> : <FlightListNames flightsDetails={flightsDetails} currentAirports={currentAirports} />}</>;
}
