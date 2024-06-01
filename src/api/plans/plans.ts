import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import PlanAxios from '@api/plans/plans.axios';
import PlansProps from '@interfaces/plans.interface';
import queryClient from '@api/config.react-query';
import ApiReactQuery from '../api.react-query';

class PlansReactQuery extends ApiReactQuery<PlansProps> {
  protected apiAxios: PlanAxios;

  constructor(
    type: InvalidateQueryFilters,
    dataInterface: PlansProps,
    path: string,
    token?: string
  ) {
    super(type, dataInterface, path, token);
    this.apiAxios = new PlanAxios(dataInterface, path, token);
  }
}

export default PlansReactQuery;
