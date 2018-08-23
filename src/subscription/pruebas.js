const jsonParams = require('../awsapi/data/awsparams.json')

function personalizedQuery(req,res){
    //const publicAWSKey= req.query.publicAWSKey
    //const privateAWSKey= req.query.privateAWSKey
    //if(req.query.params === true){
        const pepe = "BlendedCost"
        switch (pepe) {
            case "AmortizedCost":
            jsonParams.Metrics.push("AmortizedCost")
                break;
            case "BlendedCost":
            jsonParams.Metrics.push("BlendedCost")
                break;
            case "UnblendedCost":
            jsonParams.Metrics.push("UblendedCost")
                break;
            case "UsageQuantity":
            jsonParams.Metrics.push("UsageQuantity")
                break;
        
            default:
                break;
        }
    //const jsonParams.Metrics = req.query.metrics
    //const jsonParams.Granularity = req.query.metrics
    //const jsonParams.TimePeriod.start = req.query.start
    //const jsonParams.TimePeriod.end = req.query.end

    //}
    
    let fecha = new Date();
    let fechAct= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();
    let tiempo=fecha.getTime();
    let milisegundos=parseInt(1*24*60*60*1000);
    total=fecha.setTime(tiempo-milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
    let fechAnt= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();
    console.log (fechAnt, fechAct, jsonParams.Metrics)

    //if(reqParams === jsonParams.Metrics)

    //res.send(fakeParams)
}

personalizedQuery()