import PaytabsBase from "../core/helpers/paytabs-base";
import { PaymentProviderKeys } from "../types/type";

class amex extends PaytabsBase {
  static identifier = PaymentProviderKeys.AMEX;
  paymentoptions = {
    method: "amex",
    region: "SAU",
  };

}

export default amex;