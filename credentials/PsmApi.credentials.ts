import {
  Icon,
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from 'n8n-workflow';

export class PsmApi implements ICredentialType {
  name = 'psmApi';

  displayName = 'GLS Parcel Shop Management API';

  documentationUrl = 'https://dev-portal.gls-group.net/apis';

  icon: Icon = 'file:../nodes/Gls/GLS_Logo.svg';

  properties: INodeProperties[] = [
    {
      displayName: 'Authentication Method',
      name: 'authMethod',
      type: 'options',
      options: [
        {
          name: 'API Key',
          value: 'apiKey',
        },
        {
          name: 'Bearer Token',
          value: 'bearer',
        },
      ],
      default: 'apiKey',
      description: 'Choose the authentication method',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Your API Key',
      displayOptions: {
        show: {
          authMethod: ['apiKey'],
        },
      },
    },
    {
      displayName: 'Access Token',
      name: 'access_token',
      type: 'string',
      typeOptions: {
      password: true,
    },
      default: '',
      description: 'The access token to authenticate API requests. Use an expression to reference output from a previous node, e.g., {{$json["access_token"]}}',
      displayOptions: {
      show: {
        authMethod: ['bearer'],
      },
    },
      required: true,
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.gls-group.net',
      url: '/parcel-shop-management/v2/available-public-parcel-shops',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': '={{$credentials.apiKey}}',
        'Accept': 'application/json',
      },
      qs: {
        latitude: '50.90849',
        longitude: '7.18161',
        limit: '1',
      },
    },
  };
}
