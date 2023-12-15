import cc from "classnames";
import React, { FC } from "react";
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
}

const AddressPicker: FC<AddressPickerProps> = ({
  className,
  control,
  placeholder,
}) => {
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
  return (
    <>
      <PlacesAutocomplete
        value={control.field.value?.address || ""}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
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
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions && (
                <ShowSuggestions
                  suggestions={suggestions}
                  getSuggestionItemProps={getSuggestionItemProps}
                />
              )}
            </div>
          </div>
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
    <table>
      <div className="overflow-x-auto">
        <table className="table w-full table-compact mt-2">
          <thead></thead>
          <tbody>
            {suggestions.map((suggestion) => {
              return (
                <tr
                  key={suggestion.id}
                  {...getSuggestionItemProps(suggestion, {
                    className: cc(
                      { active: suggestion.active },
                      "hover cursor-pointer"
                    ),
                  })}
                >
                  <td>{suggestion.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </table>
  );
};

export default AddressPicker;
