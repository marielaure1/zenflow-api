import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import AuthAxios from '@api/auth/auth.axios';
import CustomersProps from '@interfaces/customers.interface';
import queryClient from '@api/config.react-query';
import ApiReactQuery from '@api/api.react-query';

class AuthReactQuery extends ApiReactQuery<CustomersProps> {
  protected apiAxios: AuthAxios;

  constructor(
    type: InvalidateQueryFilters,
    dataInterface: CustomersProps,
    path: string,
    token?: string
  ) {
    super(type, dataInterface, path, token);
    this.apiAxios = new AuthAxios(dataInterface, path, token);
  }

  async register(data: CustomersProps) {
    const response = await this.apiAxios.register(data);
    queryClient.setQueryData([this.type], response); 
    return response;
  }
}

export default AuthReactQuery;
