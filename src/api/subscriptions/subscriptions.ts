import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import SubscriptionAxios from '@api/subscriptions/subscriptions.axios';
import SubscriptionsProps from '@interfaces/subscriptions.interface';
import queryClient from '@api/config.react-query';
import ApiReactQuery from '../api.react-query';

class SubscriptionsReactQuery extends ApiReactQuery<SubscriptionsProps> {
  protected apiAxios: SubscriptionAxios;

  constructor(
    type: InvalidateQueryFilters,
    dataInterface: SubscriptionsProps,
    path: string,
    token?: string
  ) {
    super(type, dataInterface, path, token);
    this.apiAxios = new SubscriptionAxios(dataInterface, path, token);
  }
}

export default SubscriptionsReactQuery;
