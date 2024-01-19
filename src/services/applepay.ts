import PaytabsBase from "../core/helpers/paytabs-base";
import { PaymentProviderKeys } from "../types/type";

class applepay extends PaytabsBase {
  static identifier = PaymentProviderKeys.APPLEPAY;
  paymentoptions = {
    method: "applepay",
    region: "SAU",
  };

}

export default  applepay;