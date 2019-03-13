import {mediaBaseUrl} from 'api/config.js'

export default class Song{
	
	constructor(id,name,album_title,singer_name,media_mid) {
		this.id = id
		this.name = name
		this.album_title = album_title
		this.singer_name = singer_name
		this.url = `${mediaBaseUrl.baseUrl}${media_mid}${mediaBaseUrl.param}`
		this.image = require('common/image/person_default.png')
	}
}