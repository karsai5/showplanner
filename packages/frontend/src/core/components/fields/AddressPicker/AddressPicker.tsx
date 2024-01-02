import cc from "classnames";
import { googleMapsLoader } from "core/maps/maps";
import React, { FC, useEffect, useState } from "react";
import { UseControllerReturn } from "react-hook-form";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from "react-places-autocomplete";

export type AddressPickerReturn = {
  address: string;
  lat?: number;
  lng?: number;
};

interface AddressPickerProps {
  className?: string;
  control: UseControllerReturn<any, any>;
  placeholder?: string;
  label?: string;
}

const AddressPicker: FC<AddressPickerProps> = ({
  className,
  control,
  placeholder,
  label,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    googleMapsLoader.load().then(async () => {
      await google.maps.importLibrary('places');
      setLoading(false);
    })
  });

  const handleChange = (address: any, lat?: number, lng?: number) => {
    control.field.onChange({ address, lat, lng });
  };

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        handleChange(address, latLng.lat, latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  if (loading) {
    return null;
  }
  return (
    <>
      <PlacesAutocomplete
        value={control.field.value?.address || ""}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading: suggestionsLoading }) => (
          <>
            <div className="dropdown dropdown-bottom dropdown-open w-full">
              {suggestionsLoading && <span className="loading loading-spinner loading-sm absolute top-3 right-3 text-slate-400"></span>}
              {label && (
                <label className="label">
                  <span className="label-text-alt">
                    {label}
                  </span>
                </label>
              )}
              <input
                {...getInputProps({
                  placeholder: placeholder || "Search Places ...",
                  className: cc(
                    "input input-bordered w-full location-search-input",
                    className
                  ),
                })}
                onBlur={control.field.onBlur}
              />
              {suggestions && suggestions.length > 0 && (
                <ShowSuggestions
                  suggestions={suggestions}
                  getSuggestionItemProps={getSuggestionItemProps}
                />
              )}
            </div>
          </>
        )}
      </PlacesAutocomplete>
    </>
  );
};

const ShowSuggestions: React.FC<{
  suggestions: readonly Suggestion[];
  getSuggestionItemProps: any;
}> = ({ suggestions, getSuggestionItemProps }) => {
  return (
    <>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
        {suggestions.map((suggestion) => {
          return (
            <li
              key={suggestion.id}
              {...getSuggestionItemProps(suggestion, {

              })}
            >
              <a className={cc({ ['btn-active']: suggestion.active })}>{suggestion.description}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AddressPicker;
