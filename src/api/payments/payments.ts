import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import PaymentAxios from '@api/payments/payments.axios';
import PaymentsProps from '@interfaces/payments.interface';
import queryClient from '@api/config.react-query';
import ApiReactQuery from '@api/api.react-query';

class PaymentsReactQuery extends ApiReactQuery<PaymentsProps> {
  protected apiAxios: PaymentAxios;

  constructor(
    type: InvalidateQueryFilters,
    dataInterface: PaymentsProps,
    path: string,
    token?: string
  ) {
    super(type, dataInterface, path, token);
    this.apiAxios = new PaymentAxios(dataInterface, path, token);
  }

  async createCheckoutSession(datas: PaymentsProps){
    return await this.apiAxios.createCheckoutSession(datas);
  }


}

export default PaymentsReactQuery;
