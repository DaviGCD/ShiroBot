const { EventEmitter } = require('events')

module.exports = class LavalinkPlayer extends EventEmitter {
    constructor(player) {
        super()
        this.player = player
        this.queue = []
        this.np = {}
        this.repeatTrack = ''
        this.repeat = false
    }

    async getSongs(node, search) {
        const axios = require('axios')
        const { URLSearchParams } = require('url')
        const params = new URLSearchParams()
        params.append('identifier', search)

        return axios.get(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, {
            headers: {
                Authorization: node.password
            }
        }).then(response => response.data.tracks).catch(err => {
            console.error(err.message)
            return null
        })
    }

    play(query, author) {
        return this.getSongs(this.player.node, `ytsearch:${query}`).then(result => {
            if (!result[0]) return
            this._addToQueue(result[0], author)
            return Object.assign(result[0].info, { requestedBy: author })
        })
    }

    skip(author) {
        let queue = this.queue.shift()
        if (!queue) return
        this.player.play(queue.track, author)
        this.np = queue.info
        this.repeatTrack = queue.track
    }

    setVolume(value) {
        if (value > 100) value = 100
        return this.player.volume(value)
    }

    pause() {
        return this.player.paused ? this.player.resume() : this.player.pause()
    }

    shuffle() {
        return this.queue.sort(() => Math.random() > 0.5 ? -1 : 1)
    }

    _addToQueue(track, author) {
        if (!this.player.playing && !this.player.paused) return this._play(Object.assign(track, { requestedBy: author }))
        return this.queue.push(Object.assign(track, { requestedBy: author }))
    }

    seek(position) {
        if (!position) position = 0
        return this.player.seek(position)
    }

    _play(song, author) {
        this.player.on('end', (data) => {
            if (data.reason === 'REPLACED') return
            if (this.repeat) return this.player.play(this.repeatTrack.track, this.repeatTrack.requestedBy)

            let queue = this.queue.shift()
            if (!queue) return this.emit('playEnd')
            this.player.play(queue.track, queue.requestedBy)
            this.repeatTrack = queue
            this.np = Object.assign(queue.info, queue.requestedBy)
            return
        })

        this.player.play(song.track)
        this.repeatTrack = song.track
        this.np = Object.assign(song.info, { requestedBy: author })
        return this.emit('playNow', song)
    }
}