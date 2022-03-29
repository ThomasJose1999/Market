const pinataApiKey = process.env.NEXT_PUBLIC_API_Key;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_API_Secret;
const axios = require("axios");
const FormData = require("form-data");

export const pinFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();

    data.append("file", file);
    // data.append("pinataMetadata", metadata);

    const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
        },
    });

    const fileURL = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;

    return fileURL
};

export const pinMetadataToIPFS = async (metadata) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const res = await axios.post(url, metadata, {
        maxContentLength: "Infinity",
        headers: {
            "Content-Type": `application/json`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
        },
    });

    const fileURL = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;

    return fileURL
};


