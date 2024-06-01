import ApiAxios from '@api/api.axios';
import SubscriptionsProps from '@interfaces/subscriptions.interface';

class SubscriptionsAxios extends ApiAxios<SubscriptionsProps> {
  constructor(dataInterface: SubscriptionsProps, path: string, token?: string) {
    super(dataInterface, path, token);
  }
}

export default SubscriptionsAxios;
