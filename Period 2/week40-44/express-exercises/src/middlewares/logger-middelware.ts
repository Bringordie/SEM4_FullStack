var myLogger = function (req:any, res:any, next:any) {
    var date = Date(); 
    console.log('\nDate: ' + date.toString() + '\nRequest Type: ' + req.method + '\nURL: ' + req.url + '\n')
    next()
  }

  export {myLogger}