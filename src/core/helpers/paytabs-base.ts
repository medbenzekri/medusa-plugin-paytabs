import { 
    AbstractPaymentProcessor,
    PaymentProcessorContext,
    PaymentProcessorError,
    PaymentProcessorSessionResponse,
    PaymentSessionStatus,
    
} from "@medusajs/medusa";

import createPaymentPage from "./pageprep";
import { paymentoptions } from "../../types/type";
abstract class PaytabsBase extends AbstractPaymentProcessor {
    
    static identifier = ""; 
    abstract paymentoptions : paymentoptions;
    
    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("1");
    }
    async capturePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        return {
            status: "captured",
        }
    }
    async authorizePayment(
        paymentSessionData: Record<string, unknown>,
        context: Record<string, unknown>
    ): Promise<
        | PaymentProcessorError
        | {
            status: PaymentSessionStatus;
            data: Record<string, unknown>;
        }
    > {
        return {
            status: PaymentSessionStatus.AUTHORIZED,
            data: {
                id: "test",
            },
        };
    }

    async cancelPayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        throw new Error("4");
    }
    async initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {





        const paymentPageResult: any = await createPaymentPage(this.paymentoptions,context);
        console.log(paymentPageResult);



        return paymentPageResult;

    }
    async deletePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
        return paymentSessionData;
    }
    async getPaymentStatus(
        paymentSessionData: Record<string, unknown>
    ): Promise<PaymentSessionStatus> {
        return PaymentSessionStatus.AUTHORIZED
    }
    async refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<Record<string, unknown> | PaymentProcessorError> {
        console.log(refundAmount, paymentSessionData);

        throw new Error("7");
    }
    async retrievePayment(
        paymentSessionData: Record<string, unknown>
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
        return {}
    }

    async updatePayment(context: PaymentProcessorContext): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {


        const paymentPageResult: any = await createPaymentPage(this.paymentoptions,context);




        return paymentPageResult;
    }
}

export default PaytabsBase;