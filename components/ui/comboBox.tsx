"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboBox({
  airports,
  initialValue,
  onChange,
  loading,
  label,
}: {
  airports: Airport[] | null;
  initialValue: string;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  label: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] h-12 justify-between font-normal"
        >
          {initialValue && airports ? (
            <span className="w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="font-semibold">
                {
                  airports.find((airport) => airport.code === initialValue)
                    ?.code
                }
              </span>
              {", "}
              <span>
                {
                  airports.find((airport) => airport.code === initialValue)
                    ?.name
                }
              </span>
            </span>
          ) : (
            <span>{label}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-max">
        <Command>
          <CommandInput placeholder={label} className="h-9" />
          <CommandList>
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup>
              {!loading && airports ? (
                airports.map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={airport.code}
                    onSelect={(currentValue) => {
                      onChange(
                        currentValue === initialValue ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <span className="font-semibold">{airport.code}</span>
                    {","}&nbsp;
                    <span>{airport.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        initialValue === airport.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <CommandItem value="loading">Loading...</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
