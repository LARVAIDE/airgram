import AES from "crypto-js/aes";
import ECB from "crypto-js/mode-ecb";
import Pkcs7 from "crypto-js/pad-pkcs7";
import Utf8 from "crypto-js/enc-utf8";

/**
 * 
 * @param data 
 * @returns 
 */
const Encode = (data: any) => {
    var key = Utf8.parse("0000000000000000");
    var decrypt = AES.decrypt(data, key, {
        mode: ECB,
        padding: Pkcs7
    });
    return JSON.parse(Utf8.stringify(decrypt))
}

export {
    Encode
}