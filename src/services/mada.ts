import PaytabsBase from "../core/helpers/paytabs-base";
import { PaymentProviderKeys } from "../types/type";

class mada extends PaytabsBase {
  static identifier = PaymentProviderKeys.MADA;
  paymentoptions = {
    method: "mada",
    region: "SAU",
  };

}

export default mada;