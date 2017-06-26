var pull = require('pull-stream/pull')

//up, down * loopback, network, internet

function Sensor (onRate, up) {
  if(!onRate)
    return function (read) { return read }
  return pull.through(function (data) {
    onRate(data.length, up)
  })
}

module.exports = function Rate (stream, onRate) {
  if(stream.length == 1) //sink
    return pull(Sensor(onRate, false), stream)
  else if(stream.length == 2)
    return pull(stream, Sensor(onRate, true))
  else
    return {
      source: Rate(stream.source, onRate), sink: Rate(stream.sink, onRate),
      address: stream.address
    }
}







