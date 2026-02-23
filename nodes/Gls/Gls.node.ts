import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	getGLSPointsByGeoCoordinates,
} from './GenericFunctions';

export class Gls implements INodeType {
	description: INodeTypeDescription & { usableAsTool?: boolean } = {
		displayName: 'GLS',
		name: 'gls',
		icon: 'file:GLS_Logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Returns the nearest GLS Points when given latitude, longitude, countryCode (A2) and limit.',
		defaults: {
			name: 'PSM',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'psmApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'GLS Point',
						value: 'psm',
					},
				],
				default: 'psm',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['psm'],
					},
				},
				options: [
					{
						name: 'Get GLS Points by Geo Coordinates',
						value: 'getByGeoCoordinates',
						description: 'Get GLS Points by latitude, longitude and country code',
						action: 'Get gls points by geo coordinates',
					},	
				],
				default: 'getByGeoCoordinates',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'string',
				required: true,
				default: '',
				placeholder: '50.90849',
				displayOptions: {
					show: {
						resource: ['psm'],
						operation: ['getByGeoCoordinates'],
					},
				},
				description: 'Latitude of the Geo Coordinate to start searching for GLS Points',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'string',
				required: true,
				default: '',
				placeholder: '7.61092',
				displayOptions: {
					show: {
						resource: ['psm'],
						operation: ['getByGeoCoordinates'],
					},
				},
				description: 'Longitude of the Geo Coordinate to start searching for GLS Points',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 20,
				},
				default: 10,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['psm'],
					},
				},
			},
		],
	};

	// Define methods for use in other nodes as tools
	methods = {
		loadOptions: {},
	};

	// This is the main execution function
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Get parameter values
		const items = this.getInputData();
		let item: INodeExecutionData;
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		try {
			if (resource === 'psm') {
				if (operation === 'getByGeoCoordinates') {
					// For all items
					for (let i = 0; i < items.length; i++) {
						try {
							// Get parameters
							const longitude = this.getNodeParameter('longitude', 0) as string;
							const latitude = this.getNodeParameter('latitude', 0) as string;
							const limit = this.getNodeParameter('limit', i) as number;

							// Get data from the PSM API
							const responseData = await getGLSPointsByGeoCoordinates.call(
								this,
								longitude,
								latitude,
								limit,
							);

							// Create an item with the response data
							item = {
								json: responseData,
								pairedItem: { item: i },
							};

							// Add the item to the returned data
							returnData.push(item);
						} catch (error) {
                        if (this.continueOnFail()) {
								returnData.push({
									json: {
										error: error instanceof Error ? error.message : String(error),
									},
									pairedItem: { item: i },
								});
								continue;
							}
							throw error;
						}
					}
				}
			}
        } catch (error) {
            if (this.continueOnFail()) {
                returnData.push({ json: { error: error instanceof Error ? error.message : String(error) } });
            } else {
                throw error;
            }
        }

		return [returnData];
	}
}
