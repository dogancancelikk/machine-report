import * as XLSX from "xlsx";
import {WorkSheet} from "xlsx";
import {getMachine, getMachineStatsByID} from "../services/machine.service";
import {MachineStats} from "../model/MachineStats";

export const readExcel = async (fileBufferArray: string | ArrayBuffer | null) => {
    try {
        const workBook = XLSX.read(fileBufferArray, {type: 'buffer'})
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        await updateWorkSheet(workSheet);
        XLSX.writeFile(workBook, 'new_file.xlsx')
    } catch (error){
        console.log(error);
    }
}

const updateWorkSheet = async (workSheet: WorkSheet) => {
    try {
        for (let workSheetKey in workSheet) {
            if (isCellShouldBeChanged(workSheet, workSheetKey)) {
                workSheet[workSheetKey].v = await getReportAttributeFromMachine(workSheet, workSheetKey);
            }
        }
    } catch (error){
        throw error;
    }
}

const getReportAttributeFromMachine = async (workSheet: WorkSheet, workSheetKey: string): Promise<any> => {
    let property: any ;
    try {
        const barcode = getBarcodeValue(workSheet, workSheetKey);
        const propertyName = getPropertyName(workSheet, workSheetKey);
        const machine = await getMachine(barcode);
        let machineStats = await getMachineStatsByID(machine.id);
        property = machineStats[propertyName as keyof MachineStats];

        if (!property) {
            throw new Error("Property couldn't be found");
        }
    } catch (error) {
        throw error;
    }

    return property;
}

const getBarcodeValue = (workSheet: WorkSheet, workSheetKey: string): string => {
    let workSheetElement = workSheet[workSheetKey]['h'];
    return workSheetElement.slice(1, workSheetElement.lastIndexOf("*"))
}

const getPropertyName = (workSheet: WorkSheet, workSheetKey: string) => {
    let workSheetElement = workSheet[workSheetKey]['h'];
    return workSheetElement.slice(workSheetElement.lastIndexOf("*") + 1)
}


const isCellShouldBeChanged = (workSheet: WorkSheet, workSheetKey: string): boolean => {
    if (workSheetKey.startsWith("!") == false) {
        const workSheetElement = workSheet[workSheetKey]['h'];
        return workSheetElement && workSheetElement.startsWith("*")
    }
    return false;
};
