import PaymentProcessorFactory from "./helpers/paymentprocessor";

const paymentProviders = [
    PaymentProcessorFactory.register("mada","SAU","mada")
];
export default paymentProviders;


