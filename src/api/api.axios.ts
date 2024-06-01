import axios, { AxiosInstance } from 'axios';

let LOCATION = "Maison";
let IP = LOCATION === "Maison" ? 'http://192.168.1.185:3001/api' : 'http://10.0.2.2:3001/api';

class ApiAxios<DataInterface> {
  protected apiClient: AxiosInstance;
  protected token: string | undefined;

  constructor(
    private readonly dataInterface: DataInterface,
    public readonly path: string,
    token?: string
  ) {
    this.dataInterface = dataInterface;
    this.path = path;
    this.token = token;

    this.apiClient = axios.create({
      baseURL: IP,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.init();
  }

  private init() {
    this.apiClient.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public getApiClient() {
    return this.apiClient;
  }

  async findAllAxios() {
    const response = await this.apiClient.get(`/${this.path}`);
    return response.data;
  }

  async createAxios(datas: DataInterface) {
    const response = await this.apiClient.post(`/${this.path}`, datas);
    return response.data;
  }

  async findOneAxios(customerId: string) {
    const response = await this.apiClient.get(`/${this.path}/${customerId}`);
    return response.data;
  }

  async updateAxios(customerId: string) {
    const response = await this.apiClient.put(`/${this.path}/${customerId}`, this.dataInterface);
    return response.data;
  }

  async deleteAxios(customerId: string) {
    await this.apiClient.delete(`/${this.path}/${customerId}`);
  }
}

export default ApiAxios;
