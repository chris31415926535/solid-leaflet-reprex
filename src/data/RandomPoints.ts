import { numberLiteralTypeAnnotation } from "@babel/types";

// simple functions to create some random lat/lon points for mapping, with an additional language property for filtering.
// defaults to near Ottawa, Ontario

interface LatLonPoint  {
    lat: number,
    lon: number,
    languages_spoken?: string
}

export function RandomPoints(numPoints?: number, latCentre?:number, lonCentre?: number, radius?: number): LatLonPoint[] {

    numPoints = numPoints || 50;
    latCentre = latCentre || 45.356978;
    lonCentre = lonCentre || -75.677123;
    if(radius === undefined) radius = 0.5;
    
    let results = [];
    let newpoint: LatLonPoint;
    
    for (let x = 0; x < numPoints; x++ ){
        
        newpoint = {
            lat: latCentre + Math.random() * radius, 
            lon: lonCentre + Math.random() * radius,
            languages_spoken: (Math.random() < 0.5 ? "English" : "French")
        };
        
        results.push(newpoint)
    }
    
    return results;
}