import PaytabsBase from "../core/helpers/paytabs-base";
import { PaymentProviderKeys } from "../types/type";

class creditcard extends PaytabsBase {
  static identifier = PaymentProviderKeys.CREDITCARD;
  paymentoptions = {
    method: "creditcard",
    region: "SAU",
  };

}

export default creditcard;