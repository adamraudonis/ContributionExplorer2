


    



    
    
    

function initialize(){
    
    
    var circles=d3.select(".circle")                    
       
       
    
  
    var canvas = d3.select("#canvas")
    
    canvas.append("svg:circle")
                        .attr("r", 30)
                        .attr("id", "1")
                        .attr("class","circle")
                        
    canvas.append("svg:circle")
                        .attr("r", 30)
                        .attr("id", "2")
                        .attr("class","circle")
                        .style("fill", "blue")
                        
    
    var force = d3.layout.force()
    .nodes(circles)
    .charge(-30)
    .size([800, 800])
    .start();
    console.log(force)
    
    
}

