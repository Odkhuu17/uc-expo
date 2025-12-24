export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISO8601DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Address = BaseModelInterface & {
  __typename?: 'Address';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  alternativeEmail?: Maybe<Scalars['String']['output']>;
  alternativeMobile?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  district?: Maybe<District>;
  districtId?: Maybe<Scalars['ID']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferences: Scalars['JSON']['output'];
  quarter?: Maybe<Quarter>;
  quarterId?: Maybe<Scalars['ID']['output']>;
  sdq?: Maybe<Array<Scalars['ID']['output']>>;
  state?: Maybe<State>;
  stateId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type AddressConnection = {
  __typename?: 'AddressConnection';
  edges: Array<AddressEdge>;
  nodes: Array<Address>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Address>;
};

export type AddressFilter = {
  address1?: InputMaybe<StringFilter>;
  address2?: InputMaybe<StringFilter>;
  alternativeEmail?: InputMaybe<StringFilter>;
  alternativeMobile?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  latitude?: InputMaybe<StringFilter>;
  longitude?: InputMaybe<StringFilter>;
  mobile?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  zipcode?: InputMaybe<StringFilter>;
};

export type AddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  alternativeEmail?: InputMaybe<Scalars['String']['input']>;
  alternativeMobile?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LatLngInput>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type Application = BaseModelInterface & {
  __typename?: 'Application';
  confidential: Scalars['Boolean']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  redirectUri: Scalars['String']['output'];
  scopes: Scalars['String']['output'];
  secret: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type ApplicationConnection = {
  __typename?: 'ApplicationConnection';
  edges: Array<ApplicationEdge>;
  nodes: Array<Application>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ApplicationEdge = {
  __typename?: 'ApplicationEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Application>;
};

export type Banner = BaseModelInterface & {
  __typename?: 'Banner';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageObject?: Maybe<ImageObject>;
  permalink?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type BannerConnection = {
  __typename?: 'BannerConnection';
  edges: Array<BannerEdge>;
  nodes: Array<Banner>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BannerEdge = {
  __typename?: 'BannerEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Banner>;
};

export type BannerFilter = {
  category?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  permalink?: InputMaybe<StringFilter>;
  position?: InputMaybe<IntFilter>;
  status?: InputMaybe<EnumStringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type BaseModelInterface = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type BoolFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['Boolean']['input']>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Country = BaseModelInterface & {
  __typename?: 'Country';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  iso?: Maybe<Scalars['String']['output']>;
  iso3?: Maybe<Scalars['String']['output']>;
  isoName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  numCode?: Maybe<Scalars['String']['output']>;
  sdq: Scalars['JSON']['output'];
  states: Array<State>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type DateFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gteq?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lteq?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeliveryRequest = BaseModelInterface & {
  __typename?: 'DeliveryRequest';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  order: Order;
  orderId: Scalars['ID']['output'];
  price: Scalars['String']['output'];
  status: Scalars['String']['output'];
  travelAt: Scalars['ISO8601DateTime']['output'];
  truck?: Maybe<Truck>;
  truckId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type DeliveryRequestConnection = {
  __typename?: 'DeliveryRequestConnection';
  edges: Array<DeliveryRequestEdge>;
  nodes: Array<DeliveryRequest>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DeliveryRequestEdge = {
  __typename?: 'DeliveryRequestEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<DeliveryRequest>;
};

export type DeliveryRequestFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  order?: InputMaybe<OrderFilter>;
  price?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumStringFilter>;
  truck?: InputMaybe<TruckFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
};

export type Device = BaseModelInterface & {
  __typename?: 'Device';
  application: Application;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  deviceModel?: Maybe<Scalars['String']['output']>;
  deviceOs?: Maybe<Scalars['String']['output']>;
  deviceType?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastActive?: Maybe<Scalars['ISO8601DateTime']['output']>;
  sessionsCount: Scalars['Int']['output'];
  subscribed: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user?: Maybe<User>;
};

export type DeviceConnection = {
  __typename?: 'DeviceConnection';
  edges: Array<DeviceEdge>;
  nodes: Array<Device>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DeviceEdge = {
  __typename?: 'DeviceEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Device>;
};

export type DeviceFilter = {
  applicationId?: InputMaybe<IdFilter>;
  createdAt?: InputMaybe<DateFilter>;
  deviceModel?: InputMaybe<StringFilter>;
  deviceOs?: InputMaybe<StringFilter>;
  deviceType?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  ipAddress?: InputMaybe<StringFilter>;
  lastActive?: InputMaybe<DateFilter>;
  subscribed?: InputMaybe<BoolFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
  userId?: InputMaybe<IdFilter>;
};

export type District = BaseModelInterface & {
  __typename?: 'District';
  abbr?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quarters: Array<Quarter>;
  state: State;
  stateId: Scalars['ID']['output'];
  ubcCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type DistrictConnection = {
  __typename?: 'DistrictConnection';
  edges: Array<DistrictEdge>;
  nodes: Array<District>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DistrictEdge = {
  __typename?: 'DistrictEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<District>;
};

export type DistrictFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  stateId?: InputMaybe<IdFilter>;
  ubcCode?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type EnumStringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IdFilter = {
  blank?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gteq?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lteq?: InputMaybe<Scalars['Int']['input']>;
  notEq?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Image = Order;

export type ImageObject = {
  __typename?: 'ImageObject';
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  recordId: Scalars['Int']['output'];
  recordType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type IntFilter = {
  blank?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gteq?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lteq?: InputMaybe<Scalars['Float']['input']>;
  notEq?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LatLngInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Location = BaseModelInterface & {
  __typename?: 'Location';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Mark = BaseModelInterface & {
  __typename?: 'Mark';
  code: Scalars['String']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type MarkConnection = {
  __typename?: 'MarkConnection';
  edges: Array<MarkEdge>;
  nodes: Array<Mark>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MarkEdge = {
  __typename?: 'MarkEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Mark>;
};

export type MarkFilter = {
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Model = BaseModelInterface & {
  __typename?: 'Model';
  code: Scalars['String']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  mark: Mark;
  markId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges: Array<ModelEdge>;
  nodes: Array<Model>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Model>;
};

export type ModelFilter = {
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  mark?: InputMaybe<MarkFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptDeliveryRequest?: Maybe<DeliveryRequest>;
  approveVerification?: Maybe<Verification>;
  attachOrderAudio?: Maybe<Order>;
  attachOrderImage?: Maybe<Order>;
  attachOrderVideo?: Maybe<Order>;
  authCheckLogin: Scalars['JSON']['output'];
  authCheckToken: Scalars['Boolean']['output'];
  authRegister?: Maybe<User>;
  checkPayment?: Maybe<Scalars['JSON']['output']>;
  closeOrder?: Maybe<Order>;
  createAddress?: Maybe<Address>;
  createBanner?: Maybe<Banner>;
  createDeliveryRequest?: Maybe<DeliveryRequest>;
  createImage?: Maybe<Image>;
  createIndexElastic?: Maybe<Scalars['JSON']['output']>;
  createMark?: Maybe<Mark>;
  createModel?: Maybe<Model>;
  createOrder?: Maybe<Order>;
  createPayment?: Maybe<Scalars['JSON']['output']>;
  createPaymentMethod?: Maybe<PaymentMethod>;
  createSendEmail?: Maybe<SendEmail>;
  createSubscription?: Maybe<Subscription>;
  createSubscriptionPlan?: Maybe<SubscriptionPlan>;
  createSystemMenu?: Maybe<SystemMenu>;
  createTaxon?: Maybe<Taxon>;
  createTruck?: Maybe<Truck>;
  createUser?: Maybe<User>;
  createUserAddress?: Maybe<UserAddress>;
  destroyAddress?: Maybe<Address>;
  destroyBanner?: Maybe<Banner>;
  destroyImage?: Maybe<Image>;
  destroyMark?: Maybe<Mark>;
  destroyModel?: Maybe<Model>;
  destroyOrder?: Maybe<Order>;
  destroyOrderAudio?: Maybe<Order>;
  destroyOrderImage?: Maybe<Order>;
  destroyOrderVideo?: Maybe<Order>;
  destroyPaymentMethod?: Maybe<PaymentMethod>;
  destroySendEmail?: Maybe<SendEmail>;
  destroySubscription?: Maybe<Subscription>;
  destroySubscriptionPlan?: Maybe<SubscriptionPlan>;
  destroySystemMenu?: Maybe<SystemMenu>;
  destroyTaxon?: Maybe<Taxon>;
  destroyTruck?: Maybe<Truck>;
  destroyUser?: Maybe<User>;
  destroyUserAddress?: Maybe<UserAddress>;
  feedLocation?: Maybe<TruckTrack>;
  linkDevice: Device;
  rejectDeliveryRequest?: Maybe<DeliveryRequest>;
  resetPassword?: Maybe<User>;
  sendEmailTest?: Maybe<Scalars['JSON']['output']>;
  sendOtp?: Maybe<User>;
  updateAddress?: Maybe<Address>;
  updateBanner?: Maybe<Banner>;
  updateDeliveryRequest?: Maybe<DeliveryRequest>;
  updateMark?: Maybe<Mark>;
  updateModel?: Maybe<Model>;
  updateOrder?: Maybe<Order>;
  updatePaymentMethod?: Maybe<PaymentMethod>;
  updateSendEmail?: Maybe<SendEmail>;
  updateSubscription?: Maybe<Subscription>;
  updateSubscriptionPlan?: Maybe<SubscriptionPlan>;
  updateSystemMenu?: Maybe<SystemMenu>;
  updateTaxon?: Maybe<Taxon>;
  updateTruck?: Maybe<Truck>;
  updateUser?: Maybe<User>;
  verifyDriver?: Maybe<Verification>;
  verifyRequest?: Maybe<Verification>;
  verifyTruck?: Maybe<Verification>;
};


export type MutationAcceptDeliveryRequestArgs = {
  input: AcceptDeliveryRequestInput;
};


export type MutationApproveVerificationArgs = {
  input: ApproveVerificationInput;
};


export type MutationAttachOrderAudioArgs = {
  input: AttachOrderAudioInput;
};


export type MutationAttachOrderImageArgs = {
  input: AttachOrderImageInput;
};


export type MutationAttachOrderVideoArgs = {
  input: AttachOrderVideoInput;
};


export type MutationAuthCheckLoginArgs = {
  input: AuthCheckLoginInput;
};


export type MutationAuthCheckTokenArgs = {
  input: AuthCheckTokenInput;
};


export type MutationAuthRegisterArgs = {
  input: AuthRegisterInput;
};


export type MutationCheckPaymentArgs = {
  input: CheckPaymentInput;
};


export type MutationCloseOrderArgs = {
  input: CloseOrderInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateBannerArgs = {
  input: CreateBannerInput;
};


export type MutationCreateDeliveryRequestArgs = {
  input: CreateDeliveryRequestInput;
};


export type MutationCreateImageArgs = {
  input: CreateImageInput;
};


export type MutationCreateIndexElasticArgs = {
  input: CreateIndexElasticInput;
};


export type MutationCreateMarkArgs = {
  input: CreateMarkInput;
};


export type MutationCreateModelArgs = {
  input: CreateModelInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationCreateSendEmailArgs = {
  input: CreateSendEmailInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationCreateSubscriptionPlanArgs = {
  input: CreateSubscriptionPlanInput;
};


export type MutationCreateSystemMenuArgs = {
  input: CreateSystemMenuInput;
};


export type MutationCreateTaxonArgs = {
  input: CreateTaxonInput;
};


export type MutationCreateTruckArgs = {
  input: CreateTruckInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserAddressArgs = {
  input: CreateUserAddressInput;
};


export type MutationDestroyAddressArgs = {
  input: DestroyAddressInput;
};


export type MutationDestroyBannerArgs = {
  input: DestroyBannerInput;
};


export type MutationDestroyImageArgs = {
  input: DestroyImageInput;
};


export type MutationDestroyMarkArgs = {
  input: DestroyMarkInput;
};


export type MutationDestroyModelArgs = {
  input: DestroyModelInput;
};


export type MutationDestroyOrderArgs = {
  input: DestroyOrderInput;
};


export type MutationDestroyOrderAudioArgs = {
  input: DestroyOrderAudioInput;
};


export type MutationDestroyOrderImageArgs = {
  input: DestroyOrderImageInput;
};


export type MutationDestroyOrderVideoArgs = {
  input: DestroyOrderVideoInput;
};


export type MutationDestroyPaymentMethodArgs = {
  input: DestroyPaymentMethodInput;
};


export type MutationDestroySendEmailArgs = {
  input: DestroySendEmailInput;
};


export type MutationDestroySubscriptionArgs = {
  input: DestroySubscriptionInput;
};


export type MutationDestroySubscriptionPlanArgs = {
  input: DestroySubscriptionPlanInput;
};


export type MutationDestroySystemMenuArgs = {
  input: DestroySystemMenuInput;
};


export type MutationDestroyTaxonArgs = {
  input: DestroyTaxonInput;
};


export type MutationDestroyTruckArgs = {
  input: DestroyTruckInput;
};


export type MutationDestroyUserArgs = {
  input: DestroyUserInput;
};


export type MutationDestroyUserAddressArgs = {
  input: DestroyUserAddressInput;
};


export type MutationFeedLocationArgs = {
  input: FeedLocationInput;
};


export type MutationLinkDeviceArgs = {
  input: LinkDeviceInput;
};


export type MutationRejectDeliveryRequestArgs = {
  input: RejectDeliveryRequestInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendEmailTestArgs = {
  input: SendEmailTestInput;
};


export type MutationSendOtpArgs = {
  input: SendOtpInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateBannerArgs = {
  input: UpdateBannerInput;
};


export type MutationUpdateDeliveryRequestArgs = {
  input: UpdateDeliveryRequestInput;
};


export type MutationUpdateMarkArgs = {
  input: UpdateMarkInput;
};


export type MutationUpdateModelArgs = {
  input: UpdateModelInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};


export type MutationUpdateSendEmailArgs = {
  input: UpdateSendEmailInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationUpdateSubscriptionPlanArgs = {
  input: UpdateSubscriptionPlanInput;
};


export type MutationUpdateSystemMenuArgs = {
  input: UpdateSystemMenuInput;
};


export type MutationUpdateTaxonArgs = {
  input: UpdateTaxonInput;
};


export type MutationUpdateTruckArgs = {
  input: UpdateTruckInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyDriverArgs = {
  input: VerifyDriverInput;
};


export type MutationVerifyRequestArgs = {
  input: VerifyRequestInput;
};


export type MutationVerifyTruckArgs = {
  input: VerifyTruckInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Order = BaseModelInterface & {
  __typename?: 'Order';
  acceptedDeliveryRequest?: Maybe<DeliveryRequest>;
  audio?: Maybe<Scalars['String']['output']>;
  carType?: Maybe<Scalars['String']['output']>;
  carWeight?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  data: Scalars['JSON']['output'];
  deliveryRequests: DeliveryRequestConnection;
  description?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Address>;
  id: Scalars['ID']['output'];
  imageObjects?: Maybe<Array<ImageObject>>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  my?: Maybe<Scalars['Boolean']['output']>;
  myRequest?: Maybe<DeliveryRequest>;
  number?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Address>;
  packageDimensions?: Maybe<Scalars['String']['output']>;
  packageType?: Maybe<Scalars['String']['output']>;
  packageWeight?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  receiverMobile?: Maybe<Scalars['String']['output']>;
  receiverName?: Maybe<Scalars['String']['output']>;
  requested?: Maybe<Scalars['Boolean']['output']>;
  senderMobile?: Maybe<Scalars['String']['output']>;
  senderName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subscribed: Scalars['Boolean']['output'];
  taxon?: Maybe<Taxon>;
  taxonId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  travelAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  travelDistance?: Maybe<Scalars['String']['output']>;
  travelDuration?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user?: Maybe<User>;
  vatIncluded?: Maybe<Scalars['Boolean']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};


export type OrderDeliveryRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DeliveryRequestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdge>;
  nodes: Array<Order>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Order>;
};

export type OrderFilter = {
  approved?: InputMaybe<BoolFilter>;
  carType?: InputMaybe<StringFilter>;
  carWeight?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  destination?: InputMaybe<AddressFilter>;
  id?: InputMaybe<IdFilter>;
  number?: InputMaybe<StringFilter>;
  origin?: InputMaybe<AddressFilter>;
  packageDimensions?: InputMaybe<StringFilter>;
  packageType?: InputMaybe<StringFilter>;
  packageWeight?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntFilter>;
  published?: InputMaybe<BoolFilter>;
  receiverMobile?: InputMaybe<StringFilter>;
  receiverName?: InputMaybe<StringFilter>;
  senderMobile?: InputMaybe<StringFilter>;
  senderName?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  taxon?: InputMaybe<TaxonFilter>;
  title?: InputMaybe<StringFilter>;
  travelAt?: InputMaybe<DateFilter>;
  travelDistance?: InputMaybe<StringFilter>;
  travelDuration?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = BaseModelInterface & {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  preferences?: Maybe<Scalars['JSON']['output']>;
  qPayEvents?: Maybe<Scalars['JSON']['output']>;
  referenceNo?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<Subscription>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type PaymentConnection = {
  __typename?: 'PaymentConnection';
  edges: Array<PaymentEdge>;
  nodes: Array<Payment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentEdge = {
  __typename?: 'PaymentEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Payment>;
};

export type PaymentFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type PaymentMethod = BaseModelInterface & {
  __typename?: 'PaymentMethod';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  testMode: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type PaymentMethodConnection = {
  __typename?: 'PaymentMethodConnection';
  edges: Array<PaymentMethodEdge>;
  nodes: Array<PaymentMethod>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentMethodEdge = {
  __typename?: 'PaymentMethodEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<PaymentMethod>;
};

export enum PaymentMethodEnum {
  QPayMerchant = 'q_pay_merchant'
}

export type PaymentMethodFilter = {
  active?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Quarter = BaseModelInterface & {
  __typename?: 'Quarter';
  createdAt: Scalars['ISO8601DateTime']['output'];
  district: District;
  districtId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ubcCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type QuarterConnection = {
  __typename?: 'QuarterConnection';
  edges: Array<QuarterEdge>;
  nodes: Array<Quarter>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QuarterEdge = {
  __typename?: 'QuarterEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Quarter>;
};

export type QuarterFilter = {
  createdAt?: InputMaybe<DateFilter>;
  districtId?: InputMaybe<IdFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  ubcCode?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: AddressConnection;
  application?: Maybe<Application>;
  applications: ApplicationConnection;
  banner?: Maybe<Banner>;
  banners: BannerConnection;
  country: Country;
  deliveryRequest?: Maybe<DeliveryRequest>;
  deliveryRequests: DeliveryRequestConnection;
  devices: DeviceConnection;
  districts: DistrictConnection;
  mark?: Maybe<Mark>;
  marks: MarkConnection;
  me?: Maybe<User>;
  model?: Maybe<Model>;
  models: ModelConnection;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  order?: Maybe<Order>;
  orders: OrderConnection;
  payment?: Maybe<Payment>;
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethodConnection;
  payments: PaymentConnection;
  placeDetails?: Maybe<UbCab>;
  quarters: QuarterConnection;
  queryTest?: Maybe<Scalars['JSON']['output']>;
  searchAddress?: Maybe<Array<UbCab>>;
  sendEmail?: Maybe<SendEmail>;
  sendEmails: SendEmailConnection;
  sms: SmsConnection;
  states: StateConnection;
  subscription?: Maybe<Subscription>;
  subscriptionPlan?: Maybe<SubscriptionPlan>;
  subscriptionPlans: SubscriptionPlanConnection;
  subscriptions: SubscriptionConnection;
  taxon?: Maybe<Taxon>;
  taxons: TaxonConnection;
  truck?: Maybe<Truck>;
  truckTrack?: Maybe<TruckTrack>;
  truckTracks: TruckTrackConnection;
  trucks: TruckConnection;
  user?: Maybe<User>;
  userAddresses: UserAddressConnection;
  users: UserConnection;
  verification?: Maybe<Verification>;
  verifications: VerificationConnection;
};


export type QueryAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryApplicationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryBannerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBannersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<BannerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryCountryArgs = {
  iso: Scalars['String']['input'];
};


export type QueryDeliveryRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeliveryRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DeliveryRequestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryDevicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DeviceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryDistrictsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DistrictFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryMarkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MarkFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ModelFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<OrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryPaymentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaymentMethodArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentMethodsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PaymentMethodFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryPlaceDetailsArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
  placeId: Scalars['String']['input'];
};


export type QueryQuartersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<QuarterFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QuerySearchAddressArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LatLngInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySendEmailArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySendEmailsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SendEmailFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QuerySmsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SmsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryStatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<StateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionPlanArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionPlansArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SubscriptionPlanFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QuerySubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryTaxonArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTaxonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TaxonFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryTruckArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTruckTrackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTruckTracksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TruckTrackFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryTrucksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TruckFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type QueryVerificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVerificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<VerificationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};

export type Role = BaseModelInterface & {
  __typename?: 'Role';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type SendEmail = BaseModelInterface & {
  __typename?: 'SendEmail';
  createdAt: Scalars['ISO8601DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type SendEmailConnection = {
  __typename?: 'SendEmailConnection';
  edges: Array<SendEmailEdge>;
  nodes: Array<SendEmail>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SendEmailEdge = {
  __typename?: 'SendEmailEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<SendEmail>;
};

export type SendEmailFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Sms = BaseModelInterface & {
  __typename?: 'Sms';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  from?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  operator?: Maybe<Scalars['String']['output']>;
  scheduledAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  sourceId?: Maybe<Scalars['Int']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type SmsConnection = {
  __typename?: 'SmsConnection';
  edges: Array<SmsEdge>;
  nodes: Array<Sms>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SmsEdge = {
  __typename?: 'SmsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Sms>;
};

export type SmsFilter = {
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  status?: InputMaybe<StringFilter>;
  to?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortFilter = {
  direction?: InputMaybe<SortDirection | `${SortDirection}`>;
  field: Scalars['String']['input'];
};

export type State = BaseModelInterface & {
  __typename?: 'State';
  abbr?: Maybe<Scalars['String']['output']>;
  country: Country;
  countryId: Scalars['ID']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  districts: Array<District>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quarters: Array<Quarter>;
  ubcCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type StateConnection = {
  __typename?: 'StateConnection';
  edges: Array<StateEdge>;
  nodes: Array<State>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StateEdge = {
  __typename?: 'StateEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<State>;
};

export type StateFilter = {
  abbr?: InputMaybe<StringFilter>;
  countryId?: InputMaybe<IdFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  ubcCode?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type StringFilter = {
  blank?: InputMaybe<Scalars['Boolean']['input']>;
  cont?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = BaseModelInterface & {
  __typename?: 'Subscription';
  active: Scalars['Boolean']['output'];
  autoRenew: Scalars['Boolean']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  endAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  paymentStatus: Scalars['String']['output'];
  payments: Array<Payment>;
  startAt: Scalars['ISO8601DateTime']['output'];
  subscriptionPlan: SubscriptionPlan;
  truck?: Maybe<Truck>;
  truckId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type SubscriptionConnection = {
  __typename?: 'SubscriptionConnection';
  edges: Array<SubscriptionEdge>;
  nodes: Array<Subscription>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SubscriptionEdge = {
  __typename?: 'SubscriptionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Subscription>;
};

export type SubscriptionFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  paymentStatus?: InputMaybe<IntFilter>;
  subscriptionPlan?: InputMaybe<SubscriptionPlanFilter>;
  subscriptionPlanId?: InputMaybe<IdFilter>;
  truck?: InputMaybe<TruckFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
  userId?: InputMaybe<IdFilter>;
  valid?: InputMaybe<BoolFilter>;
};

export type SubscriptionPlan = BaseModelInterface & {
  __typename?: 'SubscriptionPlan';
  active: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  duration: Scalars['String']['output'];
  endAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  price: Scalars['Float']['output'];
  startAt: Scalars['ISO8601DateTime']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type SubscriptionPlanConnection = {
  __typename?: 'SubscriptionPlanConnection';
  edges: Array<SubscriptionPlanEdge>;
  nodes: Array<SubscriptionPlan>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum SubscriptionPlanDurationEnum {
  Day = 'day',
  Minute = 'minute',
  Month = 'month',
  Quarter = 'quarter',
  Week = 'week',
  Year = 'year'
}

export type SubscriptionPlanEdge = {
  __typename?: 'SubscriptionPlanEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<SubscriptionPlan>;
};

export type SubscriptionPlanFilter = {
  active?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type SystemMenu = BaseModelInterface & {
  __typename?: 'SystemMenu';
  children?: Maybe<Array<SystemMenu>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<SystemMenu>;
  parentId?: Maybe<Scalars['ID']['output']>;
  preferences?: Maybe<Scalars['JSON']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Taxon = BaseModelInterface & {
  __typename?: 'Taxon';
  children?: Maybe<Array<Taxon>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Taxon>;
  parentId?: Maybe<Scalars['ID']['output']>;
  preferences?: Maybe<Scalars['JSON']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type TaxonConnection = {
  __typename?: 'TaxonConnection';
  edges: Array<TaxonEdge>;
  nodes: Array<Taxon>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TaxonEdge = {
  __typename?: 'TaxonEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Taxon>;
};

export type TaxonFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  parentId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type Truck = BaseModelInterface & {
  __typename?: 'Truck';
  createdAt: Scalars['ISO8601DateTime']['output'];
  currentTrack?: Maybe<TruckTrack>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  importedDate?: Maybe<Scalars['ISO8601DateTime']['output']>;
  manufacturedDate?: Maybe<Scalars['ISO8601DateTime']['output']>;
  mark?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  netWeight?: Maybe<Scalars['Int']['output']>;
  plateNumber?: Maybe<Scalars['String']['output']>;
  serial?: Maybe<Scalars['String']['output']>;
  subscribed: Scalars['Boolean']['output'];
  subscribedUntil?: Maybe<Scalars['ISO8601DateTime']['output']>;
  subscriptions: SubscriptionConnection;
  taxon?: Maybe<Taxon>;
  taxonId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
  verifications?: Maybe<VerificationConnection>;
  verified: Scalars['Boolean']['output'];
  verifiedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};


export type TruckSubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type TruckVerificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<VerificationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};

export type TruckConnection = {
  __typename?: 'TruckConnection';
  edges: Array<TruckEdge>;
  nodes: Array<Truck>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TruckEdge = {
  __typename?: 'TruckEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Truck>;
};

export type TruckFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  importedDate?: InputMaybe<DateFilter>;
  manufacturedDate?: InputMaybe<DateFilter>;
  mark?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  netWeight?: InputMaybe<IntFilter>;
  plateNumber?: InputMaybe<StringFilter>;
  serial?: InputMaybe<StringFilter>;
  subscribedUntil?: InputMaybe<DateFilter>;
  taxon?: InputMaybe<TaxonFilter>;
  taxonId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
  verifiedAt?: InputMaybe<DateFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type TruckTrack = BaseModelInterface & {
  __typename?: 'TruckTrack';
  createdAt: Scalars['ISO8601DateTime']['output'];
  destination?: Maybe<Address>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  origin?: Maybe<Address>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type TruckTrackConnection = {
  __typename?: 'TruckTrackConnection';
  edges: Array<TruckTrackEdge>;
  nodes: Array<TruckTrack>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TruckTrackEdge = {
  __typename?: 'TruckTrackEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<TruckTrack>;
};

export type TruckTrackFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type UbCab = {
  __typename?: 'UbCab';
  _id: Scalars['String']['output'];
  _index: Scalars['String']['output'];
  _score: Scalars['Float']['output'];
  _source: UbCabSource;
  _type: Scalars['String']['output'];
  quarter?: Maybe<Quarter>;
};

export type UbCabLocation = {
  __typename?: 'UbCabLocation';
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

export type UbCabSource = {
  __typename?: 'UbCabSource';
  formattedAddress?: Maybe<Scalars['String']['output']>;
  location?: Maybe<UbCabLocation>;
  nameEn: Scalars['String']['output'];
  nameFullEn: Scalars['String']['output'];
  nameFullMn: Scalars['String']['output'];
  nameMn: Scalars['String']['output'];
  nameShortEn: Scalars['String']['output'];
  nameShortMn: Scalars['String']['output'];
  placeId?: Maybe<Scalars['String']['output']>;
  regionType: Scalars['Int']['output'];
  requiresDetails?: Maybe<Scalars['Boolean']['output']>;
  secondaryText?: Maybe<Scalars['String']['output']>;
  types?: Maybe<Array<Scalars['String']['output']>>;
  vicinity?: Maybe<Scalars['String']['output']>;
};

export type User = BaseModelInterface & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  deliveryRequests: DeliveryRequestConnection;
  devices: DeviceConnection;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  nickName?: Maybe<Scalars['String']['output']>;
  orders: OrderConnection;
  registerNum?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  state?: Maybe<State>;
  stateId?: Maybe<Scalars['ID']['output']>;
  subscribed?: Maybe<Scalars['Boolean']['output']>;
  subscribedTaxons: Array<Scalars['String']['output']>;
  subscribedUntil?: Maybe<Scalars['ISO8601DateTime']['output']>;
  subscriptions: SubscriptionConnection;
  trucks: Array<Truck>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  userAddresses: UserAddressConnection;
  verifications?: Maybe<VerificationConnection>;
  verified: Scalars['Boolean']['output'];
  verifiedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
};


export type UserDeliveryRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DeliveryRequestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type UserDevicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DeviceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type UserOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<OrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type UserSubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type UserUserAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};


export type UserVerificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<VerificationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFilter>;
};

export type UserAddress = BaseModelInterface & {
  __typename?: 'UserAddress';
  address: Address;
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type UserAddressConnection = {
  __typename?: 'UserAddressConnection';
  edges: Array<UserAddressEdge>;
  nodes: Array<UserAddress>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserAddressEdge = {
  __typename?: 'UserAddressEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<UserAddress>;
};

export type UserAddressFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<User>;
};

export type UserFilter = {
  createdAt?: InputMaybe<DateFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  gender?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  mobile?: InputMaybe<StringFilter>;
  nickName?: InputMaybe<StringFilter>;
  registerNum?: InputMaybe<StringFilter>;
  role?: InputMaybe<IntFilter>;
  subscribedUntil?: InputMaybe<DateFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  verifiedAt?: InputMaybe<DateFilter>;
};

export type Verification = BaseModelInterface & {
  __typename?: 'Verification';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  field1?: Maybe<Scalars['String']['output']>;
  field2?: Maybe<Scalars['String']['output']>;
  field3?: Maybe<Scalars['String']['output']>;
  field4?: Maybe<Scalars['String']['output']>;
  field5?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  passport?: Maybe<Scalars['String']['output']>;
  passportBack?: Maybe<Scalars['String']['output']>;
  respondedBy?: Maybe<User>;
  selfie?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  targetId: Scalars['ID']['output'];
  targetType: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type VerificationConnection = {
  __typename?: 'VerificationConnection';
  edges: Array<VerificationEdge>;
  nodes: Array<Verification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type VerificationEdge = {
  __typename?: 'VerificationEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Verification>;
};

export type VerificationFilter = {
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<IdFilter>;
  status?: InputMaybe<EnumStringFilter>;
  targetId?: InputMaybe<IdFilter>;
  targetType?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateFilter>;
  user?: InputMaybe<UserFilter>;
  verifiedAt?: InputMaybe<DateFilter>;
};

export type AcceptDeliveryRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type ApproveVerificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type AttachOrderAudioInput = {
  audio: Scalars['Upload']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  number: Scalars['String']['input'];
};

export type AttachOrderImageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['Upload']['input']>;
  number: Scalars['String']['input'];
};

export type AttachOrderVideoInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  number: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
};

export type AuthCheckLoginInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  login: Scalars['String']['input'];
  sendToken?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AuthCheckTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  login: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type AuthRegisterInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  registerNum?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CheckPaymentInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  invoiceNo: Scalars['ID']['input'];
};

export type CloseOrderInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  number: Scalars['String']['input'];
};

export type CreateAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  alternativeEmail?: InputMaybe<Scalars['String']['input']>;
  alternativeMobile?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  districtId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LatLngInput>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  quarterId?: InputMaybe<Scalars['ID']['input']>;
  sdq?: InputMaybe<Array<Scalars['ID']['input']>>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
  ubcCode?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBannerInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  permalink?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDeliveryRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  orderId: Scalars['ID']['input'];
  price: Scalars['String']['input'];
  skipSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  travelAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateImageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images: Array<Scalars['Upload']['input']>;
  type: Scalars['String']['input'];
};

export type CreateIndexElasticInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateMarkInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  logo?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
};

export type CreateModelInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  logo?: InputMaybe<Scalars['Upload']['input']>;
  markId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateOrderInput = {
  carType?: InputMaybe<Scalars['String']['input']>;
  carWeight?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<AddressInput>;
  destinationId?: InputMaybe<Scalars['ID']['input']>;
  origin?: InputMaybe<AddressInput>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  packageDimensions?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packageWeight?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  receiverMobile?: InputMaybe<Scalars['String']['input']>;
  receiverName?: InputMaybe<Scalars['String']['input']>;
  senderMobile?: InputMaybe<Scalars['String']['input']>;
  senderName?: InputMaybe<Scalars['String']['input']>;
  taxonId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  travelAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  travelDistance?: InputMaybe<Scalars['String']['input']>;
  travelDuration?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  vatIncluded?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreatePaymentInput = {
  action: PaymentMethodEnum | `${PaymentMethodEnum}`;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  subscriptionPlanId: Scalars['ID']['input'];
};

export type CreatePaymentMethodInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  testMode?: InputMaybe<Scalars['Boolean']['input']>;
  type: Scalars['String']['input'];
};

export type CreateSendEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  createPayment?: InputMaybe<Scalars['Boolean']['input']>;
  endAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  startAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  subscriptionPlanId: Scalars['ID']['input'];
  truckId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreateSubscriptionPlanInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  duration: SubscriptionPlanDurationEnum | `${SubscriptionPlanDurationEnum}`;
  endAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  name: Scalars['String']['input'];
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  price: Scalars['Float']['input'];
  startAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
};

export type CreateSystemMenuInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaxonInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTruckInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  importedDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  manufacturedDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  mark?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  netWeight?: InputMaybe<Scalars['Int']['input']>;
  plateNumber?: InputMaybe<Scalars['String']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  taxonId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  alternativeEmail?: InputMaybe<Scalars['String']['input']>;
  alternativeMobile?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LatLngInput>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  nickName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  registerNum?: InputMaybe<Scalars['String']['input']>;
};

export type DestroyAddressInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyBannerInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyImageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type DestroyMarkInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyModelInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyOrderAudioInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  number: Scalars['String']['input'];
};

export type DestroyOrderImageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  imageId: Scalars['ID']['input'];
  number: Scalars['String']['input'];
};

export type DestroyOrderInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyOrderVideoInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  number: Scalars['String']['input'];
};

export type DestroyPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroySendEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroySubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroySubscriptionPlanInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroySystemMenuInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyTaxonInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyTruckInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyUserAddressInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DestroyUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type FeedLocationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  deviceToken?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  truckId: Scalars['ID']['input'];
};

export type LinkDeviceInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  deviceModel?: InputMaybe<Scalars['String']['input']>;
  deviceOs?: InputMaybe<Scalars['String']['input']>;
  deviceType?: InputMaybe<Scalars['String']['input']>;
  subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
};

export type RejectDeliveryRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type ResetPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  login: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SendEmailTestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SendOtpInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  login: Scalars['String']['input'];
};

export type UpdateAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  alternativeEmail?: InputMaybe<Scalars['String']['input']>;
  alternativeMobile?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  districtId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LatLngInput>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  quarterId?: InputMaybe<Scalars['ID']['input']>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
  ubcCode?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBannerInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  permalink?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeliveryRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
  travelAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
};

export type UpdateMarkInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  logo?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateModelInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  logo?: InputMaybe<Scalars['Upload']['input']>;
  markId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  carType?: InputMaybe<Scalars['String']['input']>;
  carWeight?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<AddressInput>;
  destinationId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  origin?: InputMaybe<AddressInput>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  packageDimensions?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packageWeight?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  receiverMobile?: InputMaybe<Scalars['String']['input']>;
  receiverName?: InputMaybe<Scalars['String']['input']>;
  senderMobile?: InputMaybe<Scalars['String']['input']>;
  senderName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  taxonId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  travelAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  travelDistance?: InputMaybe<Scalars['String']['input']>;
  travelDuration?: InputMaybe<Scalars['String']['input']>;
  vatIncluded?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePaymentMethodInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  testMode?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSendEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  endAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  id: Scalars['ID']['input'];
  startAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  subscriptionPlanId?: InputMaybe<Scalars['ID']['input']>;
  truckId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSubscriptionPlanInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  endAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startAt?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
};

export type UpdateSystemMenuInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaxonInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTruckInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  importedDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  manufacturedDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  mark?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  netWeight?: InputMaybe<Scalars['Int']['input']>;
  plateNumber?: InputMaybe<Scalars['String']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  taxonId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickName?: InputMaybe<Scalars['String']['input']>;
  registerNum?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
};

export type VerifyDriverInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  passport: Scalars['Upload']['input'];
  passportBack: Scalars['Upload']['input'];
  selfie: Scalars['Upload']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type VerifyRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['Upload']['input']>;
  kind: Scalars['String']['input'];
  targetId: Scalars['ID']['input'];
};

export type VerifyTruckInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  passport: Scalars['Upload']['input'];
  truckId?: InputMaybe<Scalars['ID']['input']>;
};
