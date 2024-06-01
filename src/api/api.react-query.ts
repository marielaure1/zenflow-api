import { QueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import ApiAxios from '@api/api.axios';
import queryClient from '@api/config.react-query';

class ApiReactQuery<DataInterface> {
  protected queryClient: QueryClient;
  protected apiAxios: ApiAxios<DataInterface>;

  constructor(
    protected readonly type: InvalidateQueryFilters,
    private readonly dataInterface: DataInterface,
    private readonly path: string,
    token?: string
  ) {
    this.type = type;
    this.dataInterface = dataInterface;
    this.path = path;

    this.queryClient = queryClient;
    this.apiAxios = new ApiAxios<DataInterface>(this.dataInterface, this.path, token);
  }

  async findAll() {
    const response = await this.apiAxios.findAllAxios();
    queryClient.setQueryData([this.type], response); 
    return response;
  }

  async create(datas: DataInterface) {
    const response = await this.apiAxios.createAxios(datas);
    this.queryClient.invalidateQueries(this.type);
    return response;
  }

  async findOne(customerId: string) {
    const response = await this.apiAxios.findOneAxios(customerId);
    queryClient.setQueryData([this.type], response); 
    return response;
  }

  async update(customerId: string) {
    const response = await this.apiAxios.updateAxios(customerId);
    this.queryClient.invalidateQueries(this.type);
    return response;
  }

  async delete(customerId: string) {
    const response = await this.apiAxios.deleteAxios(customerId);
    this.queryClient.invalidateQueries(this.type);
    return response;
  }
}

export default ApiReactQuery;
