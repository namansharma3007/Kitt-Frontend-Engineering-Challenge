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
  flight1: {
      airline: string;
      code: string;
      time: string;
      duration: string;
      type: string;
      image: string;
      dayAddition?: string | null; // Optional field for additional day
  };
  flight2: {
      airline: string;
      code: string;
      time: string;
      duration: string;
      type: string;
      image: string;
      dayAddition?: string | null; // Optional field for additional day
  };
  price: string; // Price of the flights
}