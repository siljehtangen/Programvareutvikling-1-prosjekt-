"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@mui/material"
import { Label } from "@radix-ui/react-label"
import React, { FormEvent, useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

 
export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const [priceClass, setPriceClass] = React.useState<string | null>(null);
  const [continent, setContinent] = React.useState<string | null>(null);
  const [temperature, setTemperature] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      updateSearchParams("search", searchTerm ?? "")
  }

  // Effect to update priceClass based on searchParams
  useEffect(() => {
    const priceClassParam = searchParams.get('priceClass');
    if (typeof priceClassParam === "string" && priceClass === null) {
      setPriceClass(priceClassParam)
    }
    const temperatureParam = searchParams.get('temperature');
    if (temperature !== temperatureParam) {
      setTemperature(temperatureParam)
    }
    const contParam = searchParams.get('continent');
    if (continent !== contParam) {
      setContinent(contParam)
    }
    const searchTermParam = searchParams.get('search');
    if (searchTerm !== searchTermParam) {
      setSearchTerm(searchTermParam)
    }
  }, [searchParams]); 

  useEffect(() => {
    if (priceClass !== null) {
      updateSearchParams("priceClass", priceClass);
    }
  }, [priceClass]);

  useEffect(() => {
    if (temperature !== null) {
      updateSearchParams("temperature", temperature);
    } 
  }, [temperature]);

  useEffect(() => {
    if (continent !== null) {
      updateSearchParams("continent", continent);
    }
  }, [continent]);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(()=>{
    setIsDark(theme === "dark")
  }, [theme])

  return (
      <div className="flex flex-col items-center justify-center w-full">
        <form data-testid="search-form" className="flex justify-center mb-4 w-[300px]" onSubmit={handleSubmit}>
            <Input value={searchTerm ?? ""} onChange={(e) => setSearchTerm(e.target.value)} data-testid="search-input" type="text" placeholder="Søk..." className={!isDark ? "bg-white" : undefined}/>
            <Button type="submit">Søk</Button>
        </form>
        <div className = "flex mb-6 gap-4">
              <Select value={priceClass ?? ""} onValueChange={(value)=>setPriceClass(value !== "none" ? value : "")}>
              <SelectTrigger className={!isDark ? "bg-white" : undefined}>
                <SelectValue placeholder="Prisklasse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">(Ingen valgt)</SelectItem>
                <SelectItem value="$">$</SelectItem>
                <SelectItem value="$$">$$</SelectItem>
                <SelectItem value="$$$">$$$</SelectItem>
                <SelectItem value="$$$$">$$$$</SelectItem>
              </SelectContent>
            </Select>
              <Select value={continent ?? ""} onValueChange={(value)=>setContinent(value !== "none" ? value : "")}>
              <SelectTrigger data-testid="continent-select" className={!isDark ? "bg-white" : undefined}>
                <SelectValue placeholder="Verdensdel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">(Ingen valgt)</SelectItem>
                <SelectItem value="Afrika">Afrika</SelectItem>
                <SelectItem value="Antarktis">Antarktis</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europa">Europa</SelectItem>
                <SelectItem value="Nord-Amerika">Nord-Amerika</SelectItem>
                <SelectItem value="Oseania">Oseania</SelectItem>
                <SelectItem value="Sør-Amerika">Sør-Amerika</SelectItem>
              </SelectContent>
            </Select>
            <Label className="sr-only">
                Temperatur
              </Label>
              <Select value={temperature ?? ""} onValueChange={(value)=>setTemperature(value !== "none" ? value : "")}>
              <SelectTrigger className={!isDark ? "bg-white" : undefined}>
                <SelectValue placeholder="Temperatur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">(Ingen valgt)</SelectItem>
                <SelectItem value="1">-10°C eller kaldere</SelectItem>
                <SelectItem value="2">-10°C - 0°C</SelectItem>
                <SelectItem value="3">0°C - 10°C</SelectItem>
                <SelectItem value="4">10°C - 20°C</SelectItem>
                <SelectItem value="5">20°C - 30°C</SelectItem>
                <SelectItem value="6">30°C eller varmere</SelectItem>
              </SelectContent>
            </Select>
        </div>
    </div>
  )
}