import ApiAxios from '@api/api.axios';
import PlansProps from '@interfaces/plans.interface';

class PlansAxios extends ApiAxios<PlansProps> {
  constructor(dataInterface: PlansProps, path: string, token?: string) {
    super(dataInterface, path, token);
  }
}

export default PlansAxios;
