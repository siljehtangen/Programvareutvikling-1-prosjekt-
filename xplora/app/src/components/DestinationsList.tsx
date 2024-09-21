import DestinationTile from "./DestinationTile";
import { Destination } from "@/lib/types";

export default function DestinationsList({destinations} : {destinations?: Destination[]}) {
  return (
      destinations && destinations.length>0 
        ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {destinations.map((destination) => (<DestinationTile key={destination._id} {...destination} />))}
          </div>
        : <p className="w-100 text-center">No destinations found with criteria</p>
  );
}
