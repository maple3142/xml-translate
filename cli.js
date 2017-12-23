#!/usr/bin/env node
const { _: [file], from, to, selector, output } = require('yargs')
	.usage('xml-translate <file>')
	.demandCommand(1)
	.options('to', {
		alias: 't',
		required: true,
		desc: 'target language'
	})
	.options('from', {
		alias: 'f',
		default: 'auto',
		desc: 'source language'
	})
	.options('selector', {
		alias: 's',
		default: '*',
		desc: 'a jQuery style selector to match elements'
	})
	.options('output', {
		alias: 'o',
		desc: 'a file to write'
	})
	.argv
const fs = require('fs')
const path = require('path')
const translateXML = require('./index')
fs.readFile(path.join(process.cwd(), file), (err, xml) => {
	translateXML({
		xml, from, to, selector
	}).then(r => {
		if (!output) {
			console.log(r)
		}
		else {
			fs.writeFile(path.join(process.cwd(), output), r, err => err ? console.log(err) : console.log(`successful wrote to ${output}`))
		}
	}).catch(e => console.error(e))
})