export const LoadMapScript = mapSrc => {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = mapSrc;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    return s
};

const googleAPIKey = "AIzaSyAntVdKHLUBM9rxoQz9sHbhS7ibr7Fbfm8";

export const mapScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=geometry`;

export const fourSquareSearchURL = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "IX4JV0KSDEQZJYTZAG04HV5WXAOKNQOZLGFJRUB2ACIZCH3M",
        client_secret: "MWAIM1YL4SFDHNZNPLBRP0ONZVNPTWP20H2E4Z4DJFYKBF03",
        query: "Historic Site",
        near: "Marvdasht",
        limit: 15,
        v: "20181018"
    };
    return (endPoint + new URLSearchParams(parameters))
};

export const fourSquarePicsURL = (venueid) => {
    const endPoint = `https://api.foursquare.com/v2/venues/${venueid}/photos?`;
    const parameters = {
        client_id: "IX4JV0KSDEQZJYTZAG04HV5WXAOKNQOZLGFJRUB2ACIZCH3M",
        client_secret: "MWAIM1YL4SFDHNZNPLBRP0ONZVNPTWP20H2E4Z4DJFYKBF03",
        group: "venue",
        limit: 1,
        v: "20181018"
    };
    return (endPoint + new URLSearchParams(parameters))
};