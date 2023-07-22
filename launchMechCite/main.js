let dataa = [];

function submitability(){
    let inputs = document.getElementsByClassName('required');
    let btn = document.querySelector('input[type="submit"]');
    let count = 0;
    let can = true;
    for(var i =0; i<inputs.length;i++){

        let newI= inputs[i];
        if (newI.value.trim()===""||newI.value=== null){
            count+=1;
        }
        if (count>1){
            can = false;
            break;  
        }
    }
    btn.disabled= !can;
    dataa=[];
    
}

function calculate(){


    // elements
    let height = Number(document.getElementById("heights").value);
    let counterweight = Number(document.getElementById("counterweights").value);
    let launchweight = Number(document.getElementById("launchWeights").value);
    let angleOfLaunch = Number(document.getElementById("angleOfLaunchs").value);
    let angleOfApproach = Number(document.getElementById("angleOfApproachs").value);
    let armLengthWeightSide = Number(document.getElementById("armLengthWeightSides").value);
    let armLengthLaunchSide = Number(document.getElementById("armLengthLaunchSides").value);
    let distance = document.getElementById("distance");
    
    
    //math junk 
    //currently fucked up time isn't taking into account starting height you gotta use fancy quad eq for it     
    let acceleration =(counterweight*(armLengthWeightSide/armLengthLaunchSide))/launchweight;
    let velocity =acceleration*(Math.sqrt(2*(6.28*armLengthLaunchSide*(angleOfApproach/360))));
    console.log(velocity);
    let yvelocity = velocity*(Math.sin(angleOfLaunch));
    let xvelocity = velocity*(Math.cos(angleOfLaunch));
    let velocityNew = Math.pow(yvelocity,2);
    console.log(velocityNew);
    let heightNew= 2*9.8*height;
    let time = ( yvelocity+ (Math.sqrt(velocityNew + heightNew)) )/9.8;
    console.log( Math.sqrt(velocityNew + heightNew) );
    console.log(time);
    let distanceCalc = xvelocity*time;
    
    console.log(distanceCalc);

    distance.innerHTML= Math.round((distanceCalc + Number.EPSILON) * 100) / 100;
    let increment = time/10;
    let i =0;
    while( i<= time+increment){
        let xx =xvelocity*i;
        let x =Math.round((xx + Number.EPSILON) * 100) / 100;
        let yy = (yvelocity*i)+((.5*-9.8)*(Math.pow(i,2))) + height;
        let y =Math.round((yy + Number.EPSILON) * 100) / 100;
        let array = [x,y];
        dataa.push(array);
        google.charts.load('current', {'packages':['line']});
        google.charts.setOnLoadCallback(graph)
        i+=increment
    }
    document.getElementById("diagramMcc").style.visibility = "hidden";
    document.getElementById("mcDiagram").style.visibility = "hidden";
    document.getElementById("mcDiagramHolderr").style.visibility = "hidden";

}



function graph(){
    console.log(dataa);
    var data= new google.visualization.DataTable();
    var options={
        title: "Projectile Motion",
        curveType: 'function',
        legend:{position:'bottom'},
        width:800,
        height:500
    };
    data.addColumn('number', 'x-pos');
    data.addColumn('number', 'y-pos');

    data.addRows(dataa);

    var chart = new google.charts.Line(document.getElementById('graph'));
    chart.draw(data,google.charts.Line.convertOptions(options));
}