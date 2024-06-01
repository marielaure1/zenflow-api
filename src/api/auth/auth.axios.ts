import ApiAxios from '@api/api.axios';
import CustomersProps from '@interfaces/customers.interface';

class AuthAxios extends ApiAxios<CustomersProps> {
  constructor(dataInterface: CustomersProps, path: string, token?: string) {
    super(dataInterface, path, token);
  }

  async register(data: CustomersProps) {
    const response = await this.apiClient.post(`/${this.path}/register`, data);
    // console.log();
    
    return response.data;
  }
}

export default AuthAxios;
