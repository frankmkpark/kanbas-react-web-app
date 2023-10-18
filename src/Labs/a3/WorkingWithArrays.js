import ArrayIndexAndLength from "./ArrayIndexAndLength";   
import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import JsonStringify from "./JsonStringify";
import FindFunction from "./FindFunction"; 
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";

const WorkingWithArrays = () => {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2'];

    let combinedString = [
        functionScoped, blockScoped,
        constant1, numberArray1, stringArray1
    ];

    return (
        <>
            <h3>Working With Arrays</h3>
            functionScoped = {functionScoped}<br />
            blockScoped = {blockScoped}<br />
            constant1 = {constant1}<br />
            numberArray1 = {numberArray1}<br />
            stringArray1 = {stringArray1}<br />
            variableArray1 = {combinedString}<br />        
            <ArrayIndexAndLength />
            <AddingAndRemovingDataToFromArrays />
            <ForLoops />
            <MapFunction />
            <JsonStringify />
            <FindFunction />
            <FindIndex />
            <FilterFunction />
        </>
    );
}
export default WorkingWithArrays;