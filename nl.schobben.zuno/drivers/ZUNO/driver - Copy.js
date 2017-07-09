'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://manuals.fibaro.com/content/manuals/en/FGBS-321/FGBS-321-EN-A-v1.01.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		'alarm_generic.contact1': [
			{
				multiChannelNodeId: 1,
				command_class: 'COMMAND_CLASS_SENSOR_BINARY',
				command_get: 'SENSOR_BINARY_GET',
				command_report: 'SENSOR_BINARY_REPORT',
				command_report_parser: report => report['Sensor Value'] === 'detected an event',
			},
			{
				command_class: 'COMMAND_CLASS_SCENE_ACTIVATION',
				command_report: 'SCENE_ACTIVATION_SET',
				command_report_parser: (report, node) => {

					if (report['Scene ID'] === 10) {

						if (node &&
							node.hasOwnProperty('state') &&
							node.state.hasOwnProperty('alarm_generic.contact1') && !node.state['alarm_generic.contact1']) {

							Homey.manager('flow').triggerDevice('FGBS-001_i1_on', null, null, node.device_data);
							Homey.manager('flow').triggerDevice('FGBS-001_i1_switch', null, null, node.device_data);
						}

						return true;
					}

					if (report['Scene ID'] === 11) {

						if (node &&
							node.hasOwnProperty('state') &&
							node.state.hasOwnProperty('alarm_generic.contact1') &&
							node.state['alarm_generic.contact1']) {

							Homey.manager('flow').triggerDevice('FGBS-001_i1_off', null, null, node.device_data);
							Homey.manager('flow').triggerDevice('FGBS-001_i1_switch', null, null, node.device_data);
						}

						return false;
					}

					return null;
				},
			},
		],

		'alarm_generic.contact2': [
			{
				multiChannelNodeId: 2,
				command_class: 'COMMAND_CLASS_SENSOR_BINARY',
				command_get: 'SENSOR_BINARY_GET',
				command_report: 'SENSOR_BINARY_REPORT',
				command_report_parser: report => report['Sensor Value'] === 'detected an event',
			},
			{
				command_class: 'COMMAND_CLASS_SCENE_ACTIVATION',
				command_report: 'SCENE_ACTIVATION_SET',
				command_report_parser: (report, node) => {

					if (report['Scene ID'] === 20) {

						if (node &&
							node.hasOwnProperty('state') &&
							node.state.hasOwnProperty('alarm_generic.contact2') && !node.state['alarm_generic.contact2']) {

							Homey.manager('flow').triggerDevice('FGBS-001_i2_on', null, null, node.device_data);
							Homey.manager('flow').triggerDevice('FGBS-001_i2_switch', null, null, node.device_data);
						}

						return true;
					}

					if (report['Scene ID'] === 21) {

						if (node &&
							node.hasOwnProperty('state') &&
							node.state.hasOwnProperty('alarm_generic.contact2') &&
							node.state['alarm_generic.contact2']) {

							Homey.manager('flow').triggerDevice('FGBS-001_i2_off', null, null, node.device_data);
							Homey.manager('flow').triggerDevice('FGBS-001_i2_switch', null, null, node.device_data);
						}

						return false;
					}

					return null;
				},
			},
		],

		'measure_temperature.sensor1': {
			multiChannelNodeId: 3,
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get: 'SENSOR_MULTILEVEL_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Temperature (version 1)',
				Properties1: {
					Scale: 0,
				},
			}),
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: (report, node) => {

				if (report['Sensor Type'] === 'Temperature (version 1)') {

					if (node &&
						node.hasOwnProperty('state') &&
						node.state.hasOwnProperty('measure_temperature.sensor1') &&
						node.state['measure_temperature.sensor1'] !== report['Sensor Value (Parsed)']) {

						const token = {
							temp: report['Sensor Value (Parsed)'],
						};

						Homey.manager('flow').triggerDevice('FGBS-001_temp1', token, null, node.device_data);
					}

					return report['Sensor Value (Parsed)'];
				}

				return null;
			},
			optional: true,
		},

		'measure_temperature.sensor2': {
			multiChannelNodeId: 4,
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get: 'SENSOR_MULTILEVEL_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Temperature (version 1)',
				Properties1: {
					Scale: 0,
				},
			}),
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: (report, node) => {
				if (report['Sensor Type'] === 'Temperature (version 1)') {

					if (node &&
						node.hasOwnProperty('state') &&
						node.state.hasOwnProperty('measure_temperature.sensor2') &&
						node.state['measure_temperature.sensor2'] !== report['Sensor Value (Parsed)']) {

						const token = {
							temp: report['Sensor Value (Parsed)'],
						};

						Homey.manager('flow').triggerDevice('FGBS-001_temp2', token, null, node.device_data);
					}

					return report['Sensor Value (Parsed)'];
				}

				return null;
			},
			optional: true,
		},

		'measure_temperature.sensor3': {
			multiChannelNodeId: 5,
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get: 'SENSOR_MULTILEVEL_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Temperature (version 1)',
				Properties1: {
					Scale: 0,
				},
			}),
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: (report, node) => {
				if (report['Sensor Type'] === 'Temperature (version 1)') {

					if (node &&
						node.hasOwnProperty('state') &&
						node.state.hasOwnProperty('measure_temperature.sensor3') &&
						node.state['measure_temperature.sensor3'] !== report['Sensor Value (Parsed)']) {

						const token = {
							temp: report['Sensor Value (Parsed)'],
						};

						Homey.manager('flow').triggerDevice('FGBS-001_temp3', token, null, node.device_data);
					}

					return report['Sensor Value (Parsed)'];
				}

				return null;
			},
			optional: true,
		},

		'measure_temperature.sensor4': {
			multiChannelNodeId: 6,
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get: 'SENSOR_MULTILEVEL_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Temperature (version 1)',
				Properties1: {
					Scale: 0,
				},
			}),
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: (report, node) => {
				if (report['Sensor Type'] === 'Temperature (version 1)') {

					if (node &&
						node.hasOwnProperty('state') &&
						node.state.hasOwnProperty('measure_temperature.sensor4') &&
						node.state['measure_temperature.sensor4'] !== report['Sensor Value (Parsed)']) {

						const token = {
							temp: report['Sensor Value (Parsed)'],
						};

						Homey.manager('flow').triggerDevice('FGBS-001_temp4', token, null, node.device_data);
					}

					return report['Sensor Value (Parsed)'];
				}

				return null;
			},
			optional: true,
		},
	},

	settings: {
		10: {
			index: 10,
			size: 1,
			signed: false,
		},
		11: {
			index: 11,
			size: 1,
			signed: false,
		},
		12: {
			index: 12,
			size: 1,
			parser: value => new Buffer([Math.round(value / 16 * 255)]),
			signed: false,
		},
	},
});

Homey.manager('flow').on('condition.FGBS-001_i1', (callback, args) => {
	const node = module.exports.nodes[args.device.token];

	if (node &&
		node.hasOwnProperty('state') &&
		node.state.hasOwnProperty('alarm_generic.contact1')) {
		callback(null, node.state['alarm_generic.contact1']);
	}
});

Homey.manager('flow').on('condition.FGBS-001_i2', (callback, args) => {
	const node = module.exports.nodes[args.device.token];

	if (node &&
		node.hasOwnProperty('state') &&
		node.state.hasOwnProperty('alarm_generic.contact2')) {
		callback(null, node.state['alarm_generic.contact2']);
	}
});
