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
const mkdirp = require('mkdirp')
const translateXML = require('./index')

function mkdirp_p(path) {
	return new Promise((res, rej) => {
		mkdirp(path,err=>err?rej(err):res())
	})
}
fs.readFile(path.join(process.cwd(), file), (err, xml) => {
	translateXML({
		xml, from, to, selector
	}).then(r => {
		if (!output) {
			console.log(r)
		}
		else {
			const fileToWrite = path.isAbsolute(output) ? output : path.join(process.cwd(), output)
			
			const p=Promise.resolve()
			if (output.indexOf('/') != -1) { //has directory path
				p.then(mkdirp_p(output.split('/').slice(0,-1).join('/')))
			}
			p.then(_ => {
				fs.writeFile(fileToWrite, r, err => err ? console.log(err) : console.log(`successful wrote to ${output}`))
			})
		}
	}).catch(e => console.error(e))
})