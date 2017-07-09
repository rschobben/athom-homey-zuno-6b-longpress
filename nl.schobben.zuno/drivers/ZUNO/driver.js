'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// Zwave Uno with Athom Homey, code based on Fibaro driver (roger at schobben dot nl)

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
		'alarm_generic.contact1': [ 
			{
             	command_class: 'COMMAND_CLASS_SENSOR_BINARY',
	            command_get: 'SENSOR_BINARY_SUPPORTED_GET_SENSOR',
	            command_report: 'SENSOR_BINARY_SUPPORTED_SENSOR_REPORT',
				command_report_parser:   report => 
				{  //report['Sensor Value'] === 'detected an event',
				  console.log(JSON.stringify(report));
		        }		
            }
		],
	},
});

//ZUNO_i1_on

module.exports.on('initNode', token => {
	const node = module.exports.nodes[token];
	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION !== 'undefined') {
		console.log("init stuff 1");
		node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION.on('report', (command, report) => {
			if (command && command.name === 'SCENE_ACTIVATION_SET' && report && report.hasOwnProperty('Scene ID')) 
			{
				switch (report['Scene ID'])
				{
				  case 1: Homey.manager('flow').triggerDevice('ZUNO_scene1', null, null, node.device_data); 
				          break;
				  case 2: Homey.manager('flow').triggerDevice('ZUNO_scene2', null, null, node.device_data); 
				          break;
				  case 3: Homey.manager('flow').triggerDevice('ZUNO_scene3', null, null, node.device_data); 
				          break;
				  case 4: Homey.manager('flow').triggerDevice('ZUNO_scene4', null, null, node.device_data); 
				          break;
				  case 5: Homey.manager('flow').triggerDevice('ZUNO_scene5', null, null, node.device_data); 
				          break;
				  case 6: Homey.manager('flow').triggerDevice('ZUNO_scene6', null, null, node.device_data); 
				          break;
				  case 7: Homey.manager('flow').triggerDevice('ZUNO_scene7', null, null, node.device_data); 
				          break;
				  case 8: Homey.manager('flow').triggerDevice('ZUNO_scene8', null, null, node.device_data); 
				          break;
				  case 9: Homey.manager('flow').triggerDevice('ZUNO_scene9', null, null, node.device_data); 
				          break;
				  case 10: Homey.manager('flow').triggerDevice('ZUNO_scene10', null, null, node.device_data); 
				          break;
				  case 11: Homey.manager('flow').triggerDevice('ZUNO_scene11', null, null, node.device_data); 
				          break;
				  case 12: Homey.manager('flow').triggerDevice('ZUNO_scene12', null, null, node.device_data); 
				          break;
				}
			}
		});
	}
});