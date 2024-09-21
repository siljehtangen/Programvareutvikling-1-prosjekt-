import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {CheckIcon, ArrowDownIcon} from "@radix-ui/react-icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Destination } from "@/lib/types";
import { useUserData } from "./providers/UserDataProvider";

const countries: string[] = [
  "Afghanistan", "Albania", "Algerie", "Andorra", "Angola", "Antigua og Barbuda", "Argentina", "Armenia", "Australia", 
  "Østerrike", "Aserbajdsjan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Hviterussland", "Belgia", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia-Hercegovina", "Botswana", "Brasil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Kambodsja", 
  "Kamerun", "Canada", "Kapp Verde", "Den sentralafrikanske republikk", "Tsjad", "Chile", "Kina", "Colombia", "Komorene", 
  "Kongo-Brazzaville", "Kongo-Kinshasa", "Costa Rica", "Elfenbenskysten", "Kroatia", "Kuwait", "Kirgisistan", "Laos", "Latvia", 
  "Libanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Litauen", "Luxembourg", "Madagaskar", "Malawi", "Malaysia", 
  "Maldivene", "Mali", "Malta", "Marshalløyene", "Mauritania", "Mauritius", "Mexico", "Mikronesiaføderasjonen", "Moldova", 
  "Monaco", "Mongolia", "Montenegro", "Marokko", "Mosambik", "Myanmar", "Namibia", "Nauru", "Nepal", "Nederland", "New-Zealand", 
  "Nicaragua", "Niger", "Nigeria", "Nord-Makedonia", "Norge", "Oman", "Pakistan", "Palau", "Palestina", "Panama", 
  "Papua Ny-Guinea", "Paraguay", "Peru", "Filippinene", "Polen", "Portugal", "Qatar", "Romania", "Russland", "Rwanda", 
  "Saint Kitts og Nevis", "Saint Lucia", "Saint Vincent og Grenadinene", "Samoa", "San Marino", "São Tomé og Príncipe", 
  "Saudi-Arabia", "Senegal", "Serbia", "Seychellene", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Salomonøyene", 
  "Somalia", "Sør-Afrika", "Sør-Korea", "Sør-Sudan", "Spania", "Sri Lanka", "Sudan", "Surinam", "Sverige", "Sveits", "Syria", 
  "Tadsjikistan", "Tanzania", "Thailand", "Øst-Timor", "Togo", "Tonga", "Trinidad og Tobago", "Tunisia", "Tyrkia", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraina", "De forente arabiske emirater", "Storbritannia", "USA", "Uruguay", "Usbekistan", "Vanuatu", 
  "Vatikanstaten", "Venezuela", "Vietnam", "Jemen", "Zambia", "Zimbabwe"
];

// Generate JSX elements for countries
const countryElements = countries.map((country) => (
<SelectItem value={country.substring(0, 3)}>{country}</SelectItem>
));


export function AddDestinationForm({destination, adminOnly} : {destination?: Destination, adminOnly?: boolean}) {

  const [title, setTitle] = React.useState(destination?.title ?? "");
  const [country, setCountry] = React.useState(destination?.country ??"");
  const [description, setDescription] = React.useState(destination?.description ?? "");
  const [imgSrc, setImgSrc] = React.useState(destination?.imgSrc ?? "");
  const [activities, setActivities] = React.useState(destination?.activities ?? "");
  const [priceClass, setPriceClass] = React.useState(destination?.priceClass ?? "$");
  const [continent, setContinent] = React.useState(destination?.continent ?? "");
  const [language, setLanguage] = React.useState(destination?.language ?? "");
  const [temperature, setTemperature] = React.useState(destination?.temperature ?? "");
  const [population, setPopulation] = React.useState(destination?.population ?? "");

  const role = useUserData().userData?.role

    
  function logInfo() {
    console.log(title, country, description, activities, priceClass, continent, language, temperature, population);
  }

  async function addDestination(destinationData: Omit<Destination, "_id">, id?: string) {
    try {
      const response = await fetch('/api/destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...destinationData,
          _id: id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add destination');
      }

      const result = await response.json();
      console.log(result);
      alert('Destination added successfully!');

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Show error message
      } else {
        console.error("Error adding destination:", error);
      }
    } 
  }
  
  function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault();

      const destinationData: Omit<Destination, "_id"> = {
        title,
        country,
        description,
        imgSrc,
        activities,
        priceClass,
        continent,
        language,
        temperature: Number(temperature),
        population: Number(population),
      };
  
      // Call addDestination with the form data

      if ((!adminOnly && role) || role === "admin") {
        addDestination(destinationData, destination?._id)
      }
      else {
        alert(`Only signed in ${adminOnly && "admin "}users can add destinations`)
      }

      console.log(JSON.stringify(destinationData))
      console.log(destinationData)

      logInfo();
    }
  
    return (
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="sr-only">
                Bynavn:
              </Label>
              <Input
              id="titleInput"
              placeholder="Bynavn"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only">
                Land:
              </Label>
              <Input
              id="countryInput"
              placeholder="Land"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only">
                Beskrivelse
              </Label>
              <Textarea
              className="min-h-28"
              id="descriptionInput"
              placeholder="Beskrivelse"
              autoCapitalize="none"
              autoCorrect="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only">
                Aktiviteter
              </Label>
              <Textarea
                className="min-h-20"
                id="activitiesInput"
                placeholder="Aktiviteter"
                autoCapitalize="none"
                autoCorrect="off"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only">
                Prisklasse
              </Label>
              <Select value={priceClass} onValueChange={(value)=>setPriceClass(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Prisklasse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$">$</SelectItem>
                <SelectItem value="$$">$$</SelectItem>
                <SelectItem value="$$$">$$$</SelectItem>
                <SelectItem value="$$$$">$$$$</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <p className="text-center font-bold">Bildelenke</p>
            <div className="grid gap-1">
              <Label className="sr-only">
                Bilde
              </Label>
              <Input
                id="imageInput"
                placeholder="Legg til lenke til bildet som skal brukes"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                value={imgSrc}
                onChange={(e) => setImgSrc(e.target.value)}
                required
              />
            </div>
            <p className="text-center font-bold">Ekstra informasjon</p>
            <div className="grid gap-1 grid-cols-2">
              <Label className="sr-only">
                Verdensdel
              </Label>
              <Select value={continent} onValueChange={(value)=>setContinent(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Verdensdel"/>
              </SelectTrigger>
              <SelectContent>
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
                Språk
              </Label>
              <Input
              id="languageInput"
              placeholder="Språk"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              />
              <Label className="sr-only">
                Temperatur
              </Label>
              <Input
                id="temperatureInput"
                placeholder="Temperatur"
                type="number"
                autoCapitalize="none"
                autoCorrect="off"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                required
              />
              <Label className="sr-only">
                Befolkningstall
              </Label>
              <Input
                id="populationInput"
                placeholder="Befolkningstall"
                type="number"
                autoCapitalize="none"
                autoCorrect="off"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
                required
              />
            </div>
            <Button type="submit">
              {destination ? "Endre destinasjon" : "Legg til destinasjon"}
            </Button>
          </div>
        </form>
      </div>
    )
}