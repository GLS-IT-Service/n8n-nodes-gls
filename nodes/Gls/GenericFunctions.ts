import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	JsonObject,
	NodeApiError,
	NodeOperationError,
	IHttpRequestMethods,
} from 'n8n-workflow';

/**
 * Make an authenticated API request to PSM API.
 */
export async function psmApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	   // Get the credentials for this node
	   const credentials = await this.getCredentials('psmApi');
	   const headers: Record<string, string> = {
		   'Content-Type': 'application/json',
		   'Accept': 'application/json',
	   };

	   if (credentials.authMethod === 'apiKey') {
		   headers['ApiKey'] = `${credentials.apiKey}`;
	   } else {
		   const accessToken = credentials.access_token as string;
		   const tokenType = "Bearer";
		   if (!accessToken || !tokenType) {
			   throw new NodeOperationError(
				   (this as IExecuteFunctions).getNode?.() || null,
				   'Missing access_token or token_type in credentials',
			   );
		   }
		   headers['Authorization'] = `${tokenType} ${accessToken}`;
	   }

	   try {
		   const url = `https://api.gls-group.net${endpoint}?n8n=true`;
		   const requestOptions = {
			   method,
			   url,
			   qs,
			   body,
			   json: true,
			   headers,
		   };

		   return await this.helpers.httpRequest(requestOptions);
	   } catch (error) {
		   throw new NodeApiError(
			   (this as IExecuteFunctions).getNode?.() || null,
			   error as JsonObject,
		   );
	   }
}



/**
 * Make an authenticated API request to find GLS Points by geo-coordinates
 */
export async function getGLSPointsByGeoCoordinates(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	longitude: string,
	latitude: string,
	limit: number,
): Promise<IDataObject> {
	// Build request for the PSM endpoint
	const endpoint = '/parcel-shop-management/v2/available-public-parcel-shops';

	// Make the API request
	return psmApiRequest.call(
		this,
		'GET',
		endpoint,
		{},
		{
			longitude,
			latitude,
			limit,
		},
	) as Promise<IDataObject>;
}
