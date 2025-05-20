
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, ShoppingCart, Coffee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PRICES } from "@/constants/prices";

interface GuestOptionsProps {
  guests: number;
  laundryPackages: number;
  breakfastCount: number;
  onGuestsChange: (value: number) => void;
  onLaundryPackagesChange: (value: number) => void;
  onBreakfastCountChange: (value: number) => void;
}

const GuestOptions = ({
  guests,
  laundryPackages,
  breakfastCount,
  onGuestsChange,
  onLaundryPackagesChange,
  onBreakfastCountChange,
}: GuestOptionsProps) => {
  const isMobile = useIsMobile();
  
  const createNumberOptions = (max: number, includeZero: boolean = true) => {
    const options = [];
    if (includeZero) options.push(0);
    for (let i = 1; i <= max; i++) {
      options.push(i);
    }
    return options;
  };

  const guestOptions = createNumberOptions(4, false);
  const laundryOptions = createNumberOptions(4);
  const breakfastOptions = createNumberOptions(8);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="guests">Anzahl der Personen</Label>
        {isMobile ? (
          <RadioGroup
            defaultValue={guests.toString()}
            onValueChange={(value) => onGuestsChange(parseInt(value))}
            className="flex space-x-2"
          >
            {guestOptions.map((option) => (
              <div key={option} className="flex items-center space-x-1">
                <RadioGroupItem value={option.toString()} id={`guests-${option}`} className="peer sr-only" />
                <Label
                  htmlFor={`guests-${option}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                  peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              type="number"
              min={1}
              max={4}
              value={guests}
              onChange={(e) => onGuestsChange(parseInt(e.target.value) || 1)}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="laundry">Anzahl der Wäschepakete</Label>
        {isMobile ? (
          <RadioGroup
            defaultValue={laundryPackages.toString()}
            onValueChange={(value) => onLaundryPackagesChange(parseInt(value))}
            className="flex space-x-2"
          >
            {laundryOptions.map((option) => (
              <div key={option} className="flex items-center space-x-1">
                <RadioGroupItem value={option.toString()} id={`laundry-${option}`} className="peer sr-only" />
                <Label
                  htmlFor={`laundry-${option}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                  peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="laundry"
              type="number"
              min={0}
              max={4}
              value={laundryPackages}
              onChange={(e) => onLaundryPackagesChange(Math.min(4, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground">Ein Wäschepaket kostet €{PRICES.LAUNDRY_PACKAGE} pro Person und enthält Handtücher und Bettwäsche.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="breakfast">Anzahl Frühstück</Label>
        {isMobile ? (
          <RadioGroup
            defaultValue={breakfastCount.toString()}
            onValueChange={(value) => onBreakfastCountChange(parseInt(value))}
            className="flex flex-wrap gap-2"
          >
            {breakfastOptions.map((option) => (
              <div key={option} className="flex items-center space-x-1">
                <RadioGroupItem value={option.toString()} id={`breakfast-${option}`} className="peer sr-only" />
                <Label
                  htmlFor={`breakfast-${option}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                  peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="flex items-center">
            <Coffee className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="breakfast"
              type="number"
              min={0}
              max={8}
              value={breakfastCount}
              onChange={(e) => onBreakfastCountChange(Math.min(8, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Wir bieten ein einfaches Frühstück nach Rücksprache an. Das erste Frühstück kostet €{PRICES.BREAKFAST.FIRST_PERSON}, jedes weitere Frühstück kostet €{PRICES.BREAKFAST.ADDITIONAL_PERSON}.
        </p>
      </div>
    </>
  );
};

export default GuestOptions;
