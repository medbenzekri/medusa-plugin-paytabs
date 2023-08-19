import { AbstractPaymentProcessor, PaymentProcessorContext, PaymentProcessorError, PaymentProcessorSessionResponse, PaymentSessionStatus } from "@medusajs/medusa";
const paytabs = require('paytabs_pt2');
class PaytabsPaymentProcessor extends AbstractPaymentProcessor {
    
    constructor(container, options) {
        super(container)
        // options contains plugin options
        this.server_key = options.server_key
        this.merchant_id = options.merchant_id
        this.region = options.region
      }
      
    initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
        let paymentMethods = ["all"];
        let customer= context.customer;
        let customer_address= context.billing_address;
        let transaction_details = [
        transaction.type,
        transaction.class
        
        ];
        let cart_details = [
        cart.id,
        cart.currency,
        context.amount,
        cart.description
        ];

        let customer_details = [
        customer.first_name + " " + customer.last_name,
        customer.email,
        customer.phone,
        customer_address.address_1,
        customer_address.city,
        customer_address.province,
        customer_address.country,
        customer_address.postal_code,
        customer.IP
        ];
        
        let shipping_address = customer_details;

        let response_URLs = [
        url.response,
        url.callback
        ];

        let lang = "ar";

        paymentPageCreated = function ($results) {
        console.log($results);
        }

        let frameMode = true;

        paytabs.createPaymentPage(
        paymentMethods,
        transaction_details,
        cart_details,    
        customer_details,
        shipping_address,
        response_URLs,
        lang,
        paymentPageCreated,
        frameMode
        );
        return new Promise((resolve, reject) => {
            resolve({
                status: PaymentSessionStatus.AUTHORIZED,
                data: {
                    id: "123",
                    data: {
                        url: "https://paytabs.com"
                    }
                }
            })
        })

    }

    authorizePayment(paymentSessionData: Record<string, unknown>, context: Record<string, unknown>): Promise<PaymentProcessorError | { status: PaymentSessionStatus; data: Record<string, unknown>; }> {
        throw new Error("Method not implemented.");
    }
    capturePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    cancelPayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    deletePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
        throw new Error("Method not implemented.");
    }
    refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    retrievePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    updatePayment(context: PaymentProcessorContext): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
        throw new Error("Method not implemented.");
    }
    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("Method not implemented.");
    }
    
    
    
}