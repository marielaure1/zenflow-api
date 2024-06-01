import { useSelector } from 'react-redux';
import AuthReactQuery from '@api/auth/auth';
import CustomersReactQuery from '@api/customers/customers';
import CustomersProps from '@/common/interfaces/customers.interface';
import PlansReactQuery from '@api/plans/plans';
import PlansProps from '@/common/interfaces/plans.interface';
import SubscriptionsReactQuery from '@api/subscriptions/subscriptions';
import SubscriptionsProps from '@/common/interfaces/subscriptions.interface';
import PaymentsReactQuery from '@api/payments/payments';
import PaymentsProps from '@/common/interfaces/payments.interface';
import { InvalidateQueryFilters } from '@tanstack/react-query';


/**
 * Customers
 */
const customerData: CustomersProps = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: ''
};

const invalidateQueryFiltersCustomers: InvalidateQueryFilters = {
  queryKey: ['customers']
};

const useCustomersApi = () => {
  const token = useSelector((state) => state?.auth?.token);
  return new CustomersReactQuery(invalidateQueryFiltersCustomers, customerData, 'customers', token);
};

const useAuthApi = () => {
  return new AuthReactQuery(invalidateQueryFiltersCustomers, customerData, 'auth');
};


/**
 * Plans
 */

const planData: PlansProps = {
  name : "",
  description : "",
  amount : 0,
  currency : "",
  interval : "",
  stripePlanId : "",
  features : []
};

const invalidateQueryFiltersPlans: InvalidateQueryFilters = {
  queryKey: ['plans']
};

const usePlansApi = () => {
  const token = useSelector((state) => state?.auth?.token);
  return new PlansReactQuery(invalidateQueryFiltersPlans, planData, 'plans', token);
};


/**
 * Subscriptions
 */
const subscriptionData: SubscriptionsProps = {
  plan : "",
  customer : ""
};

const invalidateQueryFiltersSubscriptions: InvalidateQueryFilters = {
  queryKey: ['subscriptions']
};

const useSubscriptionsApi = () => {
  const token = useSelector((state) => state?.auth?.token);
  return new SubscriptionsReactQuery(invalidateQueryFiltersSubscriptions, subscriptionData, 'subscriptions', token);
};

/**
 * Payments
 */
const PaymentsData: PaymentsProps = {
  amount : 0,
  currency : "",
  customerId : ""
};

const invalidateQueryFiltersPayments: InvalidateQueryFilters = {
  queryKey: ['payments']
};

const usePaymentsApi = () => {
  const token = useSelector((state) => state?.auth?.token);
  return new PaymentsReactQuery(invalidateQueryFiltersPayments, subscriptionData, 'payments', token);
};

export {
  useCustomersApi,
  usePlansApi,
  useSubscriptionsApi,
  useAuthApi,
  usePaymentsApi
};
