export type TAddressSearch = {
    city: string;
    "ISO3166-2-lvl4": string;
    country: string;
    country_code: string;
};

export type TLocationSearch = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: TAddressSearch;
    boundingbox: [string, string, string, string];
};

export type TLocation = {
    name: string;
    longitude: number;
    latitude: number;
    note: string;
    _id: string;
};
