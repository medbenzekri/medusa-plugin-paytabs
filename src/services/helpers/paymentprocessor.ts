import { TransactionBaseService,
    MedusaContainer,
    AbstractPaymentProcessor,
    PaymentProcessorContext,
    PaymentProcessorError,
    PaymentProcessorSessionResponse,
    PaymentSessionStatus,
    ConfigModule,
    
} from "@medusajs/medusa";
import createPaymentPage from "./pageprep";
import awilix from "awilix";
class PaymentProcessorFactory extends TransactionBaseService {
    private container: MedusaContainer;
    constructor(container: MedusaContainer) {
        super(container);
        this.container = container;
    }

    register( paymentProcessorID:string,region:string,paymentmethod:string ) {

        class MyPaymentProcessor extends AbstractPaymentProcessor {
            updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError> {
                throw new Error("1");
            }
        
            static identifier = paymentProcessorID;
        
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
        
        
        
        
        
                const paymentPageResult: any = await createPaymentPage(region,paymentmethod,context);
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
        
        
                const paymentPageResult: any = await createPaymentPage(region,paymentmethod,context);
        
        
        
        
                return paymentPageResult;
            }
        }
        this.container.register({
            
            [paymentProcessorID]: awilix.asClass(MyPaymentProcessor),
            [`pp_${paymentProcessorID}`]: awilix.asClass(MyPaymentProcessor),
        })
        return MyPaymentProcessor;
    }

}

export default PaymentProcessorFactory;