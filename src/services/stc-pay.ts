import PaytabsBase from "../core/helpers/paytabs-base";
import { PaymentProviderKeys } from "../types/type";

class stcpay extends PaytabsBase {
  static identifier = PaymentProviderKeys.STCPAY;
  paymentoptions = {
    method: "stc",
    region: "SAU",
  };

}

export default stcpay;