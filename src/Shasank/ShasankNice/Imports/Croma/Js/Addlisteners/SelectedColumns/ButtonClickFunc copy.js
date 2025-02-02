import { StartFunc as StartFuncCheckBeforeFetch } from "./CheckBeforeFetch.js";
import { StartFunc as StartFuncAfterFetch } from "./AfterFetch.js";
import { StartFunc as StartFuncFetchFunc } from "./FetchFunc.js";
// import { StartFunc as StartFuncPreparePostData } from "./PreparePostData.js";


let StartFunc = async () => {
    if (StartFuncCheckBeforeFetch()) {

        const input = document.getElementById('csvFileInput');
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async function (e) {
                const csvData = e.target.result;
                const jsonArray = convertCsvToJsonFunction(csvData);
                // let jVarLocalBodyData = await StartFuncPreparePostData({ inCsvJsonData: jsonArray });
                let response = await StartFuncFetchFunc({ inBodyData: jsonArray });

                StartFuncAfterFetch({ inFromFetch: response });
            };

            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        };
    };

};

let convertCsvToJsonFunction = (csvData) => {
    const parsedData = Papa.parse(csvData, { header: true,skipEmptyLines: true });

    const selectedData = parsedData.data.map(({
        'ExternalReferenceID': JobId, 'Servify Call Creation Date': CreationDate, 'Servify Status': Status,
        'Customer Name': CustomerName, 'Customer Address': Address, 'Customer Mobile No': MobileNo,
        'Customer Alternate Mobile No.': ContactNo, 'Product Name': ModelName, 'Delivery Type': JobClassification, 'Product Category': ProductGroupName, 'Warranty': WarrantyType, 'SubServiceType': JobType, 'PinCode': Distancetype, 'Last Visit Remarks': AgentRemarks, 'Created By': DealerName, CallFromNo, Brand
    }) => ({ JobId, CreationDate, Status, CustomerName, Address, MobileNo, ContactNo, ModelName, JobClassification, ProductGroupName, WarrantyType, JobType, Distancetype, AgentRemarks, DealerName, CallFromNo, Brand }));

    return selectedData;
}


export { StartFunc };