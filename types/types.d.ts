interface Airport {
  name: string;
  city: string;
  code: string;
  country: string;
}

interface FlightInput {
  fromAirport: Airport;
  toAirport: Airport;
  departureDate: string;
  returnDate: string;
}

interface FlightData {
  id: number;
  flight1: Flight;
  flight2:Flight;
  price: string; // Price of the flights
}

interface Flight {
  airline: string;
  code: string;
  time: string;
  duration: string;
  type: string;
  image: string;
  dayAddition?: string | null;
}
