var spawn = require('child_process').spawn;

exports.launchSyncGateway = function(opts){
  var argv = [
    "-interface", ":"+opts.port,
    "-adminInterface", ":"+(opts.port + 1),
    opts.configPath
  ]

  console.log("running",opts.path, argv)

  var sg = spawn(opts.path, argv);
  sg.stdout.pipe(process.stdout)
  sg.stderr.pipe(process.stderr)

  sg.stderr.on("data",function(data){
    if (data.toString().indexOf("Starting server on :"+opts.port) !== -1) {
      sg.emit("ready")
    }
  })
  return sg;
}

exports.launchLiteServ = function(opts){
  var run = opts.path,
    argv = ["--port", opts.port];

  if(opts.dir) {
    argv.push("--dir")
    argv.push(opts.dir)
  }

  var liteserv = spawn(opts.path,argv)

  liteserv.stderr.on("data",function(data){
    if (data.toString().indexOf("is listening on port "+opts.port) !== -1) {
      liteserv.emit("ready")
    }
  })

  return liteserv;
}