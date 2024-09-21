import { Button } from "./ui/button";
import {
  PlusIcon,
} from "@radix-ui/react-icons"
import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";

function AddDestinationButton() {

    const pathname = usePathname()
    const hideButton = pathname === '/legg-til-destinasjon';

    const handleClick = () => {
        // Update the state to hide the button
        console.log(pathname)
      };

  return (
    <div>
      {!hideButton && (
        <Button onClick={handleClick}>
          Ny destinasjon<PlusIcon  className="ml-2 w-5 h-5"/>
        </Button>
      )}
    </div>
  );
}

export default AddDestinationButton;