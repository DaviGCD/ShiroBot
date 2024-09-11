const { EventEmitter } = require('events')
const { Rest } = require('lavacord')

module.exports = class LavalinkPlayer extends EventEmitter {
  constructor(player) {
    super()
    this.player = player
    this.queue = []
    this.np = ''
    this.repeatTrack = ''
    this.repeat = false
  }

  async getSongs(node, search) {
    return Rest.load(node, search).catch(err => {
      console.error(err)
      return []
    })
  }

  play(query) {
    return this.getSongs(this.player.node, `spsearch:${query}`).then(result => {
      if (!result.data[0]) return
      this._addToQueue(result.data[0])
      return result.data[0].info
    })
  }

  skip() {
    const queue = this.queue.shift()
    if (!queue) return
    this.player.play(queue.encoded)
    this.np = queue.info
    this.repeatTrack = queue.encoded
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

  _addToQueue(encoded) {
    if (!this.player.playing && !this.player.paused) return this._play(encoded)
    return this.queue.push(encoded)
  }

  _play(song) {
    this.player.once("error", error => console.error(error.exception));
    this.player.on('start', (data) => {
      this.np = data.track.info
      this.repeatTrack = data.track.encoded
      return this.emit('nowPlaying', data.track)
    })
    this.player.on('end', (data) => {
      if (data.type === "TrackEndEvent" && data.reason === "replaced") return
      if (this.repeat) {
        return this.player.play(this.repeatTrack)
      } else {
        const queue = this.queue.shift()
        if (!queue) return this.emit('playerEnded')
        this.player.play(queue.encoded)
        this.repeatTrack = queue.encoded
        this.np = queue.info
      }
    })
    this.player.play(song.encoded)
  }
}
