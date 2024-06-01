import ApiAxios from '@api/api.axios';
import PaymentsProps from '@interfaces/payments.interface';

class PaymentsAxios extends ApiAxios<PaymentsProps> {
  constructor(dataInterface: PaymentsProps, path: string, token?: string) {
    super(dataInterface, path, token);
  }

  async createCheckoutSession(datas: PaymentsProps){
    const response = await this.apiClient.post(`${this.path}/create-checkout-session`, datas)
    return response.data
  }
}

export default PaymentsAxios;
