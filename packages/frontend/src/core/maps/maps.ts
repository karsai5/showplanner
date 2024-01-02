import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
export const getStaticMap = (lat?: number, lng?: number) => {
  if (!lat || !lng) {
    return "";
  }
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&key=${API_KEY}&markers=color:blue%7C${lat},${lng}`;
};

export const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

export const googleMapsLoader = new Loader({
  apiKey: API_KEY || '',
  version: 'weekly'
});
