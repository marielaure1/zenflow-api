import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import CustomerAxios from '@api/customers/customers.axios';
import CustomersProps from '@interfaces/customers.interface';
import queryClient from '@api/config.react-query';
import ApiReactQuery from '@api/api.react-query';

class CustomersReactQuery extends ApiReactQuery<CustomersProps> {
  protected apiAxios: CustomerAxios;

  constructor(
    type: InvalidateQueryFilters,
    dataInterface: CustomersProps,
    path: string,
    token?: string
  ) {
    super(type, dataInterface, path, token);
    this.apiAxios = new CustomerAxios(dataInterface, path, token);
  }

  async findMe() {
    const response = await this.apiAxios.findMe();
    queryClient.setQueryData([this.type], response); 
    return response;
  }
}

export default CustomersReactQuery;
